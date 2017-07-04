const main = require('./../../handlers/admin_main')

module.exports = app => {
  app.get('/', main.get_home);
  app.get('/login', main.get_login);
  app.post('/login', main.post_login);
  app.get('/logout', main.get_logout);
  app.get('/addBlog', main.get_addBlog);
  app.post('/addBlog', main.post_addBlog);
}