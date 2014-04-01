var winHeight = $(window).height();
var winWidth = $(window).width();

$(document).ready(function(){
  // scope is private but can use global
  console.log(winHeight - 60);

  $('section').each(function(){
    if ($(this).attr('class')){
      $(this).css({
        'min-height': (winHeight - 60) + 'px'
      });
    }
  });

});
