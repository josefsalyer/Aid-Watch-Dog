
// mustache templating system. It isn't currently
// express compliant, so let's make a mini-module

var sys = require("sys")
var source = require('mustache')
var fs = require('fs')
var path = require('path')

exports.renderer = function (partialdir) {
    
    // easily create a renderer. Load partials directory
    
    var renderer = new exports.Renderer()
    if (partialdir) 
        renderer.loadPartialsFromDirectory(partialdir)
    return renderer
}

exports.Renderer = function() {
    
    var self = this
    
    self.partials = {}
    
    self.render = function (string, options) {
        
        // I'm not sure what the "right" way to get "body" into the layout is
        // but it's probably not this :)
        
        options.body = options.body || options.locals.body
        results = source.to_html(string, options, self.partials)
        return results
    },
    
    self.loadPartialsFromDirectory = function (dir) {
        
        // Scan the directory for files and load them as partials
        
        fs.readdir(dir, function (err, files) {
            for (var index in files) {
                var file = files[index]
                if (file.match(/\.(mustache|html)$/)) {
                    filepath = path.join(dir, file)
                    self.loadPartial(filepath)
                }
            }
        })
    },
    
    self.loadPartial = function (file) {
        
        // Load a partial from a file and set the name from 
        // the filename
        
        fs.readFile(file, function (err, contents) {
            var basename = file.replace(/^.*?(\w+)\.\w+$/, "$1")
            self.partials[basename] = contents.toString()
            sys.puts("Loaded Partial: " + basename)
        })
    }
    
}

exports.render = exports.renderer().render


