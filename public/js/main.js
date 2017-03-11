$(function () {
  var $window = $(window), windowX = $window.width(),windowY = $window.height(),bodyY = $('body').height();
  $('[data-toggle="tooltip"]').tooltip();
  $window.resize(function () {
    windowX = $window.width();
    windowY = $window.height();
  });



  if (windowX < 768) {//=============================================小于768px============================================
    blogListSubstr($('.listContent .blogText'),95);


  } else {//========================================大于768px========================================


  }
  if (windowX < 992) {//========================================小于992px========================================
    if (windowY > bodyY) $('body>.footer').css('marginTop',windowY-bodyY);


  } else {//========================================大于992px========================================
    if (windowY > bodyY) $('body>.footer').css('marginTop',windowY+20-bodyY);


  }
  if (windowX >= 768 && windowX < 992) {//========================================大于768px且小于992px========================================
    blogListSubstr($('.listContent .blogText'),210);


  }
  if (windowX >= 992 && windowX < 1200) {//========================================大于992px且小于1200px========================================
    blogListSubstr($('.listContent .blogText'),180);


  }

  if (windowX < 1200) {//========================================小于1200px========================================


  } else {//========================================大于1200px========================================
    blogListSubstr($('.listContent .blogText'),250);


  }




  function blogListSubstr(elments,length) {
    elments.each( function(element) {
      if ($(this).text().length > length) $(this).text($(this).text().substring(0, length) + '……');
    });
  }



  // 当评论容器存在时
  if ($('.blogcommentCt').length) {
    //评论回复
    $('.blogcommentCt').on('click', '.reply', function (e) {
      if ($(this).closest('.comment').children('.addCommentCt').length !== 0) return;
      var _this = $(this);
      comment = _this.closest('.comment');
      comment.addClass('background_color1').append($('.blogcommentCt>.addCommentCt').clone());
      addCommentCt = comment.children('.addCommentCt');

      addCommentCt.addClass('background_color2').prepend('<span class="replyClose">︽</span>').animate({height:'335px'}).children('h3').text('回复评论');
      addCommentCt.children('form').prepend('<input type="hidden" name="commentId" value="'+ _this.attr('data-commentId') +'">')
      .prepend('<input type="hidden" name="floor" value="'+ _this.attr('data-floor') +'">')
      .prepend('<input type="hidden" name="horizontal" value="'+ _this.attr('data-horizontal') +'">');
      addCommentCt.children('.replyClose').on('click', function () {
        $(this).off('click');
        $(this).closest('.comment').removeClass('background_color1');
        $(this).closest('.addCommentCt').animate({height: '0'}, 'slow', function () {
          $(this).remove();
        });
      });
    return false;
    });

    //顶评论
    $('.blogcommentCt').on('click', '.ding', function (e) {
      var $_this = $(this);
      if (($_this).css('cursor') == 'default') return;
      $_this.css('cursor','default');
      var $dingNum = $_this.children('.dingNum'),$reply = $_this.siblings('.reply'),$form = $('.addCommentCt form');
      var url = $form.attr('action'),method = $form.attr('method'),
          commentId = $reply.attr('data-commentId'),horizontal = $reply.attr('data-horizontal'),
          blogTextId = $form.children('input[name="blogTextId"]').val(),_csrf = $form.children('input[name="_csrf"]').val();
      $.ajax({
        url: url,
        method: method,
        data: {
          _csrf: _csrf,
          blogTextId: blogTextId,
          commentId: commentId,
          horizontal: horizontal,
        }
      }).done(function (data) {
        if (data) {
          var ding = parseInt($dingNum.text());
          $dingNum.text(++ding);
        }
      });
    });

  }






});

