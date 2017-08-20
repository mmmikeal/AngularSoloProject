var mongoose = require('mongoose');

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

mongoose.connect('mongodb://gorilla:gorilla@ds137261.mlab.com:37261/angularpokemon', options);

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.on('connected', function() {
  console.log('mongoose connected successfully');
});

module.exports = db;

