$(document).ready(function(){
  // these vars get used a whole lot
  var winHeight = $(window).height();
  var winWidth = $(window).width();

  // make a mini menu for easier navigation
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
        // console.log(elemPos);
        return false;
      });
    });
  }, 3000);


  $('#content h2').each(function(){
    var secPoster = $(this).next();
    if (secPoster.is('figure')){
      var secPosterSrc = secPoster.find('img').attr('src');
      $(this).attr('style','background: url("' + secPosterSrc + '") 50% 50% no-repeat transparent; background-size: cover');
      $(this).css('line-height', winHeight + 'px');
    }
  });

  // this gets used a lot
  var currViewportPos = window.pageYOffset;

  // ambient audio
  $('audio.ambient').each(function(){
    var audio = $(this);
    var audioArr = audio.attr('id');
    var audioArr = new Array();
    audio[0].volume = 0;
    playState = false;

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
        console.log('Still trying to get audio duration… ' + i);
        if (i == 120){
          console.log('Tried for 1 minute, gave up');
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
        if ((currViewportPos > parentPos) && (currViewportPos < (parentPos + parentHeight))){
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
  $('.thumb-gallery .zoom').remove();
  $('.thumb-gallery').wrapInner('<div class="stage"></div>');
  var gallSize;
  var gallHeight;
  $('.thumb-gallery').each(function(){
    gallHeight = $(this).find('.gall-box').first().find('figure').height();
    gallSize = $(this).find('.stage .gall-box').length;
    $(this).height(gallHeight);
    $(this).find('.stage .gall-box').width($('#wrapper').width());
    $(this).find('.stage').width((winWidth + 10) * gallSize);
  });

});