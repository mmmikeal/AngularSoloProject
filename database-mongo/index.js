var mongoose = require('mongoose');

mongoose.connect('mongodb://mmmikeal:151angular@ds137261.mlab.com:37261/angularpokemon');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.on('connected', function() {
  console.log('mongoose connected successfully');
});

module.exports = db;

