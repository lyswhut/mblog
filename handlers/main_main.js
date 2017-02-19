
exports.get_home = function(req, res) {
  res.render('home', {
    title: '首页' + ' -- ' + res.locals.blogName
  });
};


exports.get_t = function(req, res) {
  res.render('blogDetails', {
    title: '标题11111111' + ' -- ' + res.locals.blogName
  });
};