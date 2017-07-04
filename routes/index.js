// var main_main = require('./handlers/main_main.js');
// var admin_main = require('./handlers/admin_main.js');
// var api_main = require('./handlers/api_main.js');


module.exports = function (mainApp, adminApp, apiApp) {
  //main routes
  require('./main/home')(mainApp)
  require('./main/essay')(mainApp)




  require('./admin/home')(adminApp)






  // require('./api/api.js')(apiApp)


};










































