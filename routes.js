var main_main = require('./handlers/main_main.js');
var admin_main = require('./handlers/admin_main.js');


module.exports = function (mainApp, adminApp, apiApp) {
  //main routes
  mainApp.get('/', main_main.get_home);
  mainApp.get('/getInfo', main_main.get_getInfo);
  mainApp.get('/essay/:id', main_main.get_essay);
  mainApp.post('/essay', main_main.post_essay);


  adminApp.get('/', admin_main.get_home);
  adminApp.get('/addBlog', admin_main.get_addBlog);
  adminApp.post('/addBlog', admin_main.post_addBlog);

};










































