var winHeight = $(window).height();
var winWidth = $(window).width();

$(document).ready(function(){
  // scope is private but can use global

  $('section').each(function(){
    if ($(this).attr('class')){
      $(this).css({
        'min-height': winHeight + 'px'
      });
    }
  });

});
