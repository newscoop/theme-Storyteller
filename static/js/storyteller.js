var winHeight = $(window).height();
var winWidth = $(window).width();

$(document).ready(function(){
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
  });

  // use this function to create IDs for objects that don't have them
  var randId = function(limit){
    var randVal = ""; // we want a string the length of the input limit not an integer 
    if (limit == null){
      limit = 4; // you can't have a random string of nothing so set default to 4 where there are 10000 (including 0000) possibilities
    }
    for (i = 0; i < limit; i = i + 1){
      var randValPart = Math.floor(Math.random(0, limit) * 10);
      randVal = randVal + randValPart;
    }
    return randVal;
  };

  $('section.video').each(function(){
    var video = $(this);
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
    video.before('<canvas id=' + videoArr.id + '></canvas>');
    video.remove();
  });

});
