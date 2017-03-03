var mongoose = require('mongoose');

  // credentials: credentials,
  // blogName: '寂静天空',
  // serverDomain: '192.168.1.200',
  // port: 80,
  // staticUrl: '',
  // x_powered_by: false,
  // minHtml: false

var blogInfoSchema = mongoose.Schema({
  blogName: String,
  serverDomain: String,
  port: Number,
  staticUrl: String,
  x_powered_by: Boolean,
  minHtml: Boolean,
  navs: [String],
  tags: [String]
});


// blogTextSchema.methods.getComments = function () {
//  return Comment.find({'blogTextId' : this._id, display: true}).sort({_id: -1}).skip(0).limit(5);
// };


var BlogInfoSchema = mongoose.model('blogInfo', blogInfoSchema);

BlogInfoSchema.find(function(err, info) {
  if (info.length) return;
  new BlogInfoSchema({
    blogName: '寂静天空',
    serverDomain: '192.168.1.200',
    port: 80,
    staticUrl: '',
    x_powered_by: false,
    minHtml: false,
    navs: ['首页', '学习笔记'],
    tags: []
  }).save();
});

module.exports = BlogInfoSchema;