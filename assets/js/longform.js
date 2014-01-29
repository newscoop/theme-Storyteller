$(document).ready(function(){
  var winHeight = $(window).height();
  var winWidth = $(window).width();
  $('#titles, .thumb-gallery > div figure').height(winHeight);
  $('video').width(winWidth);
  $('#titles h2, #titles .date').css({
    'line-height': (winHeight - 140) + 'px'
  });

  // set up the main image for the background
  var leadImg = $('#leadImg').find('img');
  var leadImgSrc = leadImg.attr('src');
  leadImg.hide();
  $('body').attr('style', 'background-image: url(' + leadImgSrc + ');');

  // set up the galleries
  var i = 1;
  $('.thumb-gallery').each(function(){
    i = $(this).parent().find('figure').length;
    $(this).find('figure').each(function(){
      var img = $(this).find('img');
      var imgSrc = img.attr('src');
      img.hide();
      $(this).attr('style', 'z-index:' + i + '; background-image: url(' + imgSrc + ');');
      i = i - 1;
      $(this).height(winHeight);
    });
    i = 1;
  });

  // video stuff
  // wishlist:
  //    autoplay on focus - check
  //    hide miniMenu - check
  //    reshow miniMenu when above or below video - check
  setInterval(function(){
    var currViewportPos = window.pageYOffset;
    $('video').each(function(){
      var vidPos = $(this).position().top;
      var vidName = $(this).attr('id');
      if ( currViewportPos > vidPos ) {
        $(this)[0].play();
        $('#miniMenu').fadeOut();
      } else {
        $(this)[0].pause();
        $('#miniMenu').fadeIn();
      }
      if ( currViewportPos > (vidPos + winHeight) ){
        $(this)[0].pause();
        $('#miniMenu').fadeIn();
      }
    });
  }, 500);

  // make a min menu from the header elements in the document at root level
  setTimeout(function(){
    var miniMenu = "<ul id='miniMenu' style='display: none;'>"
    miniMenu = miniMenu + "<li class='h2'><a href='#top'>Title</a></li>";
    $('#cont > h2, #cont h3, #cont h4').each(function(){
      var offsetY = $(this).position().top;
      var type;
      $(this).attr('id', offsetY);
      if ($(this).is("h2")) {
        type = "h2";
      }
      if ($(this).is("h3")) {
        type = "h3";
      }
      if ($(this).is("h4")) {
        type = "h4";
      }
      miniMenu = miniMenu + "<li class='" + type + "'><a href='#" + offsetY + "'>" + $(this).html() + "</a></li>"
    });
    $('#cont > h2, #cont h3, #cont h4').bind('click', function(){
      console.log($(this).text());
    });
    miniMenu = miniMenu + "</ul>"
    $('#top').append(miniMenu);
    $('#miniMenu').fadeIn(1000);
    setTimeout(function(){
      var currOffset;
      $('#miniMenu').find('a').bind('click', function(){
        currOffset = $(this).attr('href').replace('#','');
        if (currOffset == 'top') {
          currOffset = '0';
        }
        parseInt(currOffset);
        $('body').animate({
          scrollTop: currOffset
        });
        currOffset = 0;
        return false;
      });
    }, 500);
  }, 1000);

});