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
  audio_master: null,
  collasped: false,
  resizeTimer: null,

  init: function(options, callback) {
    var that = this;

    // async load assets
    this.asyncLoadVideo();
    this.asyncLoadAudio();

    this.doMainNav();
    this.doActiveNav();
    this.doSlideShows();
    this.doChapterTitleText();
    this.doZindex();
    this.doBackgrounds();
    this.doFullScreenObjects();

    // TODO: check options to see if we should skip certain asset types
    this.loadChapterTitleAssets();
    this.loadShutterAssets();
    this.loadAudioAssets();

    //console.log(this.assets);

    // set resize function
    $(window).resize(function() {
      that.resizeTimer = setTimeout(function() {
        that.onScroll();
      }, 100);
    });

    // set scroll function
    $(window).scroll(function() {
      that.onScroll();
    });

    // continue event handler
    $('.continue').bind('click', function(){
      if ($(this).parent().parent().next()[0]){
        var nextObjPos = $(this).parent().parent().next().position().top + "px";
        $('body, html').animate({
          scrollTop: nextObjPos
        }, 1000);
      }
    });

    this.initialized = true;

    if (callback) {
      callback();
    }
  },
 
  doMainNav: function() {
    var that = this;
    if (this.collapsed === false){
      this.collapsed = true;
      $('header nav').addClass('active');
    } else {
      this.collapsed = false;
      $('header nav').removeClass('active');
    }
    
    // add event handlers
    $('#collapse').bind('click', function(){
      $('header nav li').animate({
        'opacity': 0
      }, 500, function(){
        that.doMainNav();
        $('header nav li').animate({
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
  },

  doActiveNav: function(currViewport) {
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
  },
 
  doSlideShows: function() {
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

  doFullScreenObjects: function() {
    $('.full').each(function(){
      $(this).find('.lead-image img, .lead-video').each(function(){
        $(this).removeClass('fixed');
        if (winHeight > winWidth){
          $(this).width('auto');
          $(this).height(winHeight);
        } else {
          $(this).width(winWidth);
          $(this).height('auto');
        }
      });
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

  asyncLoadAudio: function() {
    var that = this;
    if ($('audio.ambient')[0]){
      $('body').append('<audio id="audioMaster" loop src="null" />');
      that.audio_master = $('#audioMaster');
      $('.ambient').each(function(){
        var src = $(this).attr('src');
        var par = $(this).parent().get(0).tagName.toLowerCase();

        if (par == 'figure'){
          $(this).parent().parent().attr('data-audiosrc', src);
        } else {
          $(this).parent().attr('data-audiosrc', src);
        }
        $(this).remove();
      });
    }

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

    // activeNav
    this.doActiveNav(currViewport);

    // trigger assets that come into view
    for (var a in this.assets) {
      var asset = this.assets[a];

      // chapter-title-videos
      if (asset.type === 'chapter-title-video') {
        if ((currViewport >= asset.top) && (currViewport <= asset.bottom)) {
          that.triggerChapterTitle(asset);
        } else {
          that.stopChapterTitle(asset);
        }
      }

      // chapter-title-image
      if (asset.type === 'chapter-title-image') {
        if ((currViewport >= asset.top) && (currViewport <= asset.bottom)) {
          $(asset.el.bgDiv).addClass('fixed');
        } else {
          $(asset.el.bgDiv).removeClass('fixed');
        }
      }

      // ambient audio
      if (asset.type === 'ambient-audio') {
        if (((currViewport + winHeight) >= asset.top) && (currViewport <= asset.fullsize)) {
          that.triggerAmbientAudio(asset);
        } else  {
          that.stopAmbientAudio(asset);
        }
      }

      // shutters
      if (asset.type === 'shutter') {
        if (((currViewport + winHeight) >= asset.top) && ((currViewport + winHeight) <= asset.bottom) && (currViewport <= asset.fullsize)) {
          if (currViewport >= asset.top) {
            that.triggerShutter(asset);
          } else {
            that.stopShutter(asset);
          }
        } else {
          $(asset).find('.fixed').removeClass('fixed');
        }
      }

    }

  },
 
  triggerShutter: function(asset) {
    var that = this;
    $(asset.el).find('video:first-child').each(function(){
      var video =  $(this)[0];

      if (!that.assetIsLive(video)) {
        $(video).attr('src', $(video).attr('data-video'));
        video.play();
        that.live_assets.push(video);       
        console.log('playing video', video);
      } else {
        //console.log('video is already playing');
      }
    });
    $(asset.el).find('video:first-child, figure > img').each(function(){
      $(this).addClass('fixed');
    });
  },

  stopShutter: function(asset) {
    var that = this;
    $(asset.el).find('video:first-child').each(function(){
      var video =  $(this)[0];
      video.pause();
      // remove it from the live assets list
      that.live_assets = $.grep(that.live_assets, function(a,i) { 
        return a.src === video.src; 
      }, true); 
    });
    $(asset.el).find('video:first-child, figure > img').each(function(){
      $(this).removeClass('fixed');
    });
    $(asset.el).removeClass('fixed');
  },
 
  triggerAmbientAudio: function(asset) {
    var that = this;
    var audio = asset.el[0];

    var src = src = location.protocol + '//' + window.location.hostname + '/' + $(audio).attr('data-audiosrc');
    var masterAudio = this.audio_master[0];

    //console.log(src, asset);

    if (!that.assetIsLive(asset)) {
      if (masterAudio.src !== src) {
        masterAudio.src = src;
      }
      masterAudio.play();
      that.live_assets.push(masterAudio);
    } else {
      //console.log('audio is already playing');
    }
  },

  stopAmbientAudio: function(asset) {
    var that = this;
    var audio = asset.el[0]; 
    var masterAudio = this.audio_master[0];

    masterAudio.pause();
    // remove it from the live assets list
    this.live_assets = $.grep(that.live_assets, function(a,i) { 
      return a.src === masterAudio.src; 
    }, true); 
  },
  
  triggerChapterTitle: function(asset) {
    var that = this;
    var video = asset.el[0];
    if (!that.assetIsLive(video)) {
      $(asset.bgDiv).addClass('fixed');
      $(asset.el).addClass('fixed');
      $(video).attr('src', $(video).attr('data-video'));
      video.play();
      that.live_assets.push(video);
      //console.log('starting video');
    } else {
      //console.log('video is already playing');
    }
  },

  stopChapterTitle: function(asset) {
    var that = this;
    var video = asset.el[0]; 
    video.pause();
    $(video).removeClass('fixed');
    $(asset.el.bgDiv).removeClass('fixed');
    // remove it from the live assets list
    this.live_assets = $.grep(that.live_assets, function(a,i) { 
      return a.src === video.src; 
    }, true); 
  },

  assetIsLive: function(asset) {
    var results = $.grep(this.live_assets, function(a) {
        return a.src === asset.src;
    });
    //console.log(results.length);

    if (results.length === 0) {
      return false;
    } else {
      return true;
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
        $(this).removeClass('fixed');
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
          top: fullTop,
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
        var fullTop = $(this).position().top;
        var fullBot = $(this).height();
        var fullSize = fullTop + fullBot;
        var asset = {
          type: 'ambient-audio',
          el: $(this),
          top: fullTop,
          bottom: fullBot,
          fullsize: fullSize
        };
        that.assets.push(asset);
      }
    });
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
