require.paths.unshift('vendor/mongoose');
var mongoose = require('mongoose').Mongoose;
var db = mongoose.connect('mongodb://localhost/sms');

/*
{ AccountSid: 'AC4daa1a1f7ac808f5c7dc9b04616c5608'
, Body: 'Help my house is on fire!'
, ToZip: '84015'
, FromState: 'AZ'
, ToCity: 'CLEARFIELD'
, SmsSid: 'SM77faefe89bc8796df49e2deb87a7bdfd'
, ToState: 'UT'
, To: '+18017843577'
, ToCountry: 'US'
, FromCountry: 'US'
, SmsMessageSid: 'SM77faefe89bc8796df49e2deb87a7bdfd'
, ApiVersion: '2010-04-01'
, FromCity: 'PHOENIX'
, SmsStatus: 'received'
, From: '+14802865875'
, FromZip: '85003'
}

*/

mongoose.model('Message', {
    properties: ['message', 'sent_at', 'tags', 'organizations','locations'],
    methods: {
        save: function(fn){
            this.sent_at = new Date();
            this.tags = this.message.split(" ");
            this.__super__(fn);
        }
    },
})
