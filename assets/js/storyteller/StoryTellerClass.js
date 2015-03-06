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
  menuWidth: null,
  contentWidth: null,
  contentHeight: null,
  iOS: null,
  muted: false,
  fullScreenVideo: false,
  
  init: function(options, callback) {
    var self = this;

    // setup screen stuff
    this.resizeWindow();
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
    this.doBgContainers();
    
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
      self.resizeWindow();

      self.doSlideShows();
      self.doChapterTitleText();
      self.doChapterTitleVideo();
      self.doFullScreenObjects();
      self.doBgContainers();
      self.doLeadImages();
      self.resizeTimer = setTimeout(function() {
        self.onScroll();
      }, 100);
    });

    // set scroll function
    $(window).scroll(function() {
      self.onScroll();
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
        self.doMainNav();
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
    this.menuHeight = $('header').height();
    this.menuWidth = $('header').width();
    this.winHeight = $(window).height();
    this.winWidth = $(window).width();
  
    // find out if menu is top nav, or side nav
    if (this.menuHeight > this.menuWidth) {
      this.contentWidth = this.winWidth - this.menuWidth;
      this.contentHeight = this.winHeight;
    } else {
      this.contentHeight = this.winHeight - this.menuHeight;
      this.contentWidth = this.winWidth;
    }

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

    $('header nav a').bind('click', function(event){
      var src = $(this).attr('href').replace('#','');
      var target = ($('[name=' + src + ']').position().top);
      // fade transition
      // find section at current scroll top
      $('section').each(function() {
        var position = $(this).position().top - $(window).scrollTop();
        if ($(this).position().top <= 0) {
          console.log('below threshhold', $(this).attr('name'));
          $('header nav')
        } else {
          console.log('above threshhold', $(this).attr('name'));
        }
        if (position <= 0) {
          // fade it
          $(this).fadeOut("slow", function() {
            $('body, html').scrollTop(target);
            $(this).fadeIn("slow", function() {
              // console.log($(this).attr('name')/*, $(this).attr('data-name'), $(this).position().top*/);
            });
          });
        }
      });
      return false;
    });

    // mute button
    // check to see what the value of the mute status is and apply the state on load
    if (localStorage.getItem('muted')) {
      self.muted = true;
      $('.mute').addClass('muted');
      console.log('muted = ', localStorage.getItem('muted'));
    }
    $('.mute').bind('click', function(){
      if (self.muted === true){
        $(this).removeClass('muted');
        self.muted = false;
        localStorage.removeItem('muted');
        $('video, audio').each(function(){
          $(this)[0].volume = 1;
        });
      } else {
        self.muted = true;
        localStorage.setItem('muted', true);
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
    var j = 0;
    $('article > section, .slides > li').each(function(){
      var matchName = $(this).not('.bx-clone').attr('name');
      var fullTop = $(this).position().top;
      var fullBot = $(this).height();
      var fullSize = fullTop + fullBot;
      ++i;
    });
    $('nav li a').each(function(){
      var parEl = $(this).parent();
      var navId = $(this).attr('href').replace('#','');
      ++j;
    });
  },

  doBgContainers: function() {
    $('.bgContainer').width(this.contentWidth);
    $('.bgContainer').height(this.contentHeight);
  },

  doLeadImages: function() {
    $('.lead-image').width((this.contentWidth / 2));
    $('.lead-image').parent('li').width(this.contentWidth);
  },

  doSlideShows: function() {
    var self = this;
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

    $('.slides').css('margin', '0 auto');
    $('.slides').find('li').width('100%');
    $('.slides').find('li').children().css('margin', 'auto');
    $('.slideshow.full, .bx-viewport').attr('min-height', self.winHeight + ' !important');

    // apply margins to slideshows if needed
    if (self.menuWidth < self.menuHeight) {
      $('.bx-wrapper').css({
        'margin-left': self.menuWidth,
        'margin-right': self.menuWidth
      });

      $('.bx-viewport').css({
        'margin': '0 auto'
      });
    }

    // full screen shutter slides
    $('.shutter.full .slides').each(function(){
      var listItems = $(this).children('li');
      var lastListItem = $(this).children('li').last();
      lastListItem.addClass('end');
      listItems.css({
        'min-height': self.winHeight
      });
      listItems.find('figure').each(function(){
        $(this).css({
          'min-height' : self.winHeight
        });
        if ($(this).parent().hasClass('left-text') || $(this).parent().hasClass('right-text')){
          $(this).find('figcaption').css({
            'min-height' : self.winHeight
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
    var self = this;
    $('section').each(function(){
      if ($(this).attr('class')){
        var paddingTop = ($(this).css('padding-top'));
        paddingTop = paddingTop.replace('px','');
        var paddingBottom = ($(this).css('padding-bottom'));
        paddingBottom = paddingBottom.replace('px','');
        var paddingVertical = parseInt(paddingTop) + parseInt(paddingBottom);
        $(this).css({
          'min-height': self.contentHeight + 'px',
          'width': self.contentWidth
        });
      }
      if ($(this).hasClass('chapter-title')){
        var title = $(this).find('.title');

        // this is only need with menu on top
        if (self.menuWidth > self.menuHeight) {
          title.css({
            'margin-top': (self.menuHeight * 2) + 'px'
          });
        }

        // TODO: only run this once, ceck if it has been added first
        if (!title.next().hasClass('continue')) {
          title.after('<span class="continue">Click here to continue</span>');
        }
      }
    });
  },

  doChapterTitleVideo: function(){
    var self = this;
    $('.video').each(function(){
      if (self.winHeight > self.winWidth){
        $(this).width('auto');
        $(this).height(self.contentHeight);
      } else {
        $(this).width(self.contentWidth);
        $(this).height('auto');
      }

    });
  },

  doFullScreenObjects: function() {
    var self = this;
    $('.full').each(function(){
      $(this).find('.lead-video').each(function(){
        $(this).removeClass('fixed');
        if (self.winHeight > self.winWidth){
          $(this).width('auto');
          $(this).height(self.contentHeight);
        } else {
          $(this).width(self.contentWidth);
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
    var self = this;
    if ($('audio.ambient')[0]){
      $('body').append('<audio id="audioMaster" loop src="null" />');
      self.audio_master = $('#audioMaster');
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
    var self = this;
    currViewport = this.getViewport();

    // activeNav
    this.doActiveNav(currViewport);

    // trigger assets self come into view
    for (var a in this.assets) {
      var asset = this.assets[a];

      // chapter-title-videos
      if (asset.type === 'chapter-title-video') {
        if (((currViewport + self.contentHeight) >= asset.top) && (currViewport <= (asset.bottom + self.contentHeight))) {
          self.triggerVideo(asset);
        } else {
          if (!self.fullScreenVideo) {
            self.stopVideo(asset);
          }
          $(asset.el).find('.fixed').removeClass('fixed');
          $(asset.el).removeClass('fixed');
        }
      }

      // slideshow-videos
      if (asset.type === 'slideshow-video') {
        if (((currViewport + self.contentHeight) >= asset.top) && (currViewport <= (asset.bottom + self.contentHeight))) {
          self.triggerVideo(asset);
        } else {
          if (!self.fullScreenVideo) {
            self.stopVideo(asset);
          }
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
        if (((currViewport + self.contentHeight) >= asset.top) && (currViewport <= asset.fullsize)) {
          self.triggerAmbientAudio(asset);
        } else  {
          self.stopAmbientAudio(asset);
          $(asset.el).find('.fixed').removeClass('fixed');
          $(asset.el).removeClass('fixed');
        }
      }

      // shutters
      if (asset.type === 'shutter') {
        if (((currViewport + self.contentHeight) >= asset.top) && ((currViewport + self.contentHeight) <= asset.bottom) && (currViewport <= asset.fullsize)) {
          if (currViewport >= asset.top) {
            self.triggerShutter(asset);
          } else {
            self.stopShutter(asset);
          }
        } else {
          $(asset.el).find('.fixed').removeClass('fixed');
          $(asset.el).removeClass('fixed');
        }
      }

    }

  },

  triggerShutter: function(asset) {
    var self = this;
    var masterAudio = this.audio_master[0];

    $(asset.el).find('.lead-video').each(function(){
      var container = $(this).get(0);
      var video = $(container).find('video').get(0);

      if (!self.assetIsLive(container)) {
        //console.log('shutter playing ' + $(container).attr('data-src'));

        $(container).addClass('fixed');
        $(container).attr('src',  $(container).attr('data-src'));

        var video = self.createVideoElement(asset, container);
        video.load();

        // only play if this is not a slide video
        // if (asset.type !== 'slideshow-video') {
        // if (!$(container).parents('.bx-wrapper').length > 0) {
        if (!$(container).parents('.slideshow').length > 0) {
          if (self.muted == true){
            video.volume = 0;
          } else {
            video.volume = 1;
          }
          masterAudio.pause();
          video.play();
        }

        // only manually loop if this is chrome browser
        if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
          self.startVideoLoop(video);
        }

        self.live_assets.push(container);

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
    var self = this;
    $(asset.el).find('.lead-video').each(function(){
      var container = $(this).get(0);
      var video = $(container).find('video').get(0);
      if (self.assetIsLive(container)) {

        //console.log($(container).attr('data-src'));

        video.pause();
        self.stopVideoLoop(video);
        // remove it from the live assets list
        self.live_assets = $.grep(self.live_assets, function(a,i) {
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
    var self = this;
    var audio = asset.el[0];

    var src = location.protocol + '//' + window.location.hostname + '/' + $(audio).attr('audio-src');
    var masterAudio = this.audio_master[0];

    if (!self.assetIsLive(masterAudio)) {
      //console.log("starting ", src);
      if (masterAudio.src !== src) {
        masterAudio.src = src;
      }
      if (self.muted == true){
        masterAudio.volume = 0;
      } else {
        masterAudio.volume = 1;
      }
      // check to see what the value of the mute status is and apply the state on load
      if (localStorage.getItem('muted')) {
        video.volume = 0;
      }
      masterAudio.play();
      self.live_assets.push(masterAudio);
    } else {
      //console.log('playing ', src);
    }
  },

  stopAmbientAudio: function(asset) {
    var self = this;
    var audio = asset.el[0];
    var masterAudio = this.audio_master[0];
    var src = location.protocol + '//' + window.location.hostname + '/' + $(audio).attr('audio-src');
    asset.src = src;

    if (self.assetIsLive(asset)) {
      masterAudio.pause();
      // remove it from the live assets list
      this.live_assets = $.grep(self.live_assets, function(a,i) {
        return a.src === masterAudio.src;
      }, true);
    }
  },

  triggerVideo: function(asset) {
    var self = this;
    var container = $(asset.el).get(0);
    var video = $(container).find('video').get(0);
    var masterAudio = (this.audio_master) ? this.audio_master[0] : null;

    if (!self.assetIsLive(container)) {
      $(asset.bgDiv).addClass('fixed');
      $(container).addClass('fixed');
      $(container).attr('src',  $(container).attr('data-src'));
      
      //console.log('chapter title playing ' + $(container).attr('src'));

      var video = this.createVideoElement(asset, container);
      video.load();
      self.loopEnd = video.duration;

      // only play if this is not a slide video
      if (!$(container).parents('.slideshow').length > 0) {
        if (self.muted == true){
          video.volume = 0;
        } else {
          video.volume = 1;
        }
        if (masterAudio) {
            masterAudio.pause();
        }
        // check to see what the value of the mute status is and apply the state on load
        if (localStorage.getItem('muted')) {
          video.volume = 0;
        }
        video.play();
      }

      // only manually loop if this is chrome browser
      if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) { 
        self.startVideoLoop(video);
      } 

      self.live_assets.push(container);
    }
  },

  stopVideo: function(asset) {
    var self = this;
    var container = asset.el.get(0);
    var video = $(container).find('video').get(0);

    if ((typeof video !== "undefined") && (self.assetIsLive(container))) {
      video.pause();
      self.stopVideoLoop(video);
      $(video).removeClass('fixed');
      $(asset.el.bgDiv).removeClass('fixed');

      // remove it from the live assets list
      this.live_assets = $.grep(self.live_assets, function(a,i) {
        return $(a).attr('src') === $(video).attr('src');
      }, true);
      // we need to set video src = '' and remove video element
      // due to known bug with chrome
      video.src = '';
      $(video).remove();
    }
  },
  
  startVideoLoop: function(video) {
    var self = this;
    //console.log('starting video loop', video.duration);
    this.stopVideoLoop();
    this.loopCheck = setInterval(function() {
      if (video.currentTime >= video.duration) {
        video.load();
        if (self.muted == true){
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
    var self = this;
    var src = $(container).attr('data-src');
    var poster = $(container).attr('data-poster');
    var controls = (asset.type === 'slideshow-video') ? ' controls ' : '';
    var autoplay = '';
    var loop = '';
    var canPlayVideo = false;
    var masterAudio = (this.audio_master) ? this.audio_master[0] : null;
  
    if (self.iOS) {
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
      // size the video
      if (self.winHeight > self.winWidth){
        $(container).find('video').height(self.winHeight);
      } else {
        $(container).find('video').width(self.winWidth);
      }
    }

    var video = $(container).find('video').get(0);
    $(video).bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e) {
      var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
      self.fullScreenVideo = state;
    });

    $(video).bind('play', function () {
      if (masterAudio) { 
        masterAudio.pause();
      }
    });

    return video;
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
    var self = this;
    $('.chapter-title').each(function(){
      var par = null;
      var parPos = $(this).position().top;
      var parHeight = $(this).height();
      var parBot = ((parPos + parHeight) - 10);
      var bgDiv = $(this).find('.bgContainer');

      // videos
      if (self.iOS == true){
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
          self.assets.push(asset);
        });
      }

    });
  },

  loadSlideshowAssets: function() {
    var self = this;
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
        self.assets.push(asset);
      });

    });
  },

  loadShutterAssets: function() {
    var self = this;
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
        self.assets.push(asset);
      });
    });
  },

  loadAudioAssets: function() {
    var self = this;
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
        self.assets.push(asset);
      }
    });
  },

  getViewport: function(){
    var currViewport = window.pageYOffset;
    return currViewport;
  },

  scrollTo: function(hash) {
    location.hash = '#' + hash;
  }
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
