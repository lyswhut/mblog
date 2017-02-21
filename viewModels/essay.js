var Comment = require('../models/comment.js');
var BlogText = require('../models/blogText.js');
var getDate = require('../lib/getDate.js');


module.exports = function (blogTextId) {
  return function(fn){
    BlogText.findById(blogTextId, function (err, blog) {
      if(!blog) return fn(null, null);
      // if(!value) return { error: 'Unknown blogText ID: ' + blogTextId };
      var data = [];
      data.push({
        id: blog._id,
        title: blog.title,
        commentCount: blog.commentCount,
        commentAdCount: blog.commentAdCount,
        date: getDate(blog.date, false),
        view: blog.view,
        ding: blog.ding,
        text: blog.blogText,
        tags: blog.tags,
      });
      Comment.find({'blogTextId': blogTextId, display: true}).sort({_id: -1}).skip(0).limit(5).exec(function (err, _comment) {
        if(err) return fn(err, null);
        var comment = [];
        if (!_comment) {
          data.push(comment);
          return fn(null, data);
        }
        comment = _comment.map(function (comm) {
          var cm = [];
          if (comm.replyComment) cm = forComment(comm.replyComment);
          // console.log(comm);
          return {
            blogTextId : comm.blogTextId,
            commentId: comm.commentId,
            parentId : comm.parentId,
            vertical : comm.vertical,
            horizontal : comm.horizontal,
            authorName : comm.authorName,
            authorImgUrl : comm.authorImgUrl,
            date : getDate(comm.date, true),
            floor : comm.floor,
            ding : comm.ding,
            comment : comm.comment,
            replyComment: cm
          };
        });

        data.push(comment);
        fn(null, data);
      });
      //console.log(blogText);
      //fn(null, blogText);

    });
  };
  // function (err, _blogText) {
  //   if (err) res.send(500, 'Error occurred: database blogText error.');
  //   if (!_blogText) return null;
  //   var blogText = {};
  //   blogText.id = _blogText._id;
  //   blogText.title = _blogText.title;
  //   blogText.date = getDate(_blogText.date, false);
  //   blogText.view = _blogText.view;
  //   blogText.text = _blogText.blogText;
  //   blogText.tags = _blogText.tags;
  //   // console.log(blogText);
  //   return blogText;
  // }
};
// 评论数据格式化
function forComment(comm) {
  return comm.map(function (comm) {
    var cm = [];
    if (comm.replyComment) cm = forComment(comm.replyComment);
    return {
      blogTextId : comm.blogTextId,
      parentId : comm.parentId,
      vertical : comm.vertical,
      horizontal : comm.horizontal,
      authorName : comm.authorName,
      authorImgUrl : comm.authorImgUrl,
      date : getDate(comm.date, true),
      floor : comm.floor,
      ding : comm.ding,
      comment : comm.comment,
      replyComment: cm
    };
  });
}
// 遍历查看评论
function fore(comment) {
  comment.forEach(function(c) {
    if (c.replyComment) fore(c.replyComment);
    console.log(c);
    console.log('---------------------------------');
  });
}