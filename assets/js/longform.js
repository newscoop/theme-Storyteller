$(document).ready(function(){
  var winHeight = $(window).height();
  var winWidth = $(window).width();
  $('#titles, .thumb-gallery > div figure, .video-attachment').height(winHeight);
  $('.video-attachment video').width(winWidth);
  $('#titles h2, #titles .date').css({
    'line-height': (winHeight - 140) + 'px'
  });

  // set up the main image for the background
  var leadImg = $('#leadImg');
  leadImg.remove();
  leadImg = leadImg.find('img');
  var leadImgSrc = leadImg.attr('src');
  $('body').attr('style', 'background-image: url(' + leadImgSrc + ');');

  // change the videos in the body to native objects
  $('#cont video').each(function(){
    $(this).find('object').remove();
  });

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

  // all this has to happen after the content has loaded or the offsets are incorrect
  setTimeout(function(){
    // get some offset positions for use in scrolling
    // $('.gall-box, video').each(function(){
    //   var offSetY;
    //   offsetY = $(this).position().top;
    //   $(this).addClass('skipTo');
    // });
    // make a mini menu from the header elements in the document at root level
    var miniMenu = "<ul id='miniMenu'>"
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
    // is there a gallery? if so, add it
    if ($('.thumb-gallery')[0]){
      var gallPos = $('.thumb-gallery').position().top;
      $('.thumb-gallery').attr('id', gallPos);
      miniMenu = miniMenu + "<li class='h2'><a href='" + gallPos + "'>Gallery</a></li>";
    }
    // are there videos if so, add them
    // if ($('.video-attachment')[0]){
    //   var vidContPos = $('.video-attachment').position().top;
    //   miniMenu = miniMenu + "<li class='h2'><a href='" + vidContPos + "'>Videos</a></li>";
    //   $('.video-attachment video').each(function(){
    //     var vidPos = ($(this).attr('id', $(this).position().top));
    //     miniMenu = miniMenu + "<li class='h2'><a href='" + vidPos + "'>" + $(this).attr('src') + "</a></li>";
    //   });
    // }
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

  // make magic happen on position of viewport
  setInterval(function(){
    var currViewportPos = window.pageYOffset;
    // not working yet
    // $('.skipTo').each(function(){
    //   if ($(this).position().top < currViewportPos) {
    //     scrollTop: $(this).position().top
    //   }
    // });
    $('.video-attachment video').each(function(){
      // you want this play when the parent container comes into view, not the video as that's been offset
      var vidPos = $(this).parent().position().top;
      var vidName = $(this).attr('id');
      if (currViewportPos > (vidPos - 10)) {
        $(this)[0].play();
      } else {
        $(this)[0].pause();
      }
      if (currViewportPos > (vidPos + winHeight)){
        $(this)[0].pause();
      }
    });
  }, 500);

  // keep full screen videos at 0 0 of viewport
  // has to be outside the previous loop as the tick is much quicker
  setInterval(function(){
    var currViewportPos = window.pageYOffset;
    var vidPos = $('.video-attachment').position().top;
    var vidOffsetY = currViewportPos - vidPos;
    $('.video-attachment video').css({
      '-webkit-transform': 'translate(0, ' + vidOffsetY + 'px)',
         '-moz-transform': 'translate(0, ' + vidOffsetY + 'px)',
          '-ms-transform': 'translate(0, ' + vidOffsetY + 'px)',
           '-o-transform': 'translate(0, ' + vidOffsetY + 'px)',
              'transform': 'translate(0, ' + vidOffsetY + 'px)'
    });
    // if the video isn't about to be played, hide it
    $('.video-attachment video').each(function(){
      var vidPos = $(this).parent().position().top;
      if ((currViewportPos - (winHeight)) > vidPos){
        $(this).show();
      } else {
        $(this).hide();
      }
      if ((currViewportPos + (winHeight)) > vidPos){
        $(this).show();
      }
    });

    $('#cont video').each(function(){
      var vidPos = $(this).position().top;
      var vidHeight = $(this).height();
      if (vidPos < currViewportPos || (vidPos > (currViewportPos + winHeight))){
        $(this)[0].pause();
        $(this).attr('muted', true);
      } else {
        $(this)[0].play();
        $(this).attr('muted', false);
      }
    });

    // hide miniMenu if it's on top of a gallery element
    var gallPos = $('.thumb-gallery').position().top;
    var gallHeight = $('.thumb-gallery').height();
    if (((currViewportPos + 10) > gallPos) || (currViewportPos < (gallPos + gallHeight))){
      $('#miniMenu').fadeOut();
    } else {
      $('#miniMenu').fadeIn();
    }
    console.log(currViewportPos + " " + parseInt(gallPos + gallHeight));

  }, 1);


});