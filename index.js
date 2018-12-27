'use strict'

const Hapi = require('hapi');
const mongoose = require('mongoose');
const mongoDbUri = 'mongodb://localhost:27017/XDK_db';
const routes = require('./routes/routes')
const server = Hapi.server({
    port: 3000,
    routes: {
        cors: {
            origin: ["*"],
            credentials: true
        }
    },    
})

//Requires plugins and initializing server
const init = async () => {
    await server.register([
        { plugin: require('hapi-require-https') }
    ])

    await server.start()
    
    //Connect with mongoDB
    mongoose.connect(mongoDbUri).then(() =>{
            console.log('App is connected to mongo')
        }, err => {
        console.log(err)
    })
    console.log('Server started on port', server.info.port)
}

//Add routes for a better organization for our server
server.route(routes)

//Example
server.route({
    path: '/',
    method: 'GET',
    handler: (req, h) =>  {
        return 'XDK API'
    }
});

//Unhandled
process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit()
})

init()