import db from '../db';
const Subscription = {
    count: {
        subscribe(parent, args, { pubsub }, info) {
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
        async subscribe(parent, { postId }, { prisma }, info) {
            await prisma.subscription.comment({
                where: {
                    node: {
                        post: {
                            id: postId
                        }
                    }
                }
            }, info);
        }
    },

    post: {
        async subscribe(parent, args, { db, pubsub }, info) {
            await prisma.subscription.post({
                where: {
                    node: {
                        published: true
                    }
                }
            }, info);
        }
    }
}

export {
    Subscription as
        default
}