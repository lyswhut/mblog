$(function () {
  var $window = $(window), windowX = $window.width(),windowY = $window.height();
  $window.resize(function () {
    windowX = $window.width();
    windowY = $window.height();
  });


  if (windowX < 768) {//=============================================768px============================================
    blogListSubstr($('.listContent .blogText'),95);




  } else if (windowX < 992) {//========================================992px========================================
    blogListSubstr($('.listContent .blogText'),210);




  } else if (windowX < 1200) {//========================================1200px========================================
    blogListSubstr($('.listContent .blogText'),180);





  } else {//==================================================================================================================
    blogListSubstr($('.listContent .blogText'),250);



  }


  function blogListSubstr(elments,length) {
    elments.each( function(element) {
      if ($(this).text().length > length) $(this).text($(this).text().substring(0, length) + '……');
    });
  }













  //评论回复
  if ($('.blogcommentCt').length) {
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
  }







});

