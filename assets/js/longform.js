$(document).ready(function(){
  // these vars get used a whole lot
  var winHeight = $(window).height();
  var winWidth = $(window).width();

  // make a mini menu for easier navigation
  var miniMenu = "<ul id='miniMenu'>";
  var elemType;
  var i = 1;
  $('#content h2, #content h3').each(function(){
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
    $(this).attr('data-offsety', $(this).position().top);
  });

  // deltaloop
  setInterval(function(){
    var currViewportPos = window.pageYOffset;
    // $('h2').each(function(){
      // if (currViewportPos > $(this).position().top){
        // this is where the background image will do something
      // }
    // });
  }, 25);

});