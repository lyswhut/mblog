$(function () {
  var $window = $(window), windowX = $window.width(),windowY = $window.height(),bodyY = $('body').height();
  $('[data-toggle="tooltip"]').tooltip();
  $window.resize(function () {
    windowX = $window.width();
    windowY = $window.height();
  });



  var $login = $('.login');
  $login.css('top',(windowY-52-45 - $login.height())/2);

  if (windowX < 768) {//=============================================小于768px============================================


  } else {//========================================大于768px========================================

  }
  if (windowX < 992) {//========================================小于992px========================================
    if (windowY > bodyY) $('body>.footer').css('marginTop',windowY-bodyY);


  } else {//========================================大于992px========================================
    if (windowY > bodyY) $('body>.footer').css('marginTop',windowY+20-bodyY);


  }
  if (windowX >= 768 && windowX < 992) {//========================================大于768px且小于992px========================================


  }
  if (windowX >= 992 && windowX < 1200) {//========================================大于992px且小于1200px========================================


  }

  if (windowX < 1200) {//========================================小于1200px========================================


  } else {//========================================大于1200px========================================


  }



  function blogListSubstr(elments,length) {
    elments.each( function(element) {
      if ($(this).text().length > length) $(this).text($(this).text().substring(0, length) + '……');
    });
  }

















});
