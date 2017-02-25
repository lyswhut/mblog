var mongoose = require('mongoose');


var viewsSchema = mongoose.Schema({
  vid: String,
  ips: []
});



var ViewsSchema = mongoose.model('Views', viewsSchema);


module.exports = ViewsSchema;

