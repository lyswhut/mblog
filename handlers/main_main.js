var BlogText = require('../models/blogText.js');
var essay = require('../viewModels/essay.js');
var home = require('../viewModels/home.js');


exports.get_home = function(req, res) {
  console.log(req.query.page);
  home(function (err, data) {
    if (err) res.send(500, 'Error occurred: database error.');
    if (!data) return next('route');
    //console.log(data);
    res.render('home', {
      title: '首页' + ' -- ' + res.locals.blogName,
      blogs: data[0],
      countPg: res.locals.blogCount/6,
      pg: 1,
    });
  });

};

exports.get_essay = function(req, res, next) {
  essay(req.params.id)(function (err, data) {
    if (err) res.send(500, 'Error occurred: database error.');
    if (!data) return next('route');
    res.render('blogEssay', {
      title: data[0].title + ' -- ' + res.locals.blogName,
      blogs: data[0],
      comment: data[1],
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






