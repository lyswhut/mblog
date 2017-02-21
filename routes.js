var main_main = require('./handlers/main_main.js');



module.exports = function (mainApp, apiApp) {
  //main routes
  mainApp.get('/', main_main.get_home);

  mainApp.get('/essay/:id', main_main.get_essay);

};










































