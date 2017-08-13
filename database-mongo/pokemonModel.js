const mongoose = require('mongoose');


var itemSchema = mongoose.Schema({
  name: Object,
  description: Object,
  urlImg: String
});


var Item = module.exports = mongoose.model('Item', itemSchema);

module.exports.selectOne = function(data, callback) {
  Item.find({name: data.name}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.saveAll = function(data, callback) {
  var newEntry = new Item({name: data.name, description: data.description, urlImg: data.url});
  newEntry.save((err, newLineUp) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, newEntry);
    }
  })
};

