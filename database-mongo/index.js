var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var itemSchema = mongoose.Schema({
  name: Object,
  description: Object,
  urlImg: String
});

var Item = mongoose.model('Item', itemSchema);


var selectOne = function(data, callback) {
  Item.find({name: data.name}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

var saveAll = function(data, callback) {
  var newEntry = new Item({name: data.name, description: data.description, urlImg: data.url});
  newEntry.save((err, newLineUp) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, newEntry);
    }
  })
};

module.exports.selectAll = selectAll;
module.exports.saveAll = saveAll;