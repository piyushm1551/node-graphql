var comments = [
    {
        id : '1',
        text : 'Hello',
        author : '1',
        post : '1'
    },
    {
        id: '2',
        text: 'Sat Sri Akal',
        author : '1',
        post : '1'
    },
    {
        id : '3',
        text : 'Mitron',
        author : '2',
        post : '2'
    },
    {
        id: '4',
        text: 'Namaskara',
        author : '2',
        post : '3'
    }
]

var usrs =  [
    {
     id : '1',
     name : 'Jamie',
     email : 'abc@gmail.com',
     age: 25   
    },
        {
        id : '2',
        name : 'Xing'  ,
        email : 'abc@trinket.com' ,
        age: 25
    },
{
    id : '3',
    name : 'Modi'  ,
    email : 'chappaninchkascena.com' ,
    age: 56
}];    
     
       var post_array = [
        {
            id: '1',
            title: 'ram',
            body: 'shyam',
            published: true,
            author: '1'
        },
            {
                id: '2',
                title: 'Satanic Verses',
                body: 'asda',
                published: false,
                author: '1'
           },
           {
            id: '3',
            title: 'Titan',
            body: 'Satanic Verses',
            published: false,
            author: '2'
           }
        ]

const db = {
    post_array,
    usrs,
    comments
}

export {db as default}