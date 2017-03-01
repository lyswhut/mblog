// var markdown = require( "markdown" ).markdown;
// var BlogText = require('../models/blogText.js');
// var essay = require('../viewModels/essay.js');
// var home = require('../viewModels/home.js');
// var parts = require('../viewModels/parts.js');
var blogEdit = require('../viewModels/admin/blogEdit.js');


exports.get_home = function(req, res, next) {
  res.render('admin/home', {
    title: '后台管理'
  });
};

exports.get_addBlog = function(req, res, next) {
  res.render('admin/addBlog', {
    _csrfToken: req.csrfToken(),
    title: '文章添加'
  });
};
exports.post_addBlog = function(req, res, next) {
  var textType = req.body.textType === '1' ? 1 : 0;
  blogEdit.addBlog({
    title: req.body.title.trim(),
    author: 'admin',
    tags: req.body.tags.trim() ? req.body.tags.split(',') : [],
    display: true,
    blogDesc: req.body.blogDesc.trim(),
    textType : textType,
    blogText: req.body.blogText.trim()
  })(function (err, result) {
    if (err) return res.send(500, 'Error occurred: database error.');
    console.log(result);
    return res.redirect(303, '/');
  });
};