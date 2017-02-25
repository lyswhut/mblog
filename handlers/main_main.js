var BlogText = require('../models/blogText.js');
var essay = require('../viewModels/essay.js');
var home = require('../viewModels/home.js');
var parts = require('../viewModels/parts.js');

exports.get_home = function(req, res, next) {
  var page = req.query.page && parseInt(req.query.page) || 1;
  if (page > res.locals.blogCountPg) return next('route');
  var startPg = page-2,endPg = page+2,blogCountPg = res.locals.blogCountPg || 1;
  home(page, function (err, data) {
    if (err) res.send(500, 'Error occurred: database error.');
    if (!data) return next('route');
    res.render('home', {
      title: '首页' + ' -- ' + res.locals.blogName,
      blogs: data[0],
      countPg: blogCountPg,
      startPg: blogCountPg <= 5 ? 1 : (blogCountPg - page <= 5 ? blogCountPg - 5 : startPg),
      endPg: blogCountPg <= 5 ? blogCountPg : (endPg >= blogCountPg ? blogCountPg : endPg),
      pg: page,
    });
  });
};

exports.get_essay = function(req, res, next) {
  var page = req.query.page && parseInt(req.query.page) || 1;
  essay(req.params.id, page, req.ip)(function (err, data) {
    if (err) res.send(500, 'Error occurred: database error.');
    if (!data) return next('route');
    var startPg = page-2,endPg = page+2,countPg = data[0].commentCount === 0 ? 1 : Math.ceil(data[0].commentCount/5);
    if (page > countPg) return next('route');
    res.render('blogEssay', {
      title: data[0].title + ' -- ' + res.locals.blogName,
      blogs: data[0],
      comment: data[1],
      countPg: countPg,
      startPg: countPg <= 5 ? 1 : (countPg - page <= 5 ? countPg - 5 : startPg),
      endPg: countPg <= 5 ? countPg : (endPg >= countPg ? countPg : endPg),
      pg: page,
    });
    //console.log(data[1]);
  });

  // comment(req.params.id, function (err, data) {
  //   console.log(err);
  //   console.log(data);
  // });
  // BlogText.findById(req.params.id, function (err, data) {
  //   if (err) res.send(500, 'Error occurred: database error.');
  //   var _data = comment(data._id);
  //   //console.log(_data);
  //   res.render('blogDetails', {
  //     title: data.title + ' -- ' + res.locals.blogName,
  //     data: data
  //   });
  // });
  // var data = comment(req.params.id);
  // res.render('blogDetails', {
  //   title: data.title + ' -- ' + res.locals.blogName,
  //   data: data
  // });
  // res.render('blogDetails', {
  //   title: '标题11111111' + ' -- ' + res.locals.blogName
  // });
};
var aaa = {
  blogTextId: '58ac545e2f7ff516cf44f666',
  authorName: 'aaa',
  authorImgUrl: '/img/text.png',
  comment: 'commentTextcommentTextcommentTextcommentTextcommentTextcommentTextcommentText',
  userAgent: 'aaaaaaaa',
  replyComment: [],
};

// parts.insertComment(null,null,null,aaa)(function (err, result) {
//   console.log(result);
// });
// exports.post_comment = function () {

// };



