var markdown = require("markdown-it")({langPrefix:'prettyprint linenums lang-'});
var BlogInfo = require('../models/blogInfo.js');
var BlogText = require('../models/blogText.js');
var Comment = require('../models/comment.js');
var Views = require('../models/views.js');
var getDate = require('../lib/getDate.js');

/**
 * 获取博文列表
 * @param  {Number}   page 页数
 * @param  {Function} fn   获取到列表时调用的CallBack
 */
exports.getBlogList = function(page,fn) {
  BlogText.find({display: true}).sort({date: -1}).skip((page-1)*6).limit(6).exec(function (err, blogs) {
    if (err) return fn(err,null);
    // if (err) return res.send(500, 'Error occurred: database error.');
    var data = [];
    data.push(blogs.map(function (blog) {
      return {
        id: blog._id,
        title: blog.title,
        commentCount: blog.commentCount,
        date: getDate(blog.date, false),
        view: blog.view,
        ding: blog.ding,
        textType: blog.textType,
        blogDesc: blog.blogDesc,
        tags: blog.tags,
      };
    }));
    fn(null,data);
  });
};


/**
 * 获取博文内容
 * @param  {String} blogTextId 要获取评论的文章ID
 * @param  {String} ip         访客IP
 * @return {Function(err, Object)}          包含文章内容的对象
 */
exports.getBlogText = function (blogTextId, ip) {
  return function(fn){
    BlogText.findById(blogTextId, function (err, blog) {
      if(!blog) return fn(null, null);
      var data = {};
      var text = blog.blogText;
      if (blog.textType) text = markdown.render(text);
      data.id = blog._id;
      data.title = blog.title;
      data.commentCount = blog.commentCount;
      data.commentReply = blog.commentReply;
      data.commentAdCount = blog.commentAdCount;
      data.date = getDate(blog.date, false);
      data.view = blog.view;
      data.ding = blog.ding;
      data.text = text;
      data.tags = blog.tags;
      fn(null, data);
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


/**
 * 获取评论
 * @param  {String} blogTextId 要获取评论的文章ID
 * @param  {Number} page       页数
 * @return {Function(err, Array)}   评论数组
 */
exports.getComment = function (blogTextId, page) {
  return function (fn) {
    var commentCount = (page-1)*5;
    // if (commentCount > blog.commentCount) return fn(null, null);
    Comment.find({'blogTextId': blogTextId, display: true}).sort({date: -1}).skip(commentCount).limit(5).exec(function (err, _comment) {
      if(err) return fn(err, null);
      var comment = [];
      if (!_comment) return fn(null, comment);
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
          ding : comm.ding,
          comment : comm.comment,
          replyComment: cm
        };
      });
      fn(null, comment);
    });
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
};


/**
 * 插入评论
 * @param  {object} obj {
 *     obj.blogTextId
 *     obj.parentId
 *     [obj.vertical]
 *     [obj.horizontal]
 *     obj.authorType
 *     obj.authorName
 *     obj.authorImgUrl
 *     obj.authorIp
 *     obj.comment
 *     obj.userAgent
 * }
 * return {Function(err, result)}
 */
exports.insertComment = function (obj) {
  return function (fn) {
    if (obj.parentId) {
      Comment.findById(obj.parentId,function (err, comments) {
        if (err) return fn(err, null);
        if (!comments) return fn(null, null);
        var tempReplyComment = comments.replyComment;
        for(var i = 1, length1 = obj.horizontal.length; i < length1; i++){
          tempReplyComment = tempReplyComment[obj.horizontal[i]].replyComment;
        }
        obj.horizontal.push(tempReplyComment.length);
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
          ding: 0,
          comment: obj.comment,
          userAgent: obj.userAgent,
          replyComment: [],
        });
        comments.markModified('replyComment');
        // tempReplyComment = comments.replyComment;
        // comments.replyComment = '';
        // comments.replyComment = tempReplyComment;
        comments.save(function (err, result) {
          if (err) return fn(err, null);
          fn(null, result);
          BlogText.update({_id:result.blogTextId},{$inc: {commentReply: 1}},function (err) {
            if (err) console.log('插入评论出错：'+ err);
          });
        });
      });
    } else {
      Comment.aggregate().match({blogTextId:obj.blogTextId,display:true}).group({_id:null,count:{$sum:1}}).exec(function (err, data) {
        if (err) return fn(err, null);
        var floor = data.length > 0 ? data[0].count+1 : 1;
        new Comment({
          blogTextId: obj.blogTextId,
          vertical: 1,
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
          if (err) return fn(err, null);
          fn(null, result);
          BlogText.update({_id:result.blogTextId},{$inc: {commentCount: 1}},function (err) {
            if (err) console.log('插入评论出错：'+ err);
          });
        });
      });
    }
  };
};
// exports.insertComment = function (obj) {
//   return function (fn) {
//     if (obj.parentId) {
//       var replyFloot;
//       for(var i = 1, length1 = obj.v; i < length1; i++){
//         replyFloot += '';
//       }
//       Comment.aggregate().unwind('replyComment').match({_id: obj.parentId,'replyComment.vertical':obj.vertical,'replyComment.horizontal':obj.h}).exec(function (err, result) {
//         console.log(result);
//       });
//       // Comment.update({blogTextId:obj.blogTextId,commentId:obj.commentId},{$push:{'replyComment':{

//       // }}});
//     } else {
//       Comment.aggregate().match({blogTextId:obj.blogTextId,display:true}).group({_id:null,count:{$sum:1}}).exec(function (err, data) {
//         var floor = data[0].count+1;
//           new Comment({
//             blogTextId: obj.blogTextId,
//             parentId: null,
//             vertical: 1,
//             display: true,
//             authorType: obj.authorType,
//             authorName: obj.authorName,
//             authorImgUrl: obj.authorImgUrl,
//             authorIp: obj.authorIp,
//             date: new Date(),
//             floor: floor,
//             ding: 0,
//             comment: obj.comment,
//             userAgent: obj.userAgent,
//             replyComment: [],
//           }).save(function (err, result) {
//             fn(err,result);
//             BlogText.update({_id:result.blogTextId},{commentCount:floor},function (err) {
//               if (err) console.log('插入评论出错：'+ err);
//             });
//           });
//       });
//     }
//   };
// };



// BlogText.find({display: true,tags:'代码高亮测试'},{title:1}).sort({_id: -1}).limit(6).exec(function (err, blogs) {
  //console.log(blogs);
// });

// BlogText.find({"$and":[{"date":{"$gt":"2017-3-2 0:0:0"}},{"date":{"$lt":"2017-3-3 0:0:0"}}]},{title:1,date:1}).sort({_id: -1}).limit(6).exec(function (err, blogs) {
//   console.log(blogs);
// });



// BlogInfo.find({},{tags:1},function (err, tags) {
//   var aaa = ["散文","情感","测试文章","JavaScript","123"];
//   var newtag = [];
//   outer: for (var i = 0; i < aaa.length; i++) {
//     inter: for (var j = 0; j < tags[0].tags.length; j++) {
//       if (tags[0].tags[j] === aaa[i]) continue outer;
//     }
//     tags[0].tags.push(aaa[i]);
//   }
//   tags[0].save();
// });

// BlogInfo.find({},{tags:1},function (err, tags) {
//   console.log(tags[0].tags);
  // BlogText.find({display: true,tags:'代码高亮测试'},{title:1}).sort({_id: -1}).limit(6).exec(function (err, blogs) {
  //   console.log(blogs);
  // });
// });







