// define global window height and width
var winHeight = $(window).height();
var winWidth = $(window).width();

// set function to refill those values when needed
var doWinDimensions = function(){
  winHeight = $(window).height();
  winWidth = $(window).width();
};

var storyTeller = {
  options: {},
  assets: [],
  live_assets: [],
  initialized: false,

  init: function(options, callback) {
    var that = this;

    // async load video
    this.asyncLoadVideo();

    this.doChapterTitleText();
    this.doZindex();
    this.doBackgrounds();

    // TODO: check options to see if we should skip certain asset types
    this.loadChapterTitleAssets();
    this.loadShutterAssets();
    this.loadAudioAssets();

    console.log(this.assets);

    // call function to set scroll function
    $(window).scroll(function() {
      that.onScroll()
    });

    this.initialized = true;

    if (callback) {
      callback();
    }
  },
  
  
  doChapterTitleText: function(){
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
  },

  asyncLoadVideo: function() {
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
  },

  doZindex: function() {
    i = 0;
    $('section > article > section').each(function(){
      $(this).css({
        'z-index': ++i
      });
    });
  },


  doBackgrounds: function(){
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
  },

  onScroll: function() {
    var that = this;
    currViewport = this.getViewport();

    // trigger assets that come into view
    for (var a in this.assets) {
      var asset = this.assets[a];
      if ((currViewport >= asset.top) && (currViewport <= asset.bottom)) {
        // TODO: call triggerAsset function, and add asset to live_assets
        that.triggerAsset(asset);
      }
    }

    // TODO: stop / turn off live_assets that move out of view
  },

  triggerChapterTitle: function(asset) {
    console.log(asset.type); 
    if (asset.type === "chapter-title-video") {
      var video = asset.el[0];
      video.playing = false;
      asset.bgDiv.addClass('fixed');
      asset.el.addClass('fixed');
      $(video).attr('src', $(asset.el[0]).attr('data-video'));
      if (video.playing != true) {
        video.play();
        video.playing = true;
        console.log('starting video');
      } else {
        console.log('video is already playing');
      }
    }
  },

  loadChapterTitleAssets: function() {
    var that = this;
    $('.chapter-title').each(function(){
      var par = null;
      var parPos = $(this).position().top;
      var parHeight = $(this).height();
      var parBot = ((parPos + parHeight) - 10);
      var bgDiv = $(this).find('.bgContainer');

      // videos
      $(this).find('.lead-video').each(function(){
        var asset = {
          type: 'chapter-title-video',
          el: $(this),
          top: parPos,
          bottom: parBot,
          bgDiv: bgDiv
        };
        that.assets.push(asset);
      });

      // images
      $(this).find('.lead-image').each(function(){
        var asset = {
          type: 'chapter-title-image',
          el: $(this),
          top: parPos,
          bottom: parBot
        };
        that.assets.push(asset);
      });
    });
  },

  loadShutterAssets: function() {
    var that = this;
    $('.shutter').each(function(){
      var parPos = $(this).position().top;
      var parHeight = $(this).height();
      var parBot = ((parPos + parHeight) - 10);
      $(this).find('li').each(function(){
        var fullTop = $(this).position().top;
        var fullBot = $(this).height();
        var fullSize = fullTop + fullBot;
        var asset = {
          type: 'shutter',
          el: $(this),
          top: parPos,
          bottom: parBot,
          fullsize: fullSize
        };
        that.assets.push(asset);
      });
    });
  },

  loadAudioAssets: function() {
    var that = this;
    $('section, li').each(function(){
      if ($(this).attr('data-audiosrc')) {
        var src = location.protocol + '//' + window.location.hostname + '/' + $(this).attr('data-audiosrc');
        var fullTop = $(this).position().top;
        var fullBot = $(this).height();
        var fullSize = fullTop + fullBot;
        var asset = {
          type: 'audio',
          el: $(this),
          top: fullTop,
          bottom: fullBot,
          fullsize: fullSize
        };
        that.assets.push(asset);
      }
    });
  },

  triggerAsset: function(asset) {
    if (asset.type === "chapter-title-video") {
      this.triggerChapterTitle(asset);
    }
  },

  getViewport: function(){
    var currViewport = window.pageYOffset;
    return currViewport;
  },
};

$(document).ready(function(){

  // init storyTeller manager
  storyTeller.init(function() {
    // do whatever we want to do after the storyTeller init
    console.log(storyTeller.assets);
    console.log('all good');
  });

});
