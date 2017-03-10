var express = require('express');
var config = require('./config.js');
var blogInfo = require('./models/blogInfo.js');
// var Q = require('q');
var fs = require('fs');


var app = express();

// 数据库连接
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var opts = {
  server: {
    socketOptions: {
      keepAlive: 1
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 1
    }
  }
};
switch (app.get('env')) {
  case 'development':
    mongoose.connect(config.credentials.mongo.development.connectionString, opts);
    break;
  case 'production':
    mongoose.connect(config.credentials.mongo.production.connectionString, opts);
    break;
  default:
    throw new Error('Unknown execution environment:' + app.get('env'));
}

//数据缓存
require('./viewModels/dataCache.js')();


/*通用设置*/
// var pug = require('pug').create({
//   defaultLayout: 'main',
//   helpers: {
//     static: function(name) {
//       return static(name);
//     }
//   }
// });
app.engine('handlebars', require('pug').render);
app.set('views', './views');
app.set('view engine', 'pug');

//app.use(require('body-parser')());

if (!config.x_powered_by) app.disable('x-powered-by');

app.set('port', process.env.PORT || config.port);

app.use(express.static(__dirname + '/public'));




//var static = require('./lib/static.js');
app.use(function(req, res, next) {
  if (!res.locals.showTests) res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
  if (!res.locals.serverDomain) res.locals.serverDomain = config.serverDomain;
  if (!res.locals.staticUrl) res.locals.staticUrl = config.staticUrl;//静态资源地址设置
  if (!res.locals.blogName) res.locals.blogName = config.blogName;


  if (!res.locals.blogNavs) res.locals.blogNavs = global.BlogInfo.blogNavs;
  if (!res.locals.blogCountPg) res.locals.blogCountPg = global.BlogInfo.blogAllCount;
  if (!res.locals.blogTags) res.locals.blogTags = global.BlogInfo.blogTags;
  if (!res.locals.blogTimes) res.locals.blogTimes = global.BlogInfo.blogHistoryTime;


  res.locals.time = new Date();
  next();
});


// app.use(function(req, res, next) {
//   var now = new Date();
//   res.locals.logoImage = now.getMonth() == 11 && now.getData() == 19 ?
//     static('/img/logo_bud_clark.png') :
//     static('/img/logo.png');
//   next();
// });

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

/*main app*/
var mainApp = express();
mainApp.set('view engine', 'pug');
mainApp.disable('x-powered-by');

// html压缩控制
if (!config.minHtml) mainApp.locals.pretty = true;

//设置cookie与session
mainApp.use(cookieParser(config.credentials.cookieSecret));
mainApp.use(session({
  store: new RedisStore({
    host: config.redisHost,
    prot: config.redisProt,
    db: config.redisUserSessionDB
  }),
  secret: config.credentials.cookieSecret,
  resave: false,
  saveUninitialized:true
}));

//防止跨站伪造请求
mainApp.use(bodyParser.urlencoded({
  extended: false
}));
mainApp.use(require('csurf')());



/*admin app*/
var adminApp = express();
adminApp.set('view engine', 'pug');
adminApp.disable('x-powered-by');

// html压缩控制
if (!config.minHtml) adminApp.locals.pretty = true;

//设置cookie与session
adminApp.use(cookieParser(config.credentials.cookieSecret));
adminApp.use(session({
  store: new RedisStore({
    host: config.redisHost,
    prot: config.redisProt,
    db: config.redisAdminSessionDB
  }),
  secret: config.credentials.cookieSecret,
  resave: false,
  saveUninitialized:true
}));

//防止跨站伪造请求
adminApp.use(bodyParser.urlencoded({
  extended: false
}));
adminApp.use(require('csurf')());



/*API app*/
var apiApp = express();
apiApp.set('view engine', 'pug');
apiApp.disable('x-powered-by');



/*虚拟主机*/
var vhost = require('vhost');

if (app.get('env') == 'production') {
  setVhost(config.serverDomain);
} else {
  setVhost('abc.com');
}

function setVhost (domain) {
  app.use(vhost('www.'+domain, mainApp));
  app.use(vhost(domain, mainApp));
  app.use(vhost('*.*.*.*', mainApp));
  app.use(vhost('*', mainApp));

  app.use(vhost('admin.'+domain, adminApp));

  //跨域资源共享
  app.use(vhost('api.'+domain, require('cors')()));

  app.use(vhost('api.'+domain, apiApp));
}



//载入路由模块
require('./routes.js')(mainApp, adminApp, apiApp);


// var auth = require('./lib/auth.js')(app, {
//     providers: credentials.authProviders,
//     sussessRedirect: '/account',
//     failureRedirect: '/unauthorized',
// });
// auth.init();
// auth.registerRoutes();



var autoViews = {};
mainApp.use(function(req, res, next) {
  var path = req.path.toLowerCase().replace(/\/$/, '');
  //console.log(path.replace(/\/$/, ''));
  //检查缓存，如果它在那里就渲染这个视图
  if (autoViews[path]) return res.render(autoViews[path]);
  //如果它不在缓存里，那就看看有没有.pug文件能匹配
  if (fs.existsSync(__dirname + '/views' + path + '.pug')) {
    autoViews[path] = path.replace(/^\//, '');
    return res.render(autoViews[path]);
  }
  //没发现视图，转到404处理器
  next();
});

//定制404页面
app.use(function(req, res, next) {
  res.status(404);
  res.render('404', {title: '404 - Not Found'});
});

//定制500页面
app.use(function(err, req, res, next) {
  //无效令牌错误
  if (err.code == 'EBADCSRFTOKEN') {
    res.status(403);
    res.send('form tampered with');
    return;
  }
  console.log(err.stack);
  res.status(500);
  res.render('500', {title: '500 - Server Error'});
});


app.listen(app.get('port'), function() {
  console.log('Express started in ' + app.get('env') + ' mode on http://'+ config.serverDomain +':' + app.get('port') + '; press Ctrl-C to terminate.');
});