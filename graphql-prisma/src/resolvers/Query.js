import db from '../db'
var Query = {
    async posts(parent, args, { db, prisma }, info) {
        var posts = [];
        var opArgs = {};
        if (args.query) {
            opArgs.where = {
                OR: [{ title_contains: args.query }, { body_contains: args.query }]
            }
        }

        posts = await prisma.query.posts(opArgs, info);
        return posts;
    },

    async comments(parent, args, { db }, info) {
        var comments = [];
        var opArgs = {};
        if (args.query) {
            opArgs.where = {
                text_contains: args.query
            }
        }

        comments = await prisma.query.comments(opArgs, info);
        return comments;
    },

    add(parent, args, { db }, info) {
        if (args.numbers.length == 0) {
            return 0;
        }

        console.log(args.numbers.reduce((accumulator, current_value) => {
            return accumulator + current_value;
        }));
        return args.numbers.reduce((accumulator, current_value) => {
            return accumulator + current_value;
        })
    },

    grades(parent, args, ctx, info) {
        console.log('ctx',ctx)
        return [99, 30, 20]
    },

    async users(parent, args, { db, prisma, errorName }, info) {
        var opArgs = {};
        if (args.query) {
            opArgs.where = {
                OR: [{ name_contains: args.query }, { email_contains: args.query }]
            }
        }

        var users_array = await prisma.query.users(opArgs, info);
        console.log('users', users_array);
        return users_array;
    },


    me() {
        return {
            id: 1,
            name: 'Piyush Maharana',
            email: 'pm@gmail.com',
            age: 24
        }
    },
    post() {
        return {
            id: 1,
            title: 'Exam Warrior',
            body: 'Waah Modiji Waah',
            published: true
        }
    }
}

export { Query as default }