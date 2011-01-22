var path = require('path');

require.paths.unshift(path.join(__dirname, 'models'), path.join(__dirname, 'lib'));
var express = require('express');
var connect = require('connect');
var mongoose = require('mongoose').Mongoose;
mustache = require('./lib/mustache-wrapper')
var sys = require('sys');

var renderer = mustache.renderer(path.join(__dirname, 'views', 'partials'))



var db = mongoose.connect('mongodb://localhost/sms');

//add and instantiate models here
var message = require('message');
var Message = db.model('Message');

var app = express.createServer(connect.bodyDecoder(), connect.methodOverride());
app.register(".html", renderer)

app.get('/', function(request, response) {
    Message.find().all(function(results){
        response.render('default.html')
    })
    
})


app.get('/locations', function(request, response){
    response.render('locations.html');
})

app.get('/locations/:location', function(request, response){
    response.render('locations.html');
})

app.get('/organizations', function(request, response){
    response.render('organizations.html');
})

app.get('/organizations/:organization', function(request, response){
    response.render('organizations.html');
})

app.post('/message', function(request, response){
    sys.debug(sys.inspect(request.body));
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