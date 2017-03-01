var BlogText = require('../../models/blogText.js');

exports.addBlog = function (obj) {
  return function (fn) {
    new BlogText({
      title: obj.title,
      commentCount: 0,
      commentReply: 0,
      commentAdCount: 0,
      author: obj.author,
      date: new Date(),
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
      new Views({
        vid: data._id,
        ips:[]
      }).save();
    });
  };
};