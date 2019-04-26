import uuid from 'uuid/v4';
import db from '../db'

var Mutation = {
    createUser(parent, args, { db }, info) {
        console.log(args);
        const emailTaken = db.usrs.some((user) => {
            //console.log('a',args.data.email);                console.log('a',)
            return user.email == args.data.email
        })
        if (emailTaken) {
            throw new Error('Email taken.')
        }

        const user = {
            id: uuid(),
            ...args.data
        };

        db.usrs.push(user);
        return user;
    },

    editUser(parent, { id, data }, { db }, info) {
        console.log('data', data);
        var userIndex = db.usrs.findIndex((user) => {
            return user.id == id
        })

        if (userIndex == -1) {
            throw new Error('U NF');
        }

        var user = db.usrs[userIndex];

        if (typeof data.email == 'string') {
            var emailTaken = db.usrs.some((user) => {
                return user.email == data.email
            })

            if (emailTaken) {
                throw new Error('U AU');
            }

            user.email = data.email
        }

        if (typeof data.name == 'string') {
            user.name = data.name;
        }

        if (data.age) {
            user.age = data.age
        }

        console.log('us', user);
        return user;
    },

    deleteUser(parent, args, { db }, info) {
        var userIndex = db.usrs.findIndex((user) => {
            return user.id == args.id
        })

        if (userIndex == -1) {
            throw new Error('U NF');
        }

        var deletedUsers = users.splice(userIndex, 1);


        db.post_array = db.post_array.filter((post) => {
            const match = post.author == args.id
            if (match) {
                db.comments = db.comments.filter((comment) => {
                    return comment.post != post.id
                })
            }
            return !match;
        })

        db.comments = db.comments.filter((comment) => {
            return comment.author != args.id
        })
        return deletedUsers[0];
    },

    createPost(parent, args, { db, pubsub }, info) {
        const userExists = db.usrs.some((user) => {
            return user.id == args.data.author
        })

        if (!userExists) {
            throw new Error('NF U')
        }

        const post = {
            id: uuid(),
            ...args.data
        };

        db.post_array.push(post);

        if (args.data.published) {
            pubsub.publish('post', {
                post: {
                    mutation: 'CREATED',
                    data: post
                }
            });
        }


        return post;
    },

    editPost(parent, { id, data }, { db, pubsub }, info) {
        console.log('data', data);
        var postIndex = db.post_array.findIndex((post) => {
            return post.id == id
        })

        if (postIndex == -1) {
            throw new Error('U NF');
        }

        var post = db.post_array[postIndex];
        const og_post = JSON.parse(JSON.stringify(og_post));

        if (typeof data.body == 'string') {
            post.body = data.body
        }

        if (typeof data.title == 'string') {
            post.title = data.title
        }

        if (typeof data.published == 'boolean') {
            post.published = data.published

            if (og_post.published && !post.published) {
                pubsub.publish('post', {
                    post: {
                        mutation: 'DELETED',
                        data: og_post
                    }
                });
            } else if (!og_post.published && post.published) {
                pubsub.publish('post', {
                    post: {
                        mutation: 'CREATED',
                        data: post
                    }
                });
            }
        } else if (post.published) {
            pubsub.publish('post', {
                post: {
                    mutation: 'UPDATED',
                    data: post
                }
            });
        }


        console.log('us', post);
        return post;
    },

    deletePost(parent, args, { db, pubsub }, info) {
        var postIndex = db.post_array.findIndex((post) => {
            return post.id == args.id
        })

        if (postIndex == -1) {
            throw new Error('Post nF');
        }

        var deletedPost = db.post_array.splice(postIndex, 1);
        comments = comments.filter((cmnt) => {
            return cmnt.post != args.id
        })

        if (deletedPost[0].published) {
            pubsub.publish('post', {
                post: {
                    mutation: 'DELETED',
                    data: deletedPost[0]
                }
            });
        }

        return deletedPost[0];
    },

    createComment(parent, args, { db, pubsub }, info) {
        const userExists = db.usrs.some((user) => {
            return user.id == args.data.author
        })

        const postExits = db.post_array.some((post) => {
            return post.id == args.data.post && post.published == true
        })

        console.log(userExists, 'aer', postExits);

        if (!userExists || !postExits) {
            throw new Error('NF U')
        }

        var comment = {
            id: uuid(),
            ...args.data
        }

        console.log('commnet', comment);

        db.comments.push(comment);
        pubsub.publish(`comment ${args.data.post}`, {
            comment: {
                mutation: 'CREATED',
                data: comment
            }
        })
        return comment;
    },

    editComment(parent, { id, data }, { db }, info) {
        console.log('data', data);
        var commentIndex = db.comments.findIndex((comment) => {
            return comment.id == id
        })

        if (commentIndex == -1) {
            throw new Error('U NF');
        }

        var comment = db.comments[commentIndex];

        if (typeof data.text == 'string') {
            comment.text = data.text
        }

        pubsub.publish(`comment ${comment.post}`, {
            comment: {
                mutation: 'CREATED',
                data: comment
            }
        })

        return comment;
    },

    deleteComment(parent, args, { db, pubsub }, info) {
        var cmntIndex = db.comments.findIndex((cmnt) => cmnt.id == args.id);
        if (cmntIndex == -1) {
            throw new Error('cmnt nf');
        }

        var deletedCmnt = db.comments.splice(cmntIndex, 1);

        pubsub.publish(`comment ${deletedCmnt[0].post}`, {
            comment: {
                mutation: 'DELETED',
                data: deletedCmnt[0]
            }
        });
        return deletedCmnt[0];
    }

}

export { Mutation as default }