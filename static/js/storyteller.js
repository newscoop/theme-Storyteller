var winHeight = $(window).height();
var winWidth = $(window).width();

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

  // scope is private but can use global

  $('section').each(function(){
    if ($(this).attr('class')){
      var paddingTop = ($(this).css('padding-top'));
      paddingTop = paddingTop.replace('px','');
      var paddingBottom = ($(this).css('padding-bottom'));
      paddingBottom = paddingBottom.replace('px','');
      var paddingVertical = parseInt(paddingTop) + parseInt(paddingBottom);
      $(this).css({
        'min-height': (winHeight - paddingVertical) + 'px'
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


  $('.continue').bind('click', function(){
    if ($(this).parent().parent().next()[0]){
      var nextObjPos = $(this).parent().parent().next().position().top + "px";
      $('body, html').animate({
        scrollTop: nextObjPos
      }, 1000);
    }
  });

  var header = $('header');
  var collapse = $('#collapse');
  var doCollapse = true;
  var i = 0;
  var rotateMenu;

  header.find('h1, nav, ul, form, legend').hide();

  $('#collapse').bind('click', function(){
    if (doCollapse === true){
      doCollapse = false;
      header.animate({
        'min-width': '20%'
      }, 500);
      header.find('nav, ul, h1, form').fadeIn();
      rotateMenu = setInterval(function(){
        collapse.css({
          '-webkit-transform': 'rotate(' + i + 'deg)',
             '-moz-transform': 'rotate(' + i + 'deg)',
              '-ms-transform': 'rotate(' + i + 'deg)',
               '-o-transform': 'rotate(' + i + 'deg)',
                  'transform': 'rotate(' + i + 'deg)'
        });
        if (i >= 90){
          clearInterval(rotateMenu);
        } else {
          i = i + 10;
        }
      }, 5);
    } else {
      doCollapse = true;
      header.find('nav, ul, h1, form').fadeOut();
      header.delay(500).animate({
        'min-width': '0%'
      }, 500);
      rotateMenu = setInterval(function(){
        collapse.css({
          '-webkit-transform': 'rotate(' + i + 'deg)',
             '-moz-transform': 'rotate(' + i + 'deg)',
              '-ms-transform': 'rotate(' + i + 'deg)',
               '-o-transform': 'rotate(' + i + 'deg)',
                  'transform': 'rotate(' + i + 'deg)'
        });
        if (i <= 0){
          clearInterval(rotateMenu);
        } else {
          i = i - 10;
        }
      }, 5);
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

  // full sreen shutter slides
  $('.slideshow.full.shutter').each(function(){
    $(this).find('li, figure').each(function(){
      $(this).css({
        'min-height' :winHeight
      });
    });
    var i = 1;
    // var i = $(this).find('li').length;
    $(this).find('li').each(function(){
      $(this).css({
        'z-index': i
      });
      i = i + 1;
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

  var doChapterTitles = function(){
    $('.chapter-title').each(function(){
      var parPos = $(this).position().top;
      var parHeight = $(this).height();
      var parBot = ((parPos + parHeight) - 10);
      // for images just change the classes
      $(this).find('img').each(function(){
        if ((currViewport >= parPos) && (currViewport <= parBot)) {
          $(this).addClass('fixed');
        } else {
          $(this).removeClass('fixed');
        }
      });
      // for video change the classes and also pause/play the video
      $(this).find('video').each(function(){
        var video = $(this);
        if ((currViewport >= parPos) && (currViewport <= parBot)) {
          $(this).addClass('fixed');
          if (video[0].playing === true) {
              video[0].play();
              video[0].playing = true;
          } else {
            video[0].play();
            video[0].playing = true;
          }
        } else {
          $(this).removeClass('fixed');
          if (video[0].playing === true){
              video[0].pause();
              video[0].playing = false;
          }
          video[0].playing = false;
        }
      });
    });
  };
  // run the chapter titles
  doChapterTitles();

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
        if (((currViewport + winHeight) >= fullTop) && (currViewport <= fullSize)){
          if (currViewport >= fullTop){
            $(this).find('video:first-child, figure > img').each(function(){
              $(this).addClass('fixed');
            });
          } else {
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

  // handle ambient audio here - I advise you to defer this
  var doAmbientAudio = function(){
    var audioElementId = 0;
    $('section, li').each(function(){
      j = j + 1;
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
        $(this).find('.lead-image, iframe, .lead-video').css({
          'display': 'block'
        });
      } else {
        $(this).find('.lead-image, iframe, .lead-video').css({
          'display': 'none'
        });
      }
    });
  };
  doFullScreenObjects();

  $(window).scroll(function(){
    // if it's urgent you update immediately after scroll then place your function next:

    // remember to reset the viewport position whenever someone has moved around the article
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
