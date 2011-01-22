require.paths.unshift('vendor/mongoose');
var mongoose = require('mongoose').Mongoose;
var db = mongoose.connect('mongodb://localhost/sms');

mongoose.model('Message', {
    properties: ['message', 'sent_at', 'tags'],
    methods: {
        save: function(fn){
            this.sent_at = new Date();
            this.tags = this.message.split(" ");
            this.__super__(fn);
        }
    },
})
