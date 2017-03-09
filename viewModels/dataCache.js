module.exports = function () {
  var config = require('../config.js');
  var BlogInfo = require('../models/blogInfo.js');
  var BlogText = require('../models/blogText.js');



  BlogInfo.find(function (err, infos) {
    if (err) return console.log('获取标签列表失败：'+ err);
    var info = infos[0] ? infos[0] : {blogNavs:[],blogTags:[]};
    global.BlogInfo = {
      blogNavs: info.blogNavs,//缓存导航
      blogTags: info.blogTags//缓存标签列表
    };
  });


  // 缓存博文总数
  BlogText.aggregate().match({display:true}).group({_id:null,count:{$sum:1}}).exec(function (err, blogs) {
    if (err) return console.log('获取博文总数失败：'+ err);
    global.BlogInfo.blogAllCount = blogs.length ? Math.ceil(blogs[0].count/6) : 0;
  });


  //缓存归档文章日期
  BlogText.aggregate([
    {$match: {display:true}},
    {$project: {time: {$substr: ['$date',0,7]}}},
    {$group: {_id:'$time', count: {$sum:1}}},
    {$sort:{_id: 1}}
    ]).exec(function (err, times) {
      if (err) return console.log('获取归档日期失败：'+ err);
      global.BlogInfo.blogHistoryTime = times.length ? times : [];
  });
  // BlogText.aggregate([
  //   {$match: {display:true}},
  //   {$project: {title:'$title', time: {$substr: ['$date',0,10]}}},
  //   {$group: {_id:'$time', count: {$sum:1}}},
  //   {$sort:{_id: 1}}
  //   ]).exec(function (err, res) {
  //     console.log(res.map(function (day) {
  //       return {
  //         date: day._id,
  //         badge: false,
  //         title: day._id,
  //         body: day._id+'更新了' + day.count + '篇文章',
  //         footer: '点击查看',
  //       };
  //     }));
  // });



};