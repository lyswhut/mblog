var BlogText = require('../models/blogText.js');
var essay = require('../viewModels/essay.js');
var home = require('../viewModels/home.js');
var parts = require('../viewModels/parts.js');


exports.get_home = function(req, res, next) {
  var page = req.query.page && parseInt(req.query.page) || 1;
  if (page > res.locals.blogCountPg) return next('route');
  var startPg = page-2,endPg = page+2,blogCountPg = res.locals.blogCountPg || 1;
  home(page, function (err, data) {
    if (err) return res.send(500, 'Error occurred: database error.');
    if (!data) return next('route');
    res.render('home', {
      _csrfToken: req.csrfToken(),
      navCode: 1,
      title: '首页',
      blogs: data[0],
      countPg: blogCountPg,
      startPg: blogCountPg <= 5 ? 1 : (blogCountPg - page <= 5 ? blogCountPg - 5 : startPg),
      endPg: blogCountPg <= 5 ? blogCountPg : (endPg >= blogCountPg ? blogCountPg : endPg),
      pg: page,
    });
  });
};



exports.get_essay = function(req, res, next) {
  var page = req.query.page && parseInt(req.query.page) || null;
  var ip = req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip.replace(/::ffff:/, '');
  essay(req.params.id, page, ip)(function (err, data) {
    if (err) return res.send(500, 'Error occurred: database error.');
    if (!data) return next('route');
    page = data[2];
    var startPg = page-2,endPg = page+2,countPg = data[0].commentCount === 0 ? 1 : Math.ceil(data[0].commentCount/5);
    if (page > countPg) return next('route');
    res.render('blogEssay', {
      _csrfToken: req.csrfToken(),
      navCode: 2,
      title: data[0].title,
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

exports.post_essay = function (req, res, next) {
  var ip = req.headers['x-real-ip'] ? req.headers['x-real-ip'] : req.ip.replace(/::ffff:/, '');
  var horizontal = req.body.horizontal ? req.body.horizontal.split(',') : null;
  parts.insertComment({
    blogTextId: req.body.blogTextId,
    parentId: req.body.commentId,
    vertical: parseInt(req.body.floor),
    horizontal: horizontal,
    authorType: 'visitor',
    authorName: req.body.userName,
    authorImgUrl: '/img/text.png',
    authorIp: ip,
    comment: req.body.comment,
    userAgent: req.headers['user-agent'],
  })(function (err, result) {
    if (err) return res.send(500, 'Error occurred: database error.');
    if (!result) return next('route');
    return res.redirect(303, '/essay/'+req.body.blogTextId);
  });
};




/*
var Comment = require('../models/comment.js');
var aaa = {
  // blogTextId: '58b16821104edf191cc34aa3',
  // parentId: '58b28cf365cfc77588a6abe5',
  // vertical: 1,
  // horizontal: [0],
  // authorType: 'visitor',
  // authorName: 'qqqqqqqqqqqqqqqqqqqqqqqqqqqq',
  // authorImgUrl: '/img/text.png',
  // authorIp: '192.168.1.1',
  // comment: 'commentTextcommentTextcommentTextcommentTextcommentTextcommentTextcommentText',
  // userAgent: 'aaaaaaaa',
  blogTextId: '58b16821104edf191cc34aa3',
  parentId: null,
  authorType: 'visitor',
  authorName: '阿道夫',
  authorImgUrl: '/img/text.png',
  authorIp: '192.168.1.1',
  comment: '我是测试评论！',
  userAgent: 'aaaaaaaa',
};
// replyComment.horizontal = 11;
// replyComment.
a(aaa);
function a (obj) {
  if (obj.parentId) {
    Comment.findById(obj.parentId,function (err, comments) {
      if (err) return console.log(err);
      if (!comments) return;
      var tempReplyComment = comments.replyComment;
      for(var i = 1, length1 = obj.horizontal.length; i < length1; i++){
        tempReplyComment = tempReplyComment[obj.horizontal[i]].replyComment;
      }
      obj.horizontal.push(tempReplyComment.length);
      console.log(tempReplyComment);
      tempReplyComment.push({
        blogTextId: obj.blogTextId,
        parentId: obj.parentId,
        horizontal: obj.horizontal,
        vertical: obj.vertical+1,
        display: true,
        authorType: obj.authorType,
        authorName: obj.authorName,
        authorImgUrl: obj.authorImgUrl,
        authorIp: obj.authorIp,
        date: new Date(),
        ding: 0,
        comment: obj.comment,
        userAgent: obj.userAgent,
        replyComment: [],
      });
      tempReplyComment = comments.replyComment;
      comments.replyComment = '';
      comments.replyComment = tempReplyComment;
      comments.save(function (err, result) {
        BlogText.update({_id:result.blogTextId},{commentCount:floor},function (err) {
          if (err) console.log('插入评论出错：'+ err);
        });
      });
    });
    // Comment.aggregate().unwind('replyComment').match(match).exec(function (err, result) {
    //   if (err) return console.log(err);
    //   console.log(result);
    //   if (!result.length) return;
    //   temp = result[0];
    //   for(var i = 0, length1 = obj.vertical-1; i < length1; i++) temp = temp.replyComment;
    //   obj.horizontal.push(temp.length+1);
    //   var replyDate = new ReplyComment({
    //     blogTextId: obj.blogTextId,
    //     parentId: obj.parentId,
    //     horizontal: obj.horizontal,
    //     vertical: obj.vertical+1,
    //     display: true,
    //     authorType: obj.authorType,
    //     authorName: obj.authorName,
    //     authorImgUrl: obj.authorImgUrl,
    //     authorIp: obj.authorIp,
    //     date: new Date(),
    //     ding: 0,
    //     comment: obj.comment,
    //     userAgent: obj.userAgent,
    //     replyComment: [],
    //   });
    //   Comment.update(match,{$push:{'replyComment.$.replyComment':replyDate}},function (err, result) {
    //     if (err) return console.log(err);
    //     console.log(result);
    //   });
    // });
  // } else if (obj.vertical === 1) {
    // Comment.find({commentId: obj.parentId}, function (err, result) {
    //   if (err) return console.log(err);
    //   if (!result.length) return;
    //   obj.horizontal.push(result[0].replyComment.length+1);
    //   var replyDate = new ReplyComment({
    //     blogTextId: obj.blogTextId,
    //     parentId: obj.parentId,
    //     horizontal: obj.horizontal,
    //     vertical: obj.vertical+1,
    //     display: true,
    //     authorType: obj.authorType,
    //     authorName: obj.authorName,
    //     authorImgUrl: obj.authorImgUrl,
    //     authorIp: obj.authorIp,
    //     date: new Date(),
    //     ding: 0,
    //     comment: obj.comment,
    //     userAgent: obj.userAgent,
    //     replyComment: [],
    //   });
    //   Comment.update({commentId: obj.parentId},{$push:{'replyComment':replyDate}},function (err, result) {
    //     if (err) return console.log(err);
    //     console.log(result);
    //   });
    //   console.log(result);
    // });
  } else {
    Comment.aggregate().match({blogTextId:obj.blogTextId,display:true}).group({_id:null,count:{$sum:1}}).exec(function (err, data) {
      var floor = data[0].count+1;
        new Comment({
          blogTextId: obj.blogTextId,
          vertical: 0,
          horizontal: [0],
          display: true,
          authorType: obj.authorType,
          authorName: obj.authorName,
          authorImgUrl: obj.authorImgUrl,
          authorIp: obj.authorIp,
          date: new Date(),
          floor: floor,
          ding: 0,
          comment: obj.comment,
          userAgent: obj.userAgent,
          replyComment: [],
        }).save(function (err, result) {
          //fn(err,result);
          BlogText.update({_id:result.blogTextId},{commentCount:floor},function (err) {
            if (err) console.log('插入评论出错：'+ err);
          });
        });
    });
  }
}
*/




