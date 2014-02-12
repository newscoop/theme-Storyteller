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
      // if (secPoster.next().is('.intro')){
      //   var infoHeight = (secPoster.next().height() + 40);
      //   secPoster.next().css({
      //     'margin-top': '-' + (infoHeight / 3) + 'px'
      //   });
      // }
    }
  });

  // deltaloop
  var audioMaxCount = 100;
  var audioMinCount = 0;
  var audioVolumeCount = 0;
  setInterval(function(){
    var currViewportPos = window.pageYOffset;
    $('audio.ambient').each(function(){
      var parentPos = $(this).parent().position().top;
      var parentHeight = $(this).parent().height();
      if (currViewportPos > parentPos){
        if (currViewportPos < parentHeight) {
          $(this)[0].play();
          if (audioMinCount < 100){
            audioMinCount = audioMinCount + 1;
            if (audioVolumeCount >= 1){
              audioVolumeCount = 1;
            } else {
              audioVolumeCount = audioVolumeCount + .01;
            }
            $(this)[0].volume = audioVolumeCount.toFixed(2);
          } else {
            audioMinCount = 0;
          }
        } else {
          if (audioMaxCount > 0){
            audioMaxCount = audioMaxCount - 1;
            if (audioVolumeCount <= 0){
              audioVolumeCount = 0;
            } else {
              audioVolumeCount = audioVolumeCount - .01;
            }
            $(this)[0].volume = audioVolumeCount.toFixed(2);
          } else {
            $(this)[0].pause();
            audioMaxCount = 100;
          }
        }
      }
    });
    // $('h2').each(function(){
      // if (currViewportPos > $(this).position().top){
        // this is where the background image will do something
      // }
    // });
  }, 25);

});