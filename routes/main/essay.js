const main = require('./../../handlers/main/essay')

module.exports = app => {
  app.get('/essay/:id', main.get_essay);
  app.post('/essay', main.post_essay);
}