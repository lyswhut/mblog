var LoginRecord = require('../../models/loginRecord.js');

exports.verification = function (ip) {
  return function (fn) {
    LoginRecord.find({loginIp: ip},{failed:1},function (err, result) {
      if (err) return fn(err, null);
      if (result.length) {
        var length = result[0].failed.length;
        if (length >= 5) return fn(null, {result:false});
        fn(null, {result:true, num: 5 - length});
      } else {
        new LoginRecord({
          loginIp: ip,
          failed: [],
          history: []
        }).save(function (err, result) {
          if (err) return fn(err, null);
          fn(null, {result:true, num: 5});
        });
      }
    });
  };
};

exports.addloginLog = function (obj) {
  if (obj.result) {
    LoginRecord.update({loginIp:obj.ip},{
      failed: [],
      $push: { history: { userName: obj.userName, password: obj.password, userAgent: obj.userAgent, loginTime: new Date(), result: obj.result}}
    },function (err, result) {
      if (err) return console.log('添加登录记录失败：'+err);
    });
  } else {
    LoginRecord.update({loginIp:obj.ip},{
      $push: {
        failed: 1,
        history: { userName: obj.userName, password: obj.password, userAgent: obj.userAgent, loginTime: new Date(), result: obj.result}
      }
    },function (err, result) {
      if (err) return console.log('添加登录记录失败：'+err);
    });
  }
};