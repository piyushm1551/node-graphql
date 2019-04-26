import db from '../db';
const Subscription = {
    count: {
        subscribe(parent, args, {
            pubsub
        }, info) {
            let count = 0;
            setInterval(() => {
                count++;
                pubsub.publish('count', {
                    count: count
                });
            }, 1000);
            return pubsub.asyncIterator('count');
        }
    },

    comment: {
        subscribe(parent, { postId }, { db, pubsub }, info) {
            const post = db.post_array.find((post) => {
                return post.id == postId && post.published
            });

            if (!post) {
                throw new Error('P nf');
            }


            return pubsub.asyncIterator(`comment ${postId}`)
        }
    },

    post: {
        subscribe(parent, args, { db, pubsub }, info) {
            return pubsub.asyncIterator(`post`)
        }
    }
}

export {
    Subscription as
        default
}