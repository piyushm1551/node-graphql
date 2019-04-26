import uuid from 'uuid/v4';
import db from '../db'

var Mutation = {
    async createUser(parent, args, { db, prisma }, info) {
        //console.log(args);
        var userExists = await prisma.exists.User({
            id: args.id
        });

        if (!userExists) {
            throw new Error('UNF');
        }

        const emailTaken = await prisma.exists.User({
            email: args.data.email
        })

        console.log('emailTaken', emailTaken);

        if (emailTaken) {
            throw new Error('Email taken.')
        }

        const user = {
            id: uuid(),
            ...args.data
        };

        console.log('user', user);

        var new_user = await prisma.mutation.createUser(user, info);
        return new_user;
    },

    async editUser(parent, { id, data }, { db, prisma }, info) {
        var userExists = await prisma.exists.User({
            id: id
        });

        if (!userExists) {
            throw new Error('UNF');
        }
        await prisma.mutation.updateUser({
            where: {
                id: id
            },
            data: data
        }, info);
        // console.log('data', data);
        // var userIndex = db.usrs.findIndex((user) => {
        //     return user.id == id
        // })

        // if (userIndex == -1) {
        //     throw new Error('U NF');
        // }

        // var user = db.usrs[userIndex];

        // if (typeof data.email == 'string') {
        //     var emailTaken = db.usrs.some((user) => {
        //         return user.email == data.email
        //     })

        //     if (emailTaken) {
        //         throw new Error('U AU');
        //     }

        //     user.email = data.email
        // }

        // if (typeof data.name == 'string') {
        //     user.name = data.name;
        // }

        // if (data.age) {
        //     user.age = data.age
        // }

        // console.log('us', user);
        // return user;
    },

    async deleteUser(parent, args, { db, prisma }, info) {
        var userExists = await prisma.exists.User({
            id: args.id
        });

        if (!userExists) {
            throw new Error('UNF');
        }
        var user = await prisma.deleteUser({
            where: {
                id: args.id
            }
        }, info);
        return user;
    },

    async createPost(parent, args, { db, pubsub }, info) {
        // const userExists = db.usrs.some((user) => {
        //     return user.id == args.data.author
        // })

        // if (!   ) {
        //     throw new Error('NF U')
        // }
        const userExists = await prisma.exists.User({
            id: args.data.author
        })

        if (!userExists) {
            throw new Error('NF U')
        }

        var post = await prisma.mutation.createPost({
            data: {
                body: args.data.body,
                title: args.data.title,
                published: args.data.published,
                author: {
                    connect: {
                        id: args.data.author
                    }
                }
            }
        }, info);

        // db.post_array.push(post);

        // if (args.data.published) {
        //     pubsub.publish('post', {
        //         post: {
        //             mutation: 'CREATED',
        //             data: post
        //         }
        //     });
        // }


        return post;
    },

    async editPost(parent, { id, data }, { db, pubsub, prisma }, info) {
        console.log('data', data);
        var post = await prisma.exists.Post({
            id: id
        });

        if (!post) {
            throw new Error('U NF');
        }

        post = await prisma.updatePost({
            where: {
                id: id
            },
            data: data
        }, info)

        return post;
    },

    async  deletePost(parent, args, { db, pubsub }, info) {
        var post = await prisma.exists.Post({
            id: args.data.id
        });

        if (!post) {
            throw new Error('Post nF');
        }

        var deletedPost = await prisma.mutation.deletePost({
            where: {
                id: args.id
            }
        }, info);

        return deletedPost;
    },

    async createComment(parent, args, { db, pubsub, prisma }, info) {
        const userExists = await prisma.exists.User({
            id: args.data.author
        })

        const postExits = await prisma.exists.Post({
            id: args.data.post
        })

        console.log(userExists, 'aer', postExits);

        if (!userExists || !postExits) {
            throw new Error('NF U')
        }

        var comment = await prisma.mutation.createPost({
            data: {
                text: "Ram",
                author: {
                    connect: {
                        id: args.data.author
                    }
                },
                post: {
                    connect: {
                        id: args.data.post
                    }
                }
            }
        }, info)
    },

    async editComment(parent, { id, data }, { db, prisma }, info) {
        console.log('data', data);
        var commentIndex = await prisma.exists.Comment({
            id: id
        });

        if (!commentIndex) {
            throw new Error('U NF');
        }

        var comment = await prisma.mutation.updatePost({
            where: {
                id: id
            },
            data: data
        }, info);
        return comment;
    },

    async deleteComment(parent, args, { db, pubsub, prisma }, info) {
        var cmntIndex = await prisma.exists.Comment({
            id: args.id
        });
        if (!cmntIndex) {
            throw new Error('cmnt nf');
        }

        var deletedCmnt = await prisma.mutation.deleteComment({
            where: {
                id: args.id
            }
        }, info);

        return deletedCmnt;
    }

}

export { Mutation as default }