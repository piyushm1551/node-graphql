import {
    GraphQLServer,
    PubSub
} from 'graphql-yoga';

//import make 
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';
import User from './resolvers/User';
import prisma from '../prisma';

//console.log('prisma', prisma);

const logInput = async (resolve, root, args, context, info) => {
    var result = {};
    result = await resolve(root, args, context, info);
    return result
}

var formatResponse = function (response) {
    if (!response.data) {
        return {
            code: response.errors[0].statusCode ? response.errors[0].statusCode : null,
            data: null,
            message: response.errors[0].message ? response.errors[0].message : null
        }
    }
    return {
        code: response.code ? response.code : null,
        data: response.data ? response.data : null,
        message: response.message ? response.message : null
    }
}

var formatError = function (response) {
    console.log('this', response);
    var a = {
        code: 100,
        data: 400,
        message: response.message
    }

    console.log('a', a);

    //this.formatResponse(a);
    return a;
}

const FormatError = require('easygraphql-format-error')

const formatErrorobj = new FormatError([{
    name: 'INVALID_EMAIL',
    message: 'The email is not valid',
    statusCode: '400'
}])
// pass the errorName on the context
const errorName = formatErrorobj.errorName;
//console.log(formatError.getError())
var bodyParserOptions = {
    //     limit: '',
    // inflate:''
    // reviver: '' ;
    // strict: boolean;
    // type ? : string;
    // verify ? : any;
}

const pubsub = new PubSub();
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription,
        Post,
        User,
        Comment
    },
    // context: {
    //     db,
    //     pubsub,
    //     prisma,
    //     errorName,
    //     request,
    //     response
    // },
    context: ({ request, response, ...rest }) => {
        return {
            req: request,
            res: response,
            db: db,
            prisma: prisma,
            errorName: errorName
        };
    },

    middlewares: [logInput],
})

var server_options = {
    formatResponse: formatResponse,
    formatError: (err) => {
        console.log('err', err.message);
        return formatErrorobj.getError(err)
    },
}

server.start(server_options, ({ port }) => {
    console.log('serever up at', port);
});


psql - d template1 - c "ALTER USER postgres WITH PASSWORD 'JSQZDTKREANKTKJMOZSRTSUDVBYKOFEGUGKZTINEZNVFPHHRFWQOIB';"

aws ec2 authorize - security - group - ingress--group - id sg - 07e97101bf203b3d4--protocol tcp--port 5432 --source - group sg - 0e64cc391c95afc57