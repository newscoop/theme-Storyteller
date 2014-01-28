$(document).ready(function(){
  var winHeight = $(window).height();
  $('#titles, #leadImg, .thumb-gallery > div figure').height(winHeight);
  $('#titles h2').css({
    'line-height': winHeight + 'px'
  });
  var i = 1;
  $('.thumb-gallery').each(function(){
    i = $(this).parent().find('figure').length;
    $(this).find('figure').each(function(){
      var img = $(this).find('img');
      var imgSrc = img.attr('src');
      img.css({
        "display": "none"
      });
      $(this).attr('style', 'z-index:' + i + '; background-image: url(' + imgSrc + ');');
      i = i - 1;
      $(this).height(winHeight);
    });
    i = 1;
  });
});