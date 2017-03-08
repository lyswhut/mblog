var markdown = require("markdown-it")({langPrefix:'prettyprint linenums lang-'});
var Comment = require('../models/comment.js');
var BlogText = require('../models/blogText.js');
var Views = require('../models/views.js');
var getDate = require('../lib/getDate.js');


module.exports = function (blogTextId,page,ip) {
  return function(fn){
    BlogText.findById(blogTextId, function (err, blog) {
      if(!blog) return fn(null, null);
      var data = [];
      var text = blog.blogText;
      if (blog.textType) text = markdown.render(text);
      data.push({
        id: blog._id,
        title: blog.title,
        commentCount: blog.commentCount,
        commentReply: blog.commentReply,
        commentAdCount: blog.commentAdCount,
        date: getDate(blog.date, false),
        view: blog.view,
        ding: blog.ding.length,
        text: text,
        tags: blog.tags,
      });
      page = page ? page : blog.commentCount ? Math.ceil(blog.commentCount/5) : 1;
      var commentCount = (page-1)*5;
      if (commentCount > blog.commentCount) return fn(null, null);
      Comment.find({'blogTextId': blogTextId, display: true}).sort({_id: 1}).skip(commentCount).limit(5).exec(function (err, _comment) {
        if(err) return fn(err, null);
        var comment = [];
        if (!_comment) {
          data.push(comment);
          return fn(null, data);
        }
        comment = _comment.map(function (comm) {
          var cm = [];
          if (comm.replyComment) cm = forComment(comm.replyComment);
          return {
            blogTextId : comm.blogTextId,
            commentId: comm._id,
            parentId : comm.parentId,
            vertical : comm.vertical,
            horizontal : comm.horizontal,
            authorName : comm.authorName,
            authorImgUrl : comm.authorImgUrl,
            date : getDate(comm.date, true),
            floor : comm.floor,
            ding : comm.ding.length,
            comment : comm.comment,
            replyComment: cm
          };
        });
        //console.log(comment);
        data.push(comment);
        data.push(page);
        // fore(comment);
        fn(null, data);
      });
      Views.aggregate().unwind('ips').match({vid: data[0].id.toString(),'ips.ip':ip}).exec(function (err, rip) {
        //console.log(rip);
        if (err) console.log(err);
        if (rip.length ===0) {
          Views.update({vid: data[0].id},{$push:{'ips':{ip:ip,date:new Date()}}},{upsert: true},function (err) {
            if (err) console.log('插入IP出错：'+ err);
          });
        } else if ((new Date().getTime() - 86400000) > (new Date(rip[0].ips.date).getTime())) {
          Views.update({vid: data[0].id,'ips.ip':ip},{'ips.$.date':new Date()},{upsert: true},function (err) {
            if (err) console.log('更新IP出错：'+ err);
          });
        } else return;
        BlogText.update({_id:data[0].id},{$inc: {view: 1}},function (err) {
          if (err) console.log('插入浏览数出错：'+ err);
        });
      });
    });
  };
};
// 评论数据格式化
function forComment(comm) {
  return comm.map(function (comm) {
    var cm = [];
    if (comm.replyComment) cm = forComment(comm.replyComment);
    return {
      blogTextId : comm.blogTextId,
      parentId : comm._id,
      vertical : comm.vertical,
      horizontal : comm.horizontal,
      authorName : comm.authorName,
      authorImgUrl : comm.authorImgUrl,
      date : getDate(comm.date, true),
      floor : comm.floor,
      ding : comm.ding.length,
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
