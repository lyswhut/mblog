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
    /**
     * 导航栏
     * 鼠标划过就展开子菜单，免得需要点击才能展开
     */
    (function() {
        var $dropdownLi = $('li.dropdown');
        $dropdownLi.mouseover(function() {
            $(this).addClass('open');
        }).mouseout(function() {
            $(this).removeClass('open');
        });
    })();

  } else {//========================================大于768px========================================
    $('.main_leftCt').css('height',windowY-52);
    $('.left_Menu>li').on('click', function (e) {
      if (e.target != this.firstChild) return;
      var _this = $(this).children('ul');
      if (_this.height()) {
        _this.animate({
          height: 0
        },'fast');
      } else {
        var h = _this.height('auto').height();
        _this.height(0).animate({
          height: h
        },'fast');
      }
    });
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

