// Your code here!
'use strict';

const Hapi = require('hapi');
var url = require('url');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var http = require("http");


// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var Groups;
var Users;
var Tags;

var idGenerator = 101;

//put config url behind file to hide passwords and username

mongoose.connect(mongoDBConnection.uri);
mongoose.connection.on('open', function () {
    var Schema = mongoose.Schema;
    var GroupSchema = new Schema(
        {
            id: Number,
            name: String,
            city: String,
            state: String,
            description: String,
            zipCode: String,
            adminId: String,
            tags: [String],
            users: { id: String },
            events: { name: String, date: Date, users: { id: String } }
        },
	   { collection: 'groups' }
    );
    Groups = mongoose.model('Lists', GroupSchema);
    var UserSchema = new Schema(
        {
            userId: String,
            fName: String,
            lName: String,
            email: String,
            password: String
        },
	   { collection: 'users' }
    );
    Tasks = mongoose.model('Users', UserSchema);
    var TagSchema = new Schema(
        {
            tagId: String,
            tagOccurence: Number
        },
	   { collection: 'tags' }
    );
    Tags = mongoose.model('Tags', TagSchema);
    console.log('models have been created');
});


// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

// Add the route
server.route({
    method: 'GET',
    path: '/hello',
    handler: function (request, reply) {

        return reply('hello world');
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});

