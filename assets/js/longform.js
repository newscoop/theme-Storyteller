$(document).ready(function(){

  // main menu
  if( $(window).width() < 660) {
    var expandCounter = 0;
    $('.top-menu ul li a').click(function(){
      if (expandCounter == 0) {
        $(this).addClass('active');
        $(this).next('.sub').slideDown('fast');
        expandCounter = 1;
      } else if ($(this).hasClass('active')) {
        $('.top-menu ul li a').removeClass('active');
        $('.sub').slideUp('fast');
        expandCounter = 0;
      } else {
        $('.top-menu ul li a').removeClass('active');
        $('.sub').slideUp('fast');
        $(this).addClass('active');
        $(this).next('.sub').slideDown('fast');
        expandCounter = 1;
      };
      return false;
    });
    
    $('a.cat-trigger').click(function(){
      $('.top-menu ul li a').removeClass('active');
      $('.top-menu ul li .sub').slideUp();
      $(this).next('ul').slideToggle('fast');
      expandCounter = 0;
    });
    
    $('.search-box a.search-trigger').click(function(){
      $('.top-menu ul li a').removeClass('active');
      $('.top-menu ul li .sub').slideUp();
      $(this).toggleClass('active');
      $(this).next('div').slideToggle('fast');
      expandCounter = 0;
    });
    
  } else {
    
    // Man Nav
    $('.top-menu ul li').hover(function(){
      $(this).children('a').addClass('active');
      $(this).children('.sub').slideDown('fast');
    },
    function(){
      $(this).children('a').removeClass('active');
      $(this).children('.sub').slideUp('fast');
    });
  }

  // these vars get used a whole lot
  var winHeight = $(window).height();
  var winWidth = $(window).width();

  // 'whiteout' mode makes the header elements in the Rockstar theme only show when hovered
  if ($('#wrapper').hasClass('whiteout')){
    // make a big old white div to hide the other content
    $('body').append('<div class="whiteout-main"></div>');
    // just hide the main site header - maybe have these fold out later
    $('#header').hide();
    $('#nav-bar').hide();
    // fade the top bar out
    $('#top').css({
      'opacity': '0'
    });

    // get mousepos x-axis
    var mouseY;
    $(document).mousemove(function(e){
      mouseY = e.pageY;
    });

    var topElemHeight = $('#top').height();

    $('#top').bind('mouseleave', function(){
      setTimeout(function(){
        if (mouseY > topElemHeight){
            $('.whiteout-main').animate({
              'opacity': '1'
            }, 1000);
            $('#top').animate({
              'opacity': '0'
            }, 1000);
        }
      }, 1000);
    });

    $('#top').bind('mouseenter', function(){
      $('.whiteout-main').animate({
        'opacity': '0'
      }, 750);
      $(this).animate({
        'opacity': '1'
      }, 750);
      $(this).addClass('active');
    });
  }

  // make a mini menu for easier navigation
  if ($('#wrapper').hasClass('minimenu')){
    var miniMenu = "<ul id='miniMenu'>";
    var elemType;
    var i = 1;
    $('#content h2, #content h3').not('.audio-attachment h3, .video-attachment h3, .attachment h3').each(function(){
      elemType = this.tagName.toLowerCase();
      elemParent = $(this).parent().parent().attr('id');
      $(this).addClass(elemType).attr('id', i);
      miniMenu = miniMenu + "<li class='" + elemType + " " + elemParent + "'><span>+</span><a href='#" + i + "'>" + $(this).text() + "</a></li>";
      i = i + 1;
    });
    miniMenu = miniMenu + "</ul>";
    $('body').append(miniMenu);
    setTimeout(function(){
      $('body #miniMenu').fadeIn(1000, function(){
        // do click events on the miniMenu
        $('#miniMenu li span').bind('click', function(){
          var elemHeight = $(this).parent().height();
          var matchClass = $(this).parent().attr('class');
          matchClass = matchClass.replace('h2 ','');
          var active = matchClass;
          $(this).parent().siblings().not('.h2').animate({
            'height': 0
          }, 250);
          if ($(this).hasClass('active')){
            $(this).parent().siblings().not('.h2').animate({
              'height': 0
            }, 250);
            $(this).removeClass('active');
          } else {
            $(this).parent().siblings('.' + matchClass).animate({
              'height': elemHeight + 'px'
            }, 250);
            $(this).parent().siblings().find('span').removeClass('active');
            $(this).addClass('active');
          }
        });
        $('#miniMenu a').bind('click', function(){
          var elemMatch = $(this).attr('href');
          var elemPos = $('#content').find(elemMatch).position().top;
          $('body').animate({
            scrollTop: elemPos
          }, 1000);
          return false;
        });
      });
    }, 3000);
  }

  $('#content h2').each(function(){
    var secPoster = $(this).next();
    if (secPoster.is('figure')){
      var secPosterSrc = secPoster.find('img').attr('src');
      $(this).attr('style','background-image: url("' + secPosterSrc + '")');
      $(this).css({
        'line-height': winHeight + 'px'
      });
      $(this).addClass('leader');
      secPoster.remove();
    }
  });

  // fix video sources
  // $('video').each(function(){
  //   var video = $(this);
  //   var mainSrc = video.attr('src');
  //   mainSrc = "<source src='" + mainSrc + "' />";
  //   // blat the main src elem
  //   video.removeAttr('src');
  //   var srcs = "";
  //   video.find('source').each(function(){
  //     var src = ($(this).attr('src'));
  //     src = src.replace('/admin/articles','');
  //     srcs = srcs + "<source src='" + src + "' />";
  //     $(this).remove();
  //   });
  //   srcs = mainSrc + srcs;
  //   video.prepend(srcs);
  // });

  $('.videoLeader').each(function(){
    var video = $(this);
    // video.parent().addClass('dlme');
    // video.parent().parent().find('h2').css({
    //   'line-height': winHeight + 'px',
    //   'background': 'transparent'
    // });
    // video.parent().parent().find('h2').after($(this));
    // video.find('object').remove();
    // video.css({
    //   'width': winWidth + 'px',
    //   'max-width': winWidth + 'px',
    //   'background-color': 'black',
    //   'height': winHeight + 'px',
    //   'max-height': winHeight + 'px',
    //   'position': 'absolute',
    //   'margin-top': '-' + winHeight + 'px',
    //   'z-index': '-1'
    // });
    // setTimeout(function(){
    //   $('.dlme').remove();
    // }, 150);
    // force loop if ended
    // if (typeof video[0].loop == 'boolean') { // loop supported
    //   video[0].loop = true;
    // } else { // loop property not supported
    //   video[0].on('ended', function () {
    //     $(this)[0].currentTime = 0;
    //     $(this)[0].play();
    //   }, false);
    // }
    // video[0].play();
  });

  // this gets used a lot
  var currViewportPos = window.pageYOffset;

  var vidState = false;
  var playState = false;

  // handle video
  $('video').not('.videoLeader').each(function(){
    var video = $(this);

    var videoArr = new Array();
    video[0].volume = 1;

    var i = 0;
    var checkVideoState = setInterval(function(){
      if (video[0].readyState > 0) {
        videoArr.duration = video[0].duration;
        videoArr.src = video.attr('src');
        videoArr.pos = video[0].currentTime;
        videoArr.vol = video[0].volume;
        playState = false;
        clearInterval(checkVideoState);
      } else {
        if (i == 120) {
          clearInterval(checkVideoState);
        }
        i = i + 1;
      }
    }, 500);

    setInterval(function(){
      currViewportPos = window.pageYOffset;
      var vidHeight = video.height();
      // get top quarter of page
      var vidPos = video.position().top;
      if ((vidPos > (currViewportPos - (vidHeight / 2))) && (vidPos < ((currViewportPos - vidHeight) + winHeight))) {
        vidState = true;
        video[0].play();
        $('audio.ambient').each(function(){
          var audio = $(this);
          var audioPrevPos = audio[0].currentTime;
          var audioPos = audio[0].currentTime;
          // if they don't match then the audio is playing
          if (audioPos > audioPrevPos){
            audio[0].pause();
            playState = false;
            audio.addClass('paused');
          }
          var i = 1;
        });
      } else {
        vidState = false;
        video[0].pause();
      }
      if (video[0].currentTime == video[0].duration){
        video.addClass('ended');
        vidState = false;
        video.css({
          '-webkit-filter': 'grayscale(' + i + '%)',
             '-moz-filter': 'grayscale(' + i + '%)',
              '-ms-filter': 'grayscale(' + i + '%)',
               '-o-filter': 'grayscale(' + i + '%)',
                  'filter': 'grayscale(' + i + '%)',
        });
        if (i > 95){
          i = 100
        } else {
          i = i + 5;
        }
      }
    }, 500);

  });

  // ambient audio
  $('audio.ambient').each(function(){
    var audio = $(this);
    var audioArr = audio.attr('id');
    var audioArr = new Array();
    playState = false;
    audio[0].pause();

    var i = 0;
    var checkAudiostate = setInterval(function(){
      if (audio[0].readyState > 0) {
        audioArr.duration = audio[0].duration;
        audioArr.id = audio.attr('id');
        audioArr.src = audio.find('source').attr('src');
        audioArr.pos = audio[0].currentTime;
        audioArr.vol = audio[0].volume;
        clearInterval(checkAudiostate);
      } else {
        // console.log('Still trying to get audio duration… ' + i);
        if (i == 120){
          clearInterval(checkAudiostate);
        }
        i = i + 1;
      }
    }, 500);

    // check to see where the window is in comparison to the current element and play audio accordingly / half second tick
    var parentPos = $(this).parent().parent().position().top;
    var parentHeight = $(this).parent().parent().height();
    var $this = $(this);
    setTimeout(function(){
      // why do it twice? because it the render height on page load is much larger than the final computed height so it needs to be reset
      parentPos = $this.parent().parent().position().top;
      parentHeight = $this.parent().parent().height();
      // half second tick to check where we are with things
      setInterval(function(){
        currViewportPos = window.pageYOffset;
        if ((currViewportPos > parentPos) && (currViewportPos < (parentPos + parentHeight)) && (vidState == false)){
          playState = true;
          audio[0].play();
          if (audioArr.vol > .9){
            audioArr.vol = 1;  
          } else {
            audioArr.vol = audioArr.vol + .1;
          }
        } else {
          playState = false;
          if (audioArr.vol < .1){
            audioArr.vol = 0;
            audio[0].pause();
          } else {
            audioArr.vol = audioArr.vol - .1;
          }
        }
        audio[0].volume = audioArr.vol.toFixed(1);
      }, 500);
    }, 1000);

  });


  // gallery stuff
  if ($('.bxslider > div')[0]){
    $('.bxslider').bxSlider({
      auto: true,
      mode: 'fade',
      speed: 2000
    });
  }

  // make animated gif
  $('.anigif').each(function(){
    var src = $(this).attr('href');
    $(this).after('<img src="' + src + '" class="anigif" />');
    $(this).remove();
  });

});