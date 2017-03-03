var markdown = require("markdown-it")({langPrefix:'prettyprint linenums lang-'});
var BlogText = require('../models/blogText.js');
var getDate = require('../lib/getDate.js');
var Views = require('../models/views.js');

module.exports = function(page,fn) {
  BlogText.find({display: true}).sort({_id: -1}).skip((page-1)*6).limit(6).exec(function (err, blogs) {
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
        blogDesc: blog.blogDesc.substring(0, 250)+'……',
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



/*
var Comment = require('../models/comment.js');
Comment.find(function(err, comment) {
  if (comment.length) return;

  new Comment({
    blogTextId: '58b16821104edf191cc34aa3',
    parentId: null,
    vertical: 1,
    display: true,
    authorType: 'visitor',
    authorName: 'aaa',
    authorImgUrl: '/img/text.png',
    authorIp: '192.168.1.1',
    date: new Date(),
    floor: 1,
    ding: 2,
    comment: 'commentTextcommentTextcommentTextcommentTextcommentTextcommentTextcommentText',
    userAgent: 'aaaaaaaa',
    replyComment: [{
      blogTextId: '58b16821104edf191cc34aa3',
      parentId: '',
      vertical: 2,
      horizontal: 1,
      display: true,
      authorType: 'visitor',
      authorName: 'ccc',
      authorImgUrl: '/img/text.png',
      authorIp: '192.168.1.1',
      date: new Date(),
      ding: 2,
      comment: 'commentTextcommentTextcommentTextcommentTextcommentTextcommentTextcommentText',
      userAgent: 'aaaaaaaa',
      replyComment: [{
        blogTextId: '58b16821104edf191cc34aa3',
        parentId: '',
        vertical: 3,
        horizontal: 1,
        display: true,
        authorType: 'visitor',
        authorName: 'ddd',
        authorImgUrl: '/img/text.png',
        authorIp: '192.168.1.1',
        date: new Date(),
        ding: 2,
        comment: 'commentTextcommentTextcommentTextcommentTextcommentTextcommentTextcommentText',
        userAgent: 'aaaaaaaa',
        replyComment: [{
          blogTextId: '58b16821104edf191cc34aa3',
          parentId: '',
          vertical: 4,
          horizontal: 1,
          display: true,
          authorType: 'visitor',
          authorName: 'eee',
          authorImgUrl: '/img/text.png',
          authorIp: '192.168.1.1',
          date: new Date(),
          ding: 2,
          comment: 'commentTextcommentTextcommentTextcommentTextcommentTextcommentTextcommentText',
          userAgent: 'aaaaaaaa',
          replyComment: [],
        }]
      }],
    },
    {
      blogTextId: '58b16821104edf191cc34aa3',
      parentId: '',
      vertical: 2,
      horizontal: 2,
      display: true,
      authorType: 'visitor',
      authorName: 'fff',
      authorImgUrl: '/img/text.png',
      authorIp: '192.168.1.1',
      date: new Date(),
      ding: 2,
      comment: 'commentTextcommentTextcommentTextcommentTextcommentTextcommentTextcommentText',
      userAgent: 'aaaaaaaa',
      replyComment: [],
    }],
  }).save();
  new Comment({
    blogTextId: '58b16821104edf191cc34aa3',
    parentId: null,
    vertical: 1,
    display: true,
    authorType: 'visitor',
    authorName: 'bbbbbb',
    authorImgUrl: '/img/text.png',
    authorIp: '192.168.1.1',
    date: new Date(),
    floor: 2,
    ding: 2,
    comment: 'commentTextcommentTextcommentTextcommentTextcommentTextcommentTextcommentText',
    userAgent: 'aaaaaaaa',
    replyComment: [],
  }).save();
});


BlogText.find(function(err, blogText) {
  if (blogText.length) return;
  new BlogText({
    title: '西游记-第1集 齐天大圣（一）',
    commentCount: 0,
    commentReply: 0,
    commentAdCount: 0,
    author: 'admin',
    date: new Date(),
    tags: ['玄幻', '电视剧'],
    display: true,
    view: 0,
    ding: 2,
    blogText: '第1集 齐天大圣（一）话说在一千五百年前，在三十三重天天外天的地方，有一座灵山。如来佛祖就住在灵山上的大雷音寺，每一年佛祖都会举行一次唱经大会。有一年，如来座下大弟子金蝉子在唱经大会睡着，因而被贬下凡历三三之劫，九九之难，重读我经，遇千艰万难，方能重归本位。西游记故事由此展开；二郎神和李靖、哪吒带领十万天兵天将前往花果山抓拿妖猴。二郎神和悟空斗法好几个回合也不能伤悟空分毫，但是托塔李天王趁悟空和二郎神斗法之时将花果山的猴子猴孙皆收到了玲珑宝塔之中。孙悟空只好跟随他们上天宫受罚；太上老君把孙悟空关进了八卦丹炉想要将他和其他仙丹一起炼，没想到弄巧成拙让孙悟空吃了太上老君炼了三百年的太白金丹还让他炼成了火眼金睛。悟空开始大闹天宫；悟空前去找寻玉帝遇到如来，没想到被如来佛祖挥掌一拍，压在了五指山下。悟空在五指山下回想起自己小时候的事...在东胜神州有一块仙石，吸收日月精华天地灵气变成仙胎。终于，在一个日月交辉的日子里，悟空出世了。巨猴四处破坏，天蓬元帅下凡斩妖猴。天蓬元帅斩下悟空的尾巴，悟空变回一只小猴，天蓬元帅正欲杀之，观音大士前来告知巨猴已被消除戾气，不会再为祸人间，而且天蓬元帅和悟空还有一段宿世缘分。天蓬元帅被封为天河元帅，掌管十万天兵。悟空变成小猴后四处跑四处跳，带领一众猴子来到水帘洞内并成为大王。悟空目睹一只老猴子的死去想要找到神仙学习长生不老之术；天蓬元帅获封天河元帅，一众仙人前来元帅府祝贺，突然有一女子仓皇逃到元帅府，后有弓箭追赶，吴刚救下此女。王母娘娘驾到询问事情缘由，原来此女叫嫦娥，是洛阳人士。天生神力的后羿射下天上九个太阳被拥立为皇帝，后羿荒淫无道，硬抢嫦娥作为妃嫔。嫦娥为了逃离后羿的魔爪只好偷吃下两颗仙丹升天。王母赦免嫦娥，并使其位列仙班；回到花果山这边，悟空想到用椰壳作舟来到对岸。悟空把变法戏的街头卖艺者当成是神仙想要学习仙术，卖艺者发现悟空能学人们说话把悟空带到集市上表演。众人都想得到悟空，悟空被人们追赶。观音显灵，令一只驴驮着悟空飞天离去。',
  }).save(function (err, data) {
    new Views({
      vid: data._id,
      ips:[]
    }).save();
  });
  new BlogText({
    title: '西游记-第2集',
    commentCount: 0,
    commentReply: 0,
    commentAdCount: 0,
    author: 'admin',
    date: new Date(),
    tags: ['电视剧', '玄幻'],
    display: true,
    view: 0,
    ding: 2,
    blogText: '第2集小六耳常常梦见自己变成大猩猩踩死唐僧，在忧虑之下决定放弃学法术，以免梦境成真。 高昌国里，唐僧师徒与三兽精决斗，悟空以法术赢了众兽精。并将其赶离高昌国。 须菩提奉玉帝之命离开三星洞接任经河龙王，小六耳则决定跟随小鹏女投奔大鹏精。第3集小六耳遭到兽精的暗算，吃下大量宝丹，变成高如山齐的巨猴，还失去常性跑向长安城。长安成内，太宗下令活捉巨猴，并建筑观兽台，准备中秋赏月观兽。 唐僧为救苍生，派三位弟子兵分三路回长安报信，却遭杨戬率天兵截击。 八戒最先赶到长安城，与三兽精齐被太宗封为灭魔大将军。第4集由于强敌当前，八戒装醉不愿出兵。三兽精密谋将巨猴引入湖中浸死。但巨猴遇水变龙，凶狠无比，八戒急急退兵咸阳城。 太宗命程、尉两名将军领兵与八戒会合，务求要在中秋前夕捉到巨猴与各国使节赏月观兽。第5集三兽精密谋怂恿八戒做先锋，而大鹏精变成公主模样，诱得八戒飘飘然，决心活捉巨龙，向公主表功，结果被巨龙喷火烧昏，变成了一头小猪。 巨龙被三精借雷击中尾巴死穴，变为猩猩。',
  }).save(function (err, data) {
    new Views({
      vid: data._id,
      ips:[]
    }).save();
  });

});*/