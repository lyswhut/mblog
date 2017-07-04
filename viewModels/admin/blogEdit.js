var BlogInfo = require('../../models/blogInfo.js');
var BlogText = require('../../models/blogText.js');

exports.addBlog = function (obj) {
  return function (fn) {
    new BlogText({
      title: obj.title,
      commentCount: 0,
      commentReply: 0,
      commentAdCount: 0,
      author: obj.author,
      tags: obj.tags,
      display: obj.display,
      view: 0,
      ding: 0,
      blogDesc: obj.blogDesc,
      textType : obj.textType,
      blogText: obj.blogText,
    }).save(function (err, data) {
      if (err) return fn(err, null);
      fn(null, data);
      BlogInfo.find({},{tags:1},function (err, tags) {
        outer: for (var i = 0; i < obj.tags.length; i++) {
          inter: for (var j = 0; j < tags[0].tags.length; j++) {
            if (tags[0].tags[j] === obj.tags[i]) continue outer;
          }
          tags[0].tags.push(obj.tags[i]);
        }
        tags[0].save();
      });
    });
  };
};
