module.exports = function (d,b) {
  var _date = d === undefined ? new Date() : new Date(d);
  var year = _date.getFullYear(),month = fm(_date.getMonth() + 1), day = fm(_date.getDate());
  if (!b) return year+'-'+month+'-'+day;
  return year+'-'+month+'-'+day+' '+fm(_date.getHours())+':'+fm(_date.getMinutes())+':'+fm(_date.getSeconds());
};

function fm(value) {
  if (value<10) return '0' + value;
  return value;
}







