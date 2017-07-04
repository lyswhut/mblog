const main = require('./../../handlers/main/home')

module.exports = app => {
  app.get('/', main.get_home)
  app.get('/getInfo', main.get_getInfo)
}