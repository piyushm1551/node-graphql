import db from '../db'

var Post = {
    author(parent, args, {db}, info) {
        //console.log('use',usrs,parent);
        return db.usrs.find((user) => {
            console.log(user.id == parent.author)
            return user.id == parent.author
        })
    },

    comments(parent, args, {db}, info) {
        return db.comments.filter((cmnt)=> {
            return cmnt.post == parent.id
        })
    }
}

export {Post as default}