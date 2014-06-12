// define global window height and width
var winHeight = $(window).height();
var winWidth = $(window).width();

// set function to refill those values when needed
var doWinDimensions = function(){
  winHeight = $(window).height();
  winWidth = $(window).width();
};

$(document).ready(function(){

  // use this function to create IDs for objects that don't have them - probably not an issue after template creation
  var randId = function(limit){
    var randVal = ""; // we want a string the length of the input limit not an integer
    if (limit === null || limit === undefined){
      limit = 4; // you can't have a random string of nothing so set default to 4 where there are 10000 (including 0000) possibilities
    }
    for (i = 0; i < limit; i = i + 1){
      var randValPart = Math.floor(Math.random(0, limit) * 10);
      randVal = randVal + randValPart;
    }
    return randVal;
  };

  var getViewport = function(){
    var currViewport = window.pageYOffset;
    return currViewport;
  };

  // check through document and see if there are ambient audio elements. If there are, create a single audio element and use it as the basis for all further sound
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

  var doBlockSizes = function(){
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
          'top': ((winHeight / 2) - 60) + 'px'
        });
        title.after('<span class="continue">Click here to continue</span>');
      }
    });
  };
  doBlockSizes();

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
          mode: 'fade'
        });
      } else {
        $(this).find('.slides').bxSlider({
          loop: true,
          controls: false,
        });
      }
    }
  });

  $('.slideshow.full, .bx-viewport').css({
    'min-height' : winHeight
  });

  // full screen shutter slides
  $('.slideshow.full.shutter').each(function(){
    $(this).find('figure').each(function(){
      $(this).css({
        'min-height' :winHeight
      });
    });
    var i = 0;
    $(this).find('li').each(function(){
      $(this).css({
        'z-index': ++i,
        'min-height' :(winHeight + (winHeight / 2))
      });
    });
  });

  // full sreen maps
  $('section.map.full').each(function(){
    var map = $(this).find('iframe');
    map.attr('width', winWidth);
    map.attr('height', winHeight);
    map.css({
      'display': 'none'
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
      var fullTop = $(this).position().top;
      var fullBot = $(this).height();
      var fullSize = fullTop + fullBot;
      // then we want to remove the windowHeight from the top position and add it to the height so that when we check to see if elements should be displayed or not we make sure they don't just appear
      var fullTopAdj = (fullTop - winHeight);
      var fullBotAdj = (fullBot + winHeight);
      var fullSizeAdj = fullTopAdj + fullBotAdj;
      if (((currViewport + winHeight) >= fullTop) && (currViewport <= fullSize)){
        if (currViewport >= fullTop){
          $(this).find('.lead-image img, .lead-video').each(function(){
            $(this).addClass('fixed');
          });
        } else {
          $(this).find('.lead-image img, .lead-video').each(function(){
            $(this).removeClass('fixed');
          });
        }
      } else if (currViewport > fullBot) {
        $(this).find('.fixed').removeClass('fixed');
      } else {
        $(this).find('.fixed').removeClass('fixed');
      }
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

      doBlockSizes();

      doAmbientAudio();
    }, 100);

  });

  $(window).scroll(function(){
    currViewport = getViewport();

    doChapterTitles();

    doShutters();

    doFullScreenObjects();

    // don't need something execute immediately after the scroll? Put it in the deferred function below.
    $.doTimeout( 'afterScroll', 250, function(){

      doAmbientAudio();

    });

  });
});
