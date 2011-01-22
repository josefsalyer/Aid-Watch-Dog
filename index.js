var express = require('express');
var connect = require('connect');

var app = express.createServer(connect.bodyDecoder(), connect.methodOverride());
var messages = []

app.get('/', function(request, response) {
    response.send(messages, 200);
})

app.post('/:message', function(request, response){
    messages.push(request.params.message)
    response.send(200)
})


module.exports = app;

if (module === require.main) {
    var host = process.ARGV[3] || "0.0.0.0"
    var port = process.ARGV[2] || 6001
    console.log("Started on " + host + ":" + port + " in " + app.settings.env + " MODE")
    app.listen (port, host)
}