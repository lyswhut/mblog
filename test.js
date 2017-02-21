var aaa = [{
  a: 1,
  b: 2,
  c: 3,
  d: [{
    a: 44,
    b: 55,
    c: 66,
    d: [{
    a: 70,
    b: 80,
    c: 90,
    d: [{
    a: 71,
    b: 81,
    c: 91,
    d: []
  }]
  }]
  },{
    a: 77,
    b: 88,
    c: 99,
    d: []
  }]
},{
  a: 11,
  b: 22,
  c: 33,
  d: []
}];

// var res = aaa.map(function(q) {
//   var d = [];
//   if (q.d) d = mp(q.d);
//   return {
//     a1: q.a,
//     a2: q.b,
//     a3: q.c,
//     a4: d
//   };
// });

function mp(dd) {
  return dd.map(function (m) {
    var d = [];
    if (m.d) d = mp(m.d);
    return {
      a1: m.a,
      a2: m.b,
      a3: m.c,
      d4: d
    };
  });
}
var res = mp(aaa);
console.log(res[0].d4[0].d4[0]);