import db from '../db'
var Query = {
    posts(parent, args, {db}, info) {
        if (!args.query) {
            return db.post_array;
        }

        return db.post_array.filter((post)=> {
            return post.body.toLowerCase().includes(args.query.toLowerCase()) || post.title.toLowerCase().includes(args.query.toLowerCase());
        })
    },

    comments(parent, args, {db}, info) {
        if (!args.query) {
            return db.comments;
        }
        
        return db.comments.filter((cmnt)=> {
            return cmnt.text.toLowerCase().includes(args.query.toLowerCase());
        });
    },

    add(parent, args, {db}, info) {
        if (args.numbers.length == 0) {
            return 0;
        } 

        console.log(args.numbers.reduce((accumulator, current_value)=> {
            return accumulator + current_value;
        }));
        

//             const reducer = (accumulator, current_Value) => accumulator + current_Value;

// // 1 + 2 + 3 + 4
//             return args.numbers.reduce(reducer);
        return args.numbers.reduce((accumulator, current_value)=> {
            return accumulator + current_value;
        })
    },

    grades(parent, args, {db}, info) {
        return [99,30,20]
    },
    users(parent, args, ctx, info) {
           if (!args.query) {
               return db.usrs;
           }

           return db.usrs.filter((user)=> {
               return user.name.toLowerCase().includes(args.query.toLowerCase());
           })
    },
 
    
    me() {
        return {
            id : 1,
            name : 'Piyush Maharana',
            email: 'pm@gmail.com',
            age: 24
        }
    },
    post() {
        return {
            id : 1,
            title : 'Exam Warrior',
            body: 'Waah Modiji Waah',
            published: true
        }
    }
}

export { Query as default}