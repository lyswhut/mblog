var mongoose = require('mongoose');

  // credentials: credentials,
  // blogName: '寂静天空',
  // serverDomain: '192.168.1.200',
  // port: 80,
  // staticUrl: '',
  // x_powered_by: false,
  // minHtml: false

var blogInfoSchema = mongoose.Schema({
  blogNavs: [String],
  blogTags: [String]
});

// blogTextSchema.methods.getComments = function () {
//  return Comment.find({'blogTextId' : this._id, display: true}).sort({_id: -1}).skip(0).limit(5);
// };


var BlogInfoSchema = mongoose.model('blogInfo', blogInfoSchema);

BlogInfoSchema.find(function(err, infos) {
  if (infos.length) return;
  new BlogInfoSchema({
    blogNavs: ['首页', '学习笔记'],
    blogTags: ["散文", "测试文章", "JavaScript", "Node.js", "dataBase", "代码高亮测试", "情感", "情感散文", "jQuery"],
  }).save();
});

module.exports = BlogInfoSchema;