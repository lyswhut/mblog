// var markdown = require( "markdown" ).markdown;
// var BlogText = require('../models/blogText.js');
// var essay = require('../viewModels/essay.js');
// var home = require('../viewModels/home.js');
// var parts = require('../viewModels/parts.js');
var blogEdit = require('../viewModels/admin/blogEdit.js');
var Login = require('../viewModels/admin/login.js');

exports.get_home = function(req, res, next) {
  if (!req.session.logged_in) return res.redirect(303, '/login');
  res.render('admin/home', {
    title: '后台管理',
    userName: req.session.name
  });
};

exports.get_login = function(req, res, next) {
  res.render('admin/login', {
    _csrfToken: req.csrfToken(),
    title: '后台登录'
  });
};

exports.post_login = function(req, res, next) {
  var userName = req.body.userName.trim(), password = req.body.password.trim();
  var ip = req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip.replace(/::ffff:/, '');
  var userAgent = req.headers['user-agent'];
  Login.verification(ip)(function (err,result) {
    if (err) return res.send(500, 'Error occurred: database error.');
    if (!result.result) return res.redirect(303, '/login');
    if (userName !== 'admin' || password !== 'admin') {
      Login.addloginLog({result: false,userName: userName,password: password,ip: ip,userAgent: userAgent});
      return res.redirect(303, '/login');
    }
    Login.addloginLog({result: true,userName: userName,password: password,ip: ip,userAgent: userAgent});
    req.session.logged_in = true;
    req.session.name = userName;
    res.redirect(303, '/');
  });
};

exports.get_logout = function(req, res, next) {
  req.session.destroy(function (err) {
    if (err) return res.send(500, 'Error occurred: destroy session error.');
    res.redirect(303, '/login');
  });
};

exports.get_addBlog = function(req, res, next) {
  if (!req.session.logged_in) return res.redirect(303, '/login');
  res.render('admin/addBlog', {
    _csrfToken: req.csrfToken(),
    title: '文章添加'
  });
};
exports.post_addBlog = function(req, res, next) {
  if (!req.session.logged_in) return res.redirect(303, '/login');
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
    // console.log(result);
    return res.redirect(303, '/');
  });
};