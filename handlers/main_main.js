var BlogText = require('../models/blogText.js');
var essay = require('../viewModels/essay.js');
var home = require('../viewModels/home.js');


exports.get_home = function(req, res, next) {
  var page = req.query.page && parseInt(req.query.page) || 1;
  if (page > res.locals.blogCountPg) return next('route');
  var startPg = page-2,endPg = page+2,blogCountPg = res.locals.blogCountPg || 1;
  home(page, function (err, data) {
    if (err) res.send(500, 'Error occurred: database error.');
    if (!data) return next('route');
    //console.log(data);
    res.render('home', {
      title: '首页' + ' -- ' + res.locals.blogName,
      blogs: data[0],
      countPg: blogCountPg,
      startPg: startPg <= 1 ? 1 : startPg < (blogCountPg < 4 ? blogCountPg : blogCountPg - 4) ? startPg : (blogCountPg < 4 ? blogCountPg : blogCountPg - 4),
      endPg: endPg > blogCountPg ? blogCountPg : endPg < 5 ? (blogCountPg < 5 ? blogCountPg : 5) : endPg,
      pg: page,
    });
  });

};

exports.get_essay = function(req, res, next) {
  essay(req.params.id)(function (err, data) {
    if (err) res.send(500, 'Error occurred: database error.');
    if (!data) return next('route');
    var page = req.query.page && parseInt(req.query.page) || 1, countPg = data[0].commentCount === 0 ? 1 : Math.ceil(data[0].commentCount/5);
    if (page > countPg) return next('route');
    var startPg = page+2,endPg = page-2;
    res.render('blogEssay', {
      title: data[0].title + ' -- ' + res.locals.blogName,
      blogs: data[0],
      comment: data[1],
      countPg: countPg,
      startPg: startPg <= 1 ? 1 : startPg < (countPg < 4 ? countPg : countPg - 4) ? startPg : (countPg < 4 ? countPg : countPg - 4),
      endPg: endPg > countPg ? countPg : endPg < 5 ? (countPg < 5 ? countPg : 5) : endPg,
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



// exports.post_t = function(req, res) {
//   Comment.update(
//     {blogId: blogId},
//     {viwe: true},
//     {authorName: authorName},
//     {authorImgUrl: '/img/text.png'},
//     {floor: floor},
//     {ding: ding},
//     {comment: comment},
//     {parentId: parentId},
//     {date: new Date()},
//     function(err) {
//       if (err) {
//         console.error(err.stack);
//         req.session.flash = {
//           type: 'danger',
//           intro: 'Ooops!',
//           message: 'There was an error processing your request.',
//         };
//         return res.redirect(303, '/vacations');
//       }
//       req.session.flash = {
//         type: 'success',
//         intro: 'Thank you!',
//         message: 'You will be notified when this vacation is in season.',
//       };
//       return res.redirect(303, '/vacations');
//     }
//   );
// };


// [
//   {
//     id: Number,
//     viwe: true,
//     authorName: req.body.name,
//     authorImgUrl: '/img/text.png',
//     date: new Date(),
//     floor: Number,
//     ding: Number,
//     comment: comment,
//     replyComment: [
//       {
//         id: Number,
//         viwe: true,
//         authorName: req.body.name,
//         authorImgUrl: '/img/text.png',
//         date: new Date(),
//         floor: Number,
//         ding: Number,
//         comment: [String],
//         parentId: Number,
//       },{
//         id: Number,
//         viwe: true,
//         authorName: req.body.name,
//         authorImgUrl: '/img/text.png',
//         date: new Date(),
//         floor: Number,
//         ding: Number,
//         comment: [String],
//         parentId: Number,
//       }
//     ],
//     parentId: Number,
//   },
//   {
//   }
// ];






