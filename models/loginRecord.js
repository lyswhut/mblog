var mongoose = require('mongoose');

var loginRecordSchema = mongoose.Schema({
  loginIp: String,
  failed: [],
  history: []
});

var LoginRecord = mongoose.model('LoginRecord', loginRecordSchema);

module.exports = LoginRecord;