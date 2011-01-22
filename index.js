var express = require('express');
var connect = require('connect');
var mongoose = require('mongoose').Mongoose;
var jqtpl = require('jqtpl')

require.paths.unshift('models');

var db = mongoose.connect('mongodb://localhost/sms');

//add and instantiate models here
var message = require('message');
var Message = db.model('Message');

var app = express.createServer(connect.bodyDecoder(), connect.methodOverride());
app.set( "view engine", "html" );
app.register( ".html", require( "jqtpl" ) );


app.get('/', function(request, response) {
    Message.find().all(function(results){
        response.send(results, 200);
    })
    
})

app.post('/message', function(request, response){
    
    var m = new Message();
    m.message = request.params.message;
    m.save(function(){
        response.send("Saved", 200)
    })
    
})


module.exports = app;

if (module === require.main) {
    var host = process.ARGV[3] || "0.0.0.0"
    var port = process.ARGV[2] || 6001
    console.log("Started on " + host + ":" + port + " in " + app.settings.env + " MODE")
    app.listen (port, host)
}