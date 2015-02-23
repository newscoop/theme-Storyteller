// define global window height and width
var winHeight = $(window).height();
var winWidth = $(window).width();

// set function to refill those values when needed
var doWinDimensions = function(){
  winHeight = $(window).height();
  winWidth = $(window).width();
};

$(document).ready(function(){

  var getViewport = function(){
    var currViewport = window.pageYOffset;
    return currViewport;
  };

  // Set up video elements ready for async loading
  /*
  $('video').each(function(){
    var video = $(this);
    var vidPar = video.parent();
    var src = null;
    video.find('source').each(function(){
      src = $(this).attr('src');
      // check for mp4 or webm capability
      if (Modernizr.video) {
        // chrome > 30 can handle both mp4 and webm but mp4 is used more widely
        if (Modernizr.video.h264) {
          // check to see if the last character is a '4'
          if (src.substr(-1) == '4'){
            src = src;
          }
        } else if (Modernizr.video.webm){
          // check to see if the last digit is an 'm'
          if (src.substr(-1) == 'm'){
            src = src;
          }
        }
      }
    });
    video.attr('data-video', src);
    $(this).find('source').remove();
  });
  */

  // collapse header
  var collapsed = false;

  var doMainNav = function(){
    if (collapsed === false){
      collapsed = true;
      $('header nav').addClass('active');
    } else {
      collapsed = false;
      $('header nav').removeClass('active');
    }
  };

  $('#collapse').bind('click', function(){
    $('header nav').animate({
      'opacity': 0
    }, 500, function(){
      doMainNav();
      $('header nav').animate({
        'opacity': 1
      });
    });
    return false;
  });

  // header nav
  $('header nav a').bind('click', function(){
    var src = $(this).attr('href').replace('#','');
    var target = $('[name=' + src + ']').position().top;
    $('body, html').animate({
      scrollTop: target + 'px'
    }, 1000);
    return false;
  });

  // mute button
  var muted = false;
  $('.mute').bind('click', function(){
    if (muted === true){
      $(this).removeClass('muted');
      muted = false;
      $('video, audio').each(function(){
        $(this)[0].volume = 1;
      });
    } else {
      muted = true;
      $(this).addClass('muted');
      $('video, audio').each(function(){
        $(this)[0].volume = 0;
      });
    }
    return false;
  });

  // mark nav as active
  var doActiveNav = function(){
    $('body > section > article > section').each(function(){
      var matchName = $(this).attr('name');
      var fullTop = $(this).position().top;
      var fullBot = $(this).height();
      var fullSize = fullTop + fullBot;
      if (((currViewport) >= fullTop) && (currViewport <= fullSize)){
        $('nav li a').each(function(){
          $(this).removeClass('active');
          var navId = $(this).attr('href').replace('#','');
          if (navId == matchName){
            $(this).addClass('active');
          }
        });
      }
    });
  };
  doActiveNav();

  // Check through document and see if there are ambient audio elements. If there are, create a single audio element and use it as the basis for all further sound
  if ($('audio.ambient')[0]){
    $('body').append('<audio id="audioMaster" loop src="null" />');
    var audioMaster = $('#audioMaster');
    var audioElements = [];
    var audioElementId = 0;
    $('.ambient').each(function(){
      var src = $(this).attr('src');
      var playing = false;
      var audioElement = {};
      var par = $(this).parent().get(0).tagName.toLowerCase();

      audioElement.id = audioElementId;
      audioElement.src = src;
      audioElement.playing = false;
      audioElements.push(audioElement);
      audioElementId++;

      if (par == 'figure'){
        $(this).parent().parent().attr('data-audiosrc', src);
      } else {
        $(this).parent().attr('data-audiosrc', src);
      }
      $(this).remove();
    });
  }

  var doChapTitleText = function(){
    $('section').each(function(){
      if ($(this).attr('class')){
        var paddingTop = ($(this).css('padding-top'));
        paddingTop = paddingTop.replace('px','');
        var paddingBottom = ($(this).css('padding-bottom'));
        paddingBottom = paddingBottom.replace('px','');
        var paddingVertical = parseInt(paddingTop) + parseInt(paddingBottom);
        $(this).css({
          'min-height': (winHeight - paddingVertical) + 'px',
          'width': winWidth
        });
      }
      if ($(this).hasClass('chapter-title')){
        var title = $(this).find('.title');
        title.css({
          'bottom': ((winHeight / 2) - 60) + 'px'
        });
        title.after('<span class="continue">Click here to continue</span>');
      }
    });
  };
  doChapTitleText();

  var doZindex = function(){
    i = 0;
    $('section > article > section').each(function(){
      $(this).css({
        'z-index': ++i
      });
    });
  };
  doZindex();

  $('.continue').bind('click', function(){
    if ($(this).parent().parent().next()[0]){
      var nextObjPos = $(this).parent().parent().next().position().top + "px";
      $('body, html').animate({
        scrollTop: nextObjPos
      }, 1000);
    }
  });

  $('.slideshow').each(function(){
    if ($(this).hasClass('shutter')){
      // nothing
    } else {
      if ($(this).hasClass('fade')){
        $(this).find('.slides').bxSlider({
          loop: true,
          controls: false,
          mode: 'fade',
          video: true,
        });
      } else {
        $(this).find('.slides').bxSlider({
          loop: true,
          controls: false,
          video: true,
        });
      }
    }
  });

  $('.slideshow.full, .bx-viewport').css({
    'min-height' : winHeight
  });

  // full screen shutter slides
  $('.slideshow.full.shutter').each(function(){
    $(this).find('figure, li').each(function(){
      $(this).css({
        'min-height' : winHeight
      });
    });
    var i = 0;
    $(this).find('li').each(function(){
      $(this).css({
        'z-index': ++i
      });
    });
  });

  var j = 0;
  var currViewport = getViewport();

  var doBackgrounds = function(){
    $('.chapter-title').each(function(){
      // do this if there's a video
      $(this).find('video').each(function(){
        var video = $(this);
        if ($(this).attr('poster')){
          var src = $(this).attr('poster');
          par = $(this).parent().parent();
          var bgElem = "<div class='bgContainer'></div>";
          par.append(bgElem);
          var bgDiv = par.find('.bgContainer');
          bgDiv.width(winWidth);
          bgDiv.height(winHeight);
          bgDiv.css({
            'z-index':'-1',
            'background': 'url("' + src + '") no-repeat',
            'background-position': 'center center'
          });
          if (winHeight > winWidth) {
            bgDiv.css({
              'background-size': 'auto 100%'
            });
          } else {
            bgDiv.css({
              'background-size': '100% auto'
            });
          }
        }
      });
      // do this if there's an image
      $(this).find('img').each(function(){
        var src = $(this).attr('src');
        var par = $(this).parent().parent().parent();
        var bgElem = "<div class='bgContainer'></div>";
        par.append(bgElem);
        var bgDiv = par.find('.bgContainer');
        bgDiv.width(winWidth);
        bgDiv.height(winHeight);
        bgDiv.css({
          'background': 'url("' + src + '") no-repeat',
          'background-position': 'center center',
        });
        if (winHeight > winWidth) {
          bgDiv.css({
            'background-size': 'auto 100%'
          });
        } else {
          bgDiv.css({
            'background-size': '100% auto'
          });
        }
        $(this).hide();
      });
    });
  };
  doBackgrounds();

  var doChapterTitles = function(){
    $('.chapter-title').each(function(){
      var par = null;
      var parPos = $(this).position().top;
      var parHeight = $(this).height();
      var parBot = ((parPos + parHeight) - 10);
      var bgDiv = $(this).find('.bgContainer');
      // for images just change the classes
      // for video change the classes and also pause/play the video
      $(this).find('video').each(function(){
        var video = $(this);
        if ((currViewport >= parPos) && (currViewport <= parBot)) {
          bgDiv.addClass('fixed');
          $(this).addClass('fixed');
          if (video[0].playing === true) {
              video[0].play();
              video[0].playing = true;
          } else {
            video[0].play();
            video[0].playing = true;
          }
        } else {
          bgDiv.removeClass('fixed');
          $(this).removeClass('fixed');
          if (video[0].playing === true){
              video[0].pause();
              video[0].playing = false;
          }
          video[0].playing = false;
        }
      });
      $(this).find('img').each(function(){
        if ((currViewport >= parPos) && (currViewport <= parBot)) {
          bgDiv.addClass('fixed');
        } else {
          bgDiv.removeClass('fixed');
        }
      });
    });
  };
  // run the chapter titles
  doChapterTitles();

  // handle ambient audio here - I advise you to defer this
  var doAmbientAudio = function(){
    var audioElementId = 0;
    $('section, li').each(function(){
      j++;
      if ($(this).attr('data-audiosrc')) {
        var src = location.protocol + '//' + window.location.hostname + '/' + $(this).attr('data-audiosrc');
        var fullTop = $(this).position().top;
        var fullBot = $(this).height();
        var fullSize = fullTop + fullBot;
        var fullTopAdj = (fullTop - winHeight);
        var fullBotAdj = (fullBot + winHeight);
        var fullSizeAdj = fullTopAdj + fullBotAdj;
        var audioElement = audioElements[audioElementId];

        if (((currViewport + winHeight) >= fullTop) && (currViewport <= fullSize)){
          if (audioMaster[0].playing === true) {
            if (audioMaster[0].audioElementId !== audioElement.id) {
              audioMaster[0].src = src;
              audioMaster[0].audioElementId = audioElement.id;
              audioMaster[0].play();
              audioMaster[0].playing = true;
              audioElement.playing = true;
            }
          } else {
            audioMaster[0].src = src;
            audioMaster[0].audioElementId = audioElement.id;
            audioMaster[0].play();
            audioMaster[0].playing = true;
            audioElement.playing = true;
          }
        } else {
          if (audioMaster[0].playing === true){
            if (audioMaster[0].audioElementId === audioElement.id) {
              var playingId = audioMaster[0].audioElementId;
              audioMaster[0].pause();
              audioMaster[0].src = null;
              audioMaster[0].playing = false;
              audioMaster[0].audioElementId = null;
            }
          }
          audioElement.playing = false;
        }
        audioElementId++;
      }
    });
  };

  var doFullScreenObjects = function(){
    $('.full').each(function(){
      $(this).find('.lead-image img, .lead-video').each(function(){
        if (winHeight > winWidth){
          $(this).width('auto');
          $(this).height(winHeight);
        } else {
          $(this).width(winWidth);
          $(this).height('auto');
        }
      });
    });
  };
  doFullScreenObjects();

  // if your article starts with a shutter slideshow you might have to rethink it
  var doShutters = function(){
    $('.shutter').each(function(){
      var parPos = $(this).position().top;
      var parHeight = $(this).height();
      var parBot = ((parPos + parHeight) - 10);
      $(this).find('li').each(function(){
        var fullTop = $(this).position().top;
        var fullBot = $(this).height();
        var fullSize = fullTop + fullBot;
        if (((currViewport + winHeight) >= fullTop) && ((currViewport + winHeight) <= parBot) && (currViewport <= fullSize)){
          if (currViewport >= fullTop){
            $(this).find('video:first-child').each(function(){
              $(this)[0].play();
            });
            $(this).find('video:first-child, figure > img').each(function(){
              $(this).addClass('fixed');
            });
          } else {
            $(this).find('video:first-child').each(function(){
              $(this)[0].pause();
            });
            $(this).find('video:first-child, figure > img').each(function(){
              $(this).removeClass('fixed');
            });
          }
        } else if (currViewport > parBot) {
          $(this).find('.fixed').removeClass('fixed');
        } else {
          $(this).find('.fixed').removeClass('fixed');
        }
      });
    });
  };
  doShutters();

  var resizeTimer;
  $(window).resize(function(){
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function(){
      currViewport = getViewport();

      doChapterTitles();

      doShutters();

      doFullScreenObjects();

      //doBlockSizes();

      doAmbientAudio();
    }, 100);

  });

/*
  $(window).scroll(function(){
    currViewport = getViewport();

    doChapterTitles();

    doShutters();

    doFullScreenObjects();


    // don't need something execute immediately after the scroll? Put it in the deferred function below.
    $.doTimeout( 'afterScroll', 250, function(){

      doActiveNav();

      doAmbientAudio();

    });
  });
*/
});
