import db from '../db'

var Comment = {
    author(parent, args, {db}, info) {
        return db.usrs.find((user)=>{
            return parent.author == user.id
        })
    },

    post(parent,args,{db}, info) {
        return db.post_array.find((post)=> {
            return post.id == parent.post
        })
    },
}

export {Comment as default}