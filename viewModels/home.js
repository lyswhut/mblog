var BlogText = require('../models/blogText.js');
var getDate = require('../lib/getDate.js');

module.exports = function(fn) {
    BlogText.find({display: true}).sort({_id: -1}).skip(0).limit(6).exec(function (err, blogs) {
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
          text: blog.blogText,
          tags: blog.tags,
        };
      }));
      fn(null,data);
    });

};



// module.exports = function (blogTextId) {

//   Comment.find({'blogTextId' : blogTextId, display: true}).sort({_id: -1}).skip(0).limit(5).exec(function (err, _comment) {
//     if (err) res.send(500, 'Error occurred: database comment error.');
//     var comment = [];
//     if (!_comment) return data.push(comment);
//     comment = _comment.map(function (comm) {
//       var cm = [];
//       if (comm.replyComment) cm = forComment(comm.replyComment);
//       return {
//         blogTextId : comm.blogTextId,
//         commentId: comm._id,
//         parentId : comm.parentId,
//         vertical : comm.vertical,
//         horizontal : comm.horizontal,
//         authorName : comm.authorName,
//         authorImgUrl : comm.authorImgUrl,
//         date : getDate(comm.date, true),
//         floor : comm.floor,
//         ding : comm.ding,
//         comment : comm.comment,
//         replyComment: cm
//       };
//     });
//     //console.log(data);
//   });

// };

// // 评论数据格式化
// function forComment(comm) {
//   return comm.map(function (comm) {
//     var cm = [];
//     if (comm.replyComment) cm = forComment(comm.replyComment);
//     return {
//       blogTextId : comm.blogTextId,
//       parentId : comm.parentId,
//       vertical : comm.vertical,
//       horizontal : comm.horizontal,
//       authorName : comm.authorName,
//       authorImgUrl : comm.authorImgUrl,
//       date : getDate(comm.date, true),
//       floor : comm.floor,
//       ding : comm.ding,
//       comment : comm.comment,
//       replyComment: cm
//     };
//   });
// }
// // 遍历查看评论
// function fore(comment) {
//   comment.forEach(function(c) {
//     if (c.replyComment) fore(c.replyComment);
//     console.log(c);
//     console.log('---------------------------------');
//   });
// }







// Comment.find(function(err, comment) {
//   if (comment.length) return;

//   new Comment({
//     blogTextId: '58aaca8b5424db52612cbab8',
//     parentId: null,
//     vertical: 0,
//     horizontal: 0,
//     display: true,
//     authorName: 'aaa',
//     authorImgUrl: '/img/text.png',
//     date: new Date(),
//     floor: 1,
//     ding: 2,
//     comment: 'commentTextcommentTextcommentTextcommentTextcommentTextcommentTextcommentText',
//     userAgent: 'aaaaaaaa',
//     replyComment: [{
//       blogTextId: '58aaca8b5424db52612cbab8',
//       parentId: '',
//       vertical: 1,
//       horizontal: 0,
//       display: true,
//       authorName: 'ccc',
//       authorImgUrl: '/img/text.png',
//       date: new Date(),
//       floor: 1,
//       ding: 2,
//       comment: 'commentTextcommentTextcommentTextcommentTextcommentTextcommentTextcommentText',
//       userAgent: 'aaaaaaaa',
//       replyComment: [{
//         blogTextId: '58aaca8b5424db52612cbab8',
//         parentId: '',
//         vertical: 2,
//         horizontal: 0,
//         display: true,
//         authorName: 'eee',
//         authorImgUrl: '/img/text.png',
//         date: new Date(),
//         floor: 1,
//         ding: 2,
//         comment: 'commentTextcommentTextcommentTextcommentTextcommentTextcommentTextcommentText',
//         userAgent: 'aaaaaaaa',
//         replyComment: [{
//           blogTextId: '58aaca8b5424db52612cbab8',
//           parentId: '',
//           vertical: 3,
//           horizontal: 0,
//           display: true,
//           authorName: 'rrr',
//           authorImgUrl: '/img/text.png',
//           date: new Date(),
//           floor: 1,
//           ding: 2,
//           comment: 'commentTextcommentTextcommentTextcommentTextcommentTextcommentTextcommentText',
//           userAgent: 'aaaaaaaa',
//           replyComment: [],
//         }]
//       }],
//     },
//     {
//       blogTextId: '58aaca8b5424db52612cbab8',
//       parentId: '',
//       vertical: 1,
//       horizontal: 1,
//       display: true,
//       authorName: 'rrr',
//       authorImgUrl: '/img/text.png',
//       date: new Date(),
//       floor: 1,
//       ding: 2,
//       comment: 'commentTextcommentTextcommentTextcommentTextcommentTextcommentTextcommentText',
//       userAgent: 'aaaaaaaa',
//       replyComment: [],
//     }],
//   }).save();
//   new Comment({
//     blogTextId: '58aaca8b5424db52612cbab8',
//     parentId: null,
//     vertical: 0,
//     horizontal: 0,
//     display: true,
//     authorName: 'aaa',
//     authorImgUrl: '/img/text.png',
//     date: new Date(),
//     floor: 1,
//     ding: 2,
//     comment: 'commentTextcommentTextcommentTextcommentTextcommentTextcommentTextcommentText',
//     userAgent: 'aaaaaaaa',
//     replyComment: [],
//   }).save();
// });


BlogText.find(function(err, blogText) {
  if (blogText.length) return;
  new BlogText({
    title: '标题111标题111标题111',
    commentCount: 10,
    commentAdCount: 1,
    author: 'admin',
    date: new Date(),
    tags: ['web前端', 'javascript'],
    display: true,
    view: 10,
    ding: 2,
    blogText: '内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111',
  }).save();
  new BlogText({
    title: '标题222标题222标题222',
    commentCount: 3,
    commentAdCount: 0,
    author: 'admin',
    date: new Date(),
    tags: ['web前端', 'javascript'],
    display: true,
    view: 10,
    ding: 2,
    blogText: '内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111',
  }).save();
    new BlogText({
    title: '3333333333333333333333333',
    commentCount: 10,
    commentAdCount: 1,
    author: 'admin',
    date: new Date(),
    tags: ['web前端', 'javascript'],
    display: true,
    view: 10,
    ding: 2,
    blogText: '内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111',
  }).save();
  new BlogText({
    title: '44444444444444444444444444',
    commentCount: 3,
    commentAdCount: 0,
    author: 'admin',
    date: new Date(),
    tags: ['web前端', 'javascript'],
    display: true,
    view: 10,
    ding: 2,
    blogText: '内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111',
  }).save();
  new BlogText({
    title: '55555555555555555555555',
    commentCount: 10,
    commentAdCount: 1,
    author: 'admin',
    date: new Date(),
    tags: ['web前端', 'javascript'],
    display: true,
    view: 10,
    ding: 2,
    blogText: '内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111',
  }).save();
  new BlogText({
    title: '6666666666666666666666666',
    commentCount: 3,
    commentAdCount: 0,
    author: 'admin',
    date: new Date(),
    tags: ['web前端', 'javascript'],
    display: true,
    view: 10,
    ding: 2,
    blogText: '内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111',
  }).save();
    new BlogText({
    title: '777777777777777777777777777',
    commentCount: 10,
    commentAdCount: 1,
    author: 'admin',
    date: new Date(),
    tags: ['web前端', 'javascript'],
    display: true,
    view: 10,
    ding: 2,
    blogText: '内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111',
  }).save();
  new BlogText({
    title: '888888888888888888888888888',
    commentCount: 3,
    commentAdCount: 0,
    author: 'admin',
    date: new Date(),
    tags: ['web前端', 'javascript'],
    display: true,
    view: 10,
    ding: 2,
    blogText: '内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111',
  }).save();
  new BlogText({
    title: '9999999999999999999999999999',
    commentCount: 10,
    commentAdCount: 1,
    author: 'admin',
    date: new Date(),
    tags: ['web前端', 'javascript'],
    display: true,
    view: 10,
    ding: 2,
    blogText: '内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111',
  }).save();
  new BlogText({
    title: '10101010101010101010101010101010',
    commentCount: 3,
    commentAdCount: 0,
    author: 'admin',
    date: new Date(),
    tags: ['web前端', 'javascript'],
    display: true,
    view: 10,
    ding: 2,
    blogText: '内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111',
  }).save();
    new BlogText({
    title: '11，11，11，11，11，11，11，11，',
    commentCount: 10,
    commentAdCount: 1,
    author: 'admin',
    date: new Date(),
    tags: ['web前端', 'javascript'],
    display: true,
    view: 10,
    ding: 2,
    blogText: '内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111',
  }).save();
  new BlogText({
    title: '12，12，12，12，12，12，12，12，12，',
    commentCount: 3,
    commentAdCount: 0,
    author: 'admin',
    date: new Date(),
    tags: ['web前端', 'javascript'],
    display: true,
    view: 10,
    ding: 2,
    blogText: '内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容222内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111内容111',
  }).save();
});