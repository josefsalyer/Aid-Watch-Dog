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

app.configure(function() {
    app.set('views', path.join(__dirname, 'views'))
})

app.get('/', function(request, response) {
     Message.find().all(function(messages){
         response.render(path.join(__dirname, "views", 'default.html'), {messages:messages});
     })
    
})

app.get('/ping', function(request, response) {
    response.send("pong2")
})

app.get('/partialtest', function(request, response) {
    response.render('test.html', {stuff:['one', 'two','three']})
})

app.get('/locations', function(request, response){
    Message.find().all(function(messages){
        response.render(path.join(__dirname, "views", "locations.html"), {messages:messages});
    })
})

app.get('/locations/city/:city', function(request, response){
    Message.find({city:request.params.city}).all(function(messages){
        response.render(path.join(__dirname, "views", "locations.html"), {messages:messages});
    })
})

app.get('/locations/state/:state', function(request, response){
    Message.find({state:request.params.state}).all(function(messages){
        response.render(path.join(__dirname, "views", "locations.html"), {messages:messages});
    })
})

app.get('/locations/zip/:zip', function(request, response){
    Message.find({zip:request.params.zip}).all(function(messages){
        response.render(path.join(__dirname, "views", "locations.html"), {messages:messages});
    })
})

app.get('/locations/country/:country', function(request, response){
    Message.find({country:request.params.country}).all(function(messages){
        response.render(path.join(__dirname, "views", "locations.html"), {messages:messages});
    })
})


app.get('/organizations', function(request, response){
    response.render('organizations.html');
})

app.get('/organizations/:organization', function(request, response){
    response.render('organization.html');
})

app.get('/tags', function(request, response){
    response.render('tags.html')
})

app.get('/tags/:tag', function(request, response){
    response.render('tag.html')
})

app.post('/tags/:message_id', function(request, response){
    response.redirect('tags')
})

app.post('/message', function(request, response){
    sys.debug(sys.inspect(request.body));
    var m = new Message();
    m.message_id= request.body.SmsMessageSid.toString();
    m.message   = request.body.Body;
    m.from      = request.body.From;
    m.sent_at   = new Date();
    m.city      = request.body.FromCity;
    m.state     = request.body.FromState;
    m.zip       = request.body.FromZip;
    m.country   = request.body.FromCountry; 
    
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