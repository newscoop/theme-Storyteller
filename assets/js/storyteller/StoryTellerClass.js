var storyTeller = {
  options: {},
  assets: [],
  live_assets: [],
  initialized: false,
  audio_master: null,
  collasped: false,
  resizeTimer: null,
  loading: false,
  loopCheck: false,
  winHeight: null,
  winWidth: null,
  menuHeight: null,
  iOS: null,
  muted: false,
  
  init: function(options, callback) {
    var that = this;

    // setup screen stuff
    this.resizeWindow();
    this.menuHeight = $('header').height();
    this.iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
 
    // build loader
    this.showLoading();
    this.asyncLoadVideo();
    this.asyncLoadAudio();
    this.doMainNav();
    this.doActiveNav();
    this.doSlideShows();
    this.doChapterTitleText();
    this.doZindex();
    this.doFullScreenObjects();

    // TODO: check options to see if we should skip certain asset types
    this.loadChapterTitleAssets();
    this.loadSlideshowAssets();
    this.loadShutterAssets();
    this.loadAudioAssets();

    //console.log(this.assets);

    // set first nav element to active
    $('header nav > ul > li:first-child a').addClass('active');

    // set resize function
    $(window).resize(function() {
      that.resizeWindow();

      that.doSlideShows();
      that.doChapterTitleText();
      that.doFullScreenObjects();

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
        var nextObjPos = ($(this).parent().parent().next().position().top) + "px";
        $('body, html').animate({
          scrollTop: nextObjPos
        }, 1000);
      }
    });

    // nav collapse  event handlers
    $('#collapse').bind('click', function(){
      $('header nav').animate({
        'opacity': 0
      }, 500, function(){
        that.doMainNav();
        $('header nav').animate({
          'opacity': 1
        });
      });
      return false;
    });


    this.initialized = true;
    this.hideLoading();
    this.onScroll();

    if (callback) {
      callback();
    }
  },

  resizeWindow: function() {
    this.winHeight = $(window).height();
    this.winWidth = $(window).width();
    return { height: this.winHeight, width: this.winWidth }
  },

  getWindowDimensions: function() {
    return { height: this.winHeight, width: this.winWidth }
  },

  showLoading: function() { 
    $('body > section').append('<span class="loader"><span class="spinner"></span></span>');
    var spinner = $('.spinner');
    var i = 0;
    this.loading = setInterval(function(){
      if (i == 360){
        i = 0;
      } else {
        i++;
      }
      //console.log(i);
      var iAmt = i * 2;
      spinner.attr('style', '-webkit-transform: rotate(' + iAmt + 'deg); -moz-transform: rotate(' + iAmt + 'deg); transform: rotate(' + iAmt + 'deg);');
    }, 10);
  },

  hideLoading: function() {
    clearInterval(this.loading);
    $('.loader').remove();
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

    // header nav
    $('header nav a').bind('click', function(){
      var src = $(this).attr('href').replace('#','');
      var target = ($('[name=' + src + ']').position().top + 1);
      $('body, html').animate({
        scrollTop: target + 'px'
      }, 1000);
      return false;
    });

    // mute button
    $('.mute').bind('click', function(){
      if (that.muted === true){
        $(this).removeClass('muted');
        that.muted = false;
        $('video, audio').each(function(){
          $(this)[0].volume = 1;
        });
      } else {
        that.muted = true;
        $(this).addClass('muted');
        $('video, audio').each(function(){
          $(this)[0].volume = 0;
        });
      }
      return false;
    });
  },


  doActiveNav: function(currViewport) {
    var i = 0;
    $('article > section, .slides > li').each(function(){
      var matchName = $(this).not('.bx-clone').attr('name');
      var fullTop = $(this).position().top;
      var fullBot = $(this).height();
      var fullSize = fullTop + fullBot;
      $('nav li a').each(function(){
        var parEl = $(this).parent();
        var navId = $(this).attr('href').replace('#','');
        if (navId == matchName){
          i++;
          if (currViewport > 0){
            $('header nav > ul > li:nth-of-type(' + i + ') a').addClass('active');
          }
          if (currViewport < fullTop){
              $('header nav > ul > li:nth-of-type(' + i + ') a').removeClass('active');
          }
        }
      });
    });
  },

  doSlideShows: function() {
    var that = this;
    $('.slideshow').each(function(){
      var childrenCount = ($(this).children('ul').children('li').length);
      if (childrenCount > 1) {
        if ($(this).hasClass('shutter')){
          // nothing
        } else {
          if ($(this).hasClass('fade')){
            $(this).find('.slides').bxSlider({
              loop: true,
              minSlides: 2,
              controls: true,
              mode: 'fade'
            });
          } else {
            $(this).find('.slides').bxSlider({
              loop: true,
              minSlides: 2,
              controls: true
            });
          }
        }
      }
    });

    $('.slideshow.full, .bx-viewport').attr('min-height', that.winHeight + ' !important');

    // full screen shutter slides
    $('.shutter.full .slides').each(function(){
      var listItems = $(this).children('li');
      var lastListItem = $(this).children('li').last();
      lastListItem.addClass('end');
      listItems.css({
        'min-height': that.winHeight
      });
      listItems.find('figure').each(function(){
        $(this).css({
          'min-height' : that.winHeight
        });
        if ($(this).parent().hasClass('left-text') || $(this).parent().hasClass('right-text')){
          $(this).find('figcaption').css({
            'min-height' : that.winHeight
          });
        }
      });
      var i = 0;
      listItems.each(function(){
        $(this).css({
          'z-index': ++i
        });
      });
    });
  },

  doChapterTitleText: function(){
    var that = this;
    $('section').each(function(){
      if ($(this).attr('class')){
        var paddingTop = ($(this).css('padding-top'));
        paddingTop = paddingTop.replace('px','');
        var paddingBottom = ($(this).css('padding-bottom'));
        paddingBottom = paddingBottom.replace('px','');
        var paddingVertical = parseInt(paddingTop) + parseInt(paddingBottom);
        $(this).css({
          'min-height': that.winHeight + 'px',
          'width': that.winWidth
        });
      }
      if ($(this).hasClass('chapter-title')){
        var title = $(this).find('.title');
        title.css({
          'margin-top': (that.menuHeight * 2) + 'px'
        });
        // TODO: only run this once, ceck if it has been added first
        if (!title.next().hasClass('continue')) {
          title.after('<span class="continue">Click here to continue</span>');
        }
      }
    });
  },

  doFullScreenObjects: function() {
    var that = this;
    $('.full').each(function(){
      $(this).find('.lead-video').each(function(){
        $(this).removeClass('fixed');
        if (that.winHeight > that.winWidth){
          $(this).width('auto');
          $(this).height(that.winHeight);
        } else {
          $(this).width(that.winWidth);
          $(this).height('auto');
        }
      });
    });
  },

  asyncLoadVideo: function() {
    $('.video-container').each(function(){
      var container = $(this);
      var src = null;
      $(container).children('source').each(function(){
        src = $(this).attr('data-src');
        // check for mp4 or webm capability
        if (Modernizr.video) {
          // chrome > 30 can handle both mp4 and webm but mp4 is used more widely
          if (Modernizr.video.webm) {
            // check to see if the last character is a '4'
            if (src.substr(-1) == 'm'){
              src = src;
      	      return false;
            }
          } else if (Modernizr.video.h264){
            // check to see if the last digit is an 'm'
            if (src.substr(-1) == '4'){
              src = src;
      	      return false;
            }
          }
        }
      });
      $(container).attr('data-src', src);
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
          $(this).parent().parent().attr('audio-src', src);
        } else {
          $(this).parent().attr('audio-src', src);
        }
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
        if (((currViewport + that.winHeight) >= asset.top) && (currViewport <= (asset.bottom + that.winHeight))) {
          that.triggerVideo(asset);
        } else {
          that.stopVideo(asset);
          $(asset.el).find('.fixed').removeClass('fixed');
          $(asset.el).removeClass('fixed');
        }
      }

      // slideshow-videos
      if (asset.type === 'slideshow-video') {
        if (((currViewport + that.winHeight) >= asset.top) && (currViewport <= (asset.bottom + that.winHeight))) {
          that.triggerVideo(asset);
        } else {
          that.stopVideo(asset);
          $(asset.el).find('.fixed').removeClass('fixed');
          $(asset.el).removeClass('fixed');
        }
      }

      // chapter-title-image
      if (asset.type === 'chapter-title-image') {
        if ((currViewport >= asset.top) && (currViewport <= asset.bottom)) {
          $(asset.el.bgDiv).addClass('fixed');
        } else {
          $(asset.el).find('.fixed').removeClass('fixed');
          $(asset.el).removeClass('fixed');
        }
      }

      // ambient audio
      if (asset.type === 'ambient-audio') {
        if (((currViewport + that.winHeight) >= asset.top) && (currViewport <= asset.fullsize)) {
          that.triggerAmbientAudio(asset);
        } else  {
          that.stopAmbientAudio(asset);
          $(asset.el).find('.fixed').removeClass('fixed');
          $(asset.el).removeClass('fixed');
        }
      }

      // shutters
      if (asset.type === 'shutter') {
        if (((currViewport + that.winHeight) >= asset.top) && ((currViewport + that.winHeight) <= asset.bottom) && (currViewport <= asset.fullsize)) {
          if (currViewport >= asset.top) {
            that.triggerShutter(asset);
          } else {
            that.stopShutter(asset);
          }
        } else {
          $(asset.el).find('.fixed').removeClass('fixed');
          $(asset.el).removeClass('fixed');
        }
      }

    }

  },

  triggerShutter: function(asset) {
    var that = this;
    $(asset.el).find('.lead-video').each(function(){
      var container = $(this).get(0);
      var video = $(container).find('video').get(0);

      if (!that.assetIsLive(container)) {
        //console.log('shutter playing ' + $(container).attr('data-src'));

        $(container).addClass('fixed');
        $(container).attr('src',  $(container).attr('data-src'));

        var video = that.createVideoElement(asset, container);
        video.load();

        // only play if this is not a slide video
      	// if (asset.type !== 'slideshow-video') {
      	// if (!$(container).parents('.bx-wrapper').length > 0) {
      	if (!$(container).parents('.slideshow').length > 0) {
          if (that.muted == true){
            video.volume = 0;
          } else {
            video.volume = 1;
          }
          video.play();
      	}

      	// only manually loop if this is chrome browser
        if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
          that.startVideoLoop(video);
      	}

        that.live_assets.push(container);

        //console.log('playing shutter video', $(video).attr('src'));
      } else {
        //console.log('shutter video is already playing');
      }
    });
    $(asset.el).find('.lead-video, .bgContainer').each(function(){
      $(this).addClass('fixed');
    });
    $(asset.el).find('.lead-video').css('z-index', 9999);
  },

  stopShutter: function(asset) {
    var that = this;
    $(asset.el).find('.lead-video').each(function(){
      var container = $(this).get(0);
      var video = $(container).find('video').get(0);
      if (that.assetIsLive(container)) {

        //console.log($(container).attr('data-src'));

        video.pause();
        that.stopVideoLoop(video);
        // remove it from the live assets list
        that.live_assets = $.grep(that.live_assets, function(a,i) {
          return $(a).attr('src') === $(video).attr('src');
        }, true);

        // we need to set video src = '' and remove video element
        // due to known bug with chrome
        video.src = '';
        $(video).remove();
      }
    });
    $(asset.el).find('.lead-video, .bgContainer').each(function(){
      $(this).removeClass('fixed');
    });
    $(asset.el).removeClass('fixed');
    $(asset.el).find('.lead-video').css('z-index', 0);
  },

  triggerAmbientAudio: function(asset) {
    var that = this;
    var audio = asset.el[0];

    var src = location.protocol + '//' + window.location.hostname + '/' + $(audio).attr('audio-src');
    var masterAudio = this.audio_master[0];

    if (!that.assetIsLive(masterAudio)) {
      //console.log("starting ", src);
      if (masterAudio.src !== src) {
        masterAudio.src = src;
      }
      if (that.muted == true){
        masterAudio.volume = 0;
      } else {
        masterAudio.volume = 1;
      }
      masterAudio.play();
      that.live_assets.push(masterAudio);
    } else {
      //console.log('playing ', src);
    }
  },

  stopAmbientAudio: function(asset) {
    var that = this;
    var audio = asset.el[0];
    var masterAudio = this.audio_master[0];
    var src = location.protocol + '//' + window.location.hostname + '/' + $(audio).attr('audio-src');
    asset.src = src;

    if (that.assetIsLive(asset)) {
      masterAudio.pause();
      // remove it from the live assets list
      this.live_assets = $.grep(that.live_assets, function(a,i) {
        return a.src === masterAudio.src;
      }, true);
    }
  },

  triggerVideo: function(asset) {
    var that = this;
    var container = $(asset.el).get(0);
    var video = $(container).find('video').get(0);

    if (!that.assetIsLive(container)) {
      $(asset.bgDiv).addClass('fixed');
      $(container).addClass('fixed');
      $(container).attr('src',  $(container).attr('data-src'));
      
      //console.log('chapter title playing ' + $(container).attr('src'));

      var video = this.createVideoElement(asset, container);
      video.load();
      that.loopEnd = video.duration;

      // only play if this is not a slide video
      if (!$(container).parents('.slideshow').length > 0) {
        if (that.muted == true){
          video.volume = 0;
        } else {
          video.volume = 1;
        }
        video.play();
      }

      // only manually loop if this is chrome browser
      if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) { 
        that.startVideoLoop(video);
      } 

      that.live_assets.push(container);
    }
  },

  stopVideo: function(asset) {
    var that = this;
    var container = asset.el.get(0);
    var video = $(container).find('video').get(0);

    if ((typeof video !== "undefined") && (that.assetIsLive(container))) {
      video.pause();
      that.stopVideoLoop(video);
      $(video).removeClass('fixed');
      $(asset.el.bgDiv).removeClass('fixed');

      // remove it from the live assets list
      this.live_assets = $.grep(that.live_assets, function(a,i) {
        return $(a).attr('src') === $(video).attr('src');
      }, true);
      // we need to set video src = '' and remove video element
      // due to known bug with chrome
      video.src = '';
      $(video).remove();
    }
  },
  
  startVideoLoop: function(video) {
    var that = this;
    //console.log('starting video loop', video.duration);
    this.stopVideoLoop();
    this.loopCheck = setInterval(function() {
      if (video.currentTime >= video.duration) {
        video.load();
        if (that.muted == true){
          video.volume = 0;
        } else {
          video.volume = 1;
        }
        video.play();
      }
    }, 100);
    return true;
  },

  stopVideoLoop: function(video) {
    clearInterval(this.loopCheck);
    this.loopCheck = false;
  },

  createVideoElement: function(asset, container) {
    var that = this;
    var src = $(container).attr('data-src');
    var poster = $(container).attr('data-poster');
    var controls = (asset.type === 'slideshow-video') ? ' controls ' : '';
    var autoplay = '';
    var loop = '';
    var canPlayVideo = false;
    
    if (that.iOS) {
      controls = ' controls ';
    }

    if ((navigator.userAgent.toLowerCase().indexOf('chrome') > -1) ||
        (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)) {
      autoplay = ' autoplay ';
      loop = ' loop="loop" ';
    }
   
    // do not autoplay videos in bx-slider (or real slideshows) 
    if ($(container).parents('.slideshow').length > 0) {
      autoplay = '';
    }

    // need to adjust video tag for browser
    if (Modernizr.video) {
      if (Modernizr.video.webm) {
    	// chrome and firefox
        $(container).html('<video class="fixed" ' + loop + ' preload="none" src="' + src + '" ' + autoplay + controls + ' poster="' + poster + '"></video>"');
        canPlayVideo = true;
      } else if (Modernizr.video.h264){
      // safari
        $(container).html('<video class="fixed" ' + loop + autoplay + controls + ' poster="' + poster + '><source src="' + src + '" /></video>"');
        canPlayVideo = true;
      }
    }
   
    // if we are able to write the video element, then remove the background image 
    if (canPlayVideo) {
      // console.log('attempting to remove background image');
      $(container).parent().find('.bgContainer').attr('style', '');
    }

    return video = $(container).find('video').get(0);
  },

  assetIsLive: function(asset) {
    var results = $.grep(this.live_assets, function(a) {
        return $(a).attr('src') === $(asset).attr('src');
    });

    if (results.length < 1) {
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
      if (that.iOS == true){
        if ($(this).find('table')){
          $('lead-video').remove();
        }
      } else {
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
      }

    });
  },

  loadSlideshowAssets: function() {
    var that = this;
    $('.slideshow').each(function(){
      var par = null;
      var parPos = $(this).position().top;
      var parHeight = $(this).height();
      var parBot = ((parPos + parHeight) - 10);
      var bgDiv = $(this).find('.bgContainer');

      // videos
      $(this).find('.lead-video').each(function(){
        $(this).removeClass('fixed');
        var asset = {
          type: 'slideshow-video',
          el: $(this),
          top: parPos,
          bottom: parBot,
          bgDiv: bgDiv
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
      if ($(this).attr('audio-src')) {
        var fullTop = $(this).position().top;
        var fullBot = $(this).height();
        var fullSize = fullTop + fullBot;
        var asset = {
          type: 'ambient-audio',
          el: $(this),
          src: $(this).attr('audio-src'),
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
  options = {
    'ambientAudio': true,
    'chapterTitleVideo': true,
    'shutter': true,
  };
  storyTeller.init(options, function() {
    // do whatever we want to do after the storyTeller init
    // console.log(storyTeller.assets);
    // console.log('storyTeller loaded');
  });

});
