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
      var title = $(this).find('h1');
      title.css({
        'line-height': (winHeight - 60) + 'px'
      });
      title.after('<span class="continue">Click here to continue</span>');
    }
  });


  $('.continue').bind('click', function(){
    // console.log('ping');
    var nextObjPos = $(this).parent().parent().next().position().top + "px";
    $('body, html').animate({
      scrollTop: nextObjPos
    }, 1000);
    // console.log(nextObjPos);
  });

  $('section.video').each(function(){
    var video = $(this).find('video');
    var videoArr = new Array([]);
    videoArr.id = randId();
    videoArr.mp4 = "";
    videoArr.ogg = "";
    videoArr.webm = "";
    var j = video.find('source').length;
    for (i = 0; i < j; i = i + 1){
      tmpStr = $(this).find('source')[i].src;
      if (tmpStr.indexOf('mp4')!=-1){
        videoArr.mp4 = tmpStr;
      }
      if (tmpStr.indexOf('ogv')!=-1){
        videoArr.ogg = tmpStr;
      }
      if (tmpStr.indexOf('webm')!=-1){
        videoArr.webm = tmpStr;
      }
    }
    var canvasObj = '<canvas id=' + videoArr.id + '>Your browser doesn\'t support the canvas element. Please upgrade to a newer browser.</canvas>';
    video.before(canvasObj);
    video.hide();
    // now push the video to the canvas
    var v = video[0];
    var canvas = $('#' + videoArr.id)[0];
    var context = canvas.getContext('2d');

    var cw = Math.floor(canvas.clientWidth);
    var ch = Math.floor(canvas.clientHeight);
    canvas.width = cw;
    canvas.height = ch;

    v.addEventListener('play', function(){
        draw(this,context,cw,ch);
    },false);

    function draw(v,c,w,h) {
        if(v.paused || v.ended) return false;
        c.drawImage(v,0,0,w,h);
        setTimeout(draw,20,v,c,w,h);
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

  $('.slideshow').not('.shutter').find('.slides').bxSlider({
    // auto: true,
    loop: true,
    controls: false,
    mode: 'fade'
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

  // all checks that happen after the scroll do here

  // variable for the audio element to use to make sure that the masterAudio object doesn't stop/start all the time

  var j = 0;

  var afterScroll = addEventListener('scroll', function(){

    var currViewport = getViewport();

    $('.shutter').each(function(){
      var parPos = $(this).position().top;
      var parHeight = $(this).height();
      var parBot = (parPos + parHeight);
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
          // console.log('found audio');
          if (audioMaster[0].playing === true) {
            if (audioMaster[0].audioElementId !== audioElement.id) {
              // console.log('updating audio src');
              audioMaster[0].src = src;
              audioMaster[0].audioElementId = audioElement.id;
              audioMaster[0].play();
              audioMaster[0].playing = true;
              audioElement.playing = true;
            }
          } else {
            // console.log('turning on audio');
            audioMaster[0].src = src;
            audioMaster[0].audioElementId = audioElement.id;
            audioMaster[0].play();
            audioMaster[0].playing = true;
            audioElement.playing = true;
          }
        } else {
          if (audioMaster[0].playing === true){
            if (audioMaster[0].audioElementId === audioElement.id) {
              // console.log('turning off audio');
              var playingId = audioMaster[0].audioElementId;
              audioMaster[0].pause();
              audioMaster[0].src = null;
              audioMaster[0].playing = false;
              audioMaster[0].audioElementId = null;
            }
          }
          audioElement.playing = false;
          //console.log(j + ' ' + audioMaster[0].playing + ' ' + $(this).find('h3').text());
        }
        audioElementId++;
      }
    });

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

  });

  // main loop triggers every half a second
  var loop = setInterval(function(){
    // this is always the current top left corner of the viewing area
    var currViewport = getViewport();
  }, 500);

});
