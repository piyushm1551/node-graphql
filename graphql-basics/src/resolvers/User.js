import db from '../db'
var User = {
    posts(parent,args,{db}, info) {
        return db.post_array.filter((post)=> {
            return post.author == parent.id
        })
    },

    comments(parent, args, {db}, info) {
        return db.comments.filter((cmnt)=> {
            return cmnt.author == parent.id
        })
    }
}

export {User as default}