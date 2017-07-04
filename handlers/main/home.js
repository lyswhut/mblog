const home = require('../../viewModels/home.js')
const parts = require('../../viewModels/parts.js')
const log = require('log4js').getLogger("home")

exports.get_home = (req, res, next) => {
  var query = {
    display: true
  };
  var page = req.query.page && parseInt(req.query.page) || 1;
  if (req.query.tag) query.tags = req.query.tag.trim();
  if (req.query.time) {
    var time, gt, lt;
    time = req.query.time.trim();
    if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(time)) {
      gt = new Date(time + ' 0:0:0');
      lt = new Date(time + ' 0:0:0');
      lt.setDate(lt.getDate() + 1);
      query.$and = [{
        date: {
          '$gt': gt
        }
      }, {
        date: {
          '$lt': lt
        }
      }];
    } else if (/^\d{4}-\d{1,2}$/.test(time)) {
      gt = new Date(time + '-1 0:0:0');
      lt = new Date(time + '-1 0:0:0');
      lt.setMonth(lt.getMonth() + 1);
      query.$and = [{
        date: {
          '$gt': gt
        }
      }, {
        date: {
          '$lt': lt
        }
      }];
    }
  }
  if (page > res.locals.blogCountPg) return next('route');
  var startPg = page - 2,
    endPg = page + 2;
  home(page, query, function (err, data) {
    if (err) {
      log.error(err)
      return res.send(500, 'Error occurred: database error.')
    };
    if (!data) return next('route');
    var urlQuery = '';
    if (query.tags) urlQuery = '&tag=' + query.tags;
    if (time) urlQuery += '&time=' + time;
    blogCountPg = !urlQuery ? (res.locals.blogCountPg || 1) : data[1];
    res.render('home', {
      _csrfToken: req.csrfToken(),
      navCode: 1,
      title: '首页',
      blogs: data[0],
      countPg: blogCountPg,
      startPg: blogCountPg <= 5 ? 1 : (blogCountPg - page <= 5 ? blogCountPg - 5 : startPg),
      endPg: blogCountPg <= 5 ? blogCountPg : (endPg >= blogCountPg ? blogCountPg : endPg),
      pg: page,
      urlQuery: urlQuery,
    });
  });
};


exports.get_getInfo = (req, res, next) => {
  var year = req.query.year,
    month = req.query.month;
  if (year && year.trim()) return parts.getCalendarData(year, month)((err, data) => {
    res.json(data)
  });

  return next('route');
};