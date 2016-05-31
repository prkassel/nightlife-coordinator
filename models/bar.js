var mongoose = require('mongoose');

var barSchema = mongoose.Schema({
  barId: String,
  name: String,
  url: String,
  img: String,
  snippet: String,
  rating: String,
  attending: []
});

module.exports = mongoose.model('Bar', barSchema);
