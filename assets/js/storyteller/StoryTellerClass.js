// remove this from all height values
var menuHeight = $('header').height();

// define global window height and width
var winHeight = $(window).height();
var winWidth = $(window).width();

// set function to refill those values when needed
var doWinDimensions = function(){
  winHeight = $(window).height();
  winWidth = $(window).width();
};

// set muted bool before calling it
var muted = false;

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

  init: function(options, callback) {
    var that = this;

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
      console.log(i);
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

    $('.slideshow.full, .bx-viewport').css({
      'min-height' : winHeight
    });

    // full screen shutter slides
    $('.shutter.full .slides').each(function(){
      var listItems = $(this).children('li');
      var lastListItem = $(this).children('li').last();
      lastListItem.addClass('end');
      listItems.css({
        'height': winHeight
      });
      listItems.find('figure').each(function(){
        $(this).css({
          'min-height' : winHeight
        });
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
    $('section').each(function(){
      if ($(this).attr('class')){
        var paddingTop = ($(this).css('padding-top'));
        paddingTop = paddingTop.replace('px','');
        var paddingBottom = ($(this).css('padding-bottom'));
        paddingBottom = paddingBottom.replace('px','');
        var paddingVertical = parseInt(paddingTop) + parseInt(paddingBottom);
        $(this).css({
          'min-height': winHeight + 'px',
          'width': winWidth
        });
      }
      if ($(this).hasClass('chapter-title')){
        var title = $(this).find('.title');
        title.css({
          'margin-top': (menuHeight * 2) + 'px'
        });
        title.after('<span class="continue">Click here to continue</span>');
      }
    });
  },

  doFullScreenObjects: function() {
    $('.full').each(function(){
      $(this).find('.lead-video').each(function(){
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
    $('.video-container').each(function(){
      var container = $(this);
      var src = null;
      var poster = null;
      $(container).children('source').each(function(){
        src = $(this).attr('data-src');
        poster = $(this).parent().attr('data-poster');
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

        //if (src.substr(-1) === '4'){
	//  console.log("i should be using ", src);
        //  src = src;
	//  return false;
        //}
      });
      console.log("using source " + src, " with poster " + poster);
      $(container).attr('data-src', src).attr('data-poster', poster);
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
          $(this).parent().parent().attr('data-src', src);
        } else {
          $(this).parent().attr('data-src', src);
        }
        //$(this).remove();
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
        if ((currViewport >= asset.top) && (currViewport <= asset.bottom)) {
          that.triggerVideo(asset);
        } else {
          that.stopVideo(asset);
          $(asset.el).find('.fixed').removeClass('fixed');
          $(asset.el).removeClass('fixed');
        }
      }

      // slideshow-videos
      if (asset.type === 'slideshow-video') {
        if ((currViewport >= asset.top) && (currViewport <= asset.bottom)) {
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
        if (((currViewport + winHeight) >= asset.top) && (currViewport <= asset.fullsize)) {
          that.triggerAmbientAudio(asset);
        } else  {
          that.stopAmbientAudio(asset);
          $(asset.el).find('.fixed').removeClass('fixed');
          $(asset.el).removeClass('fixed');
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
        console.log('shutter playing ' + $(container).attr('data-src'));

        $(container).addClass('fixed');
        $(container).attr('src',  $(container).attr('data-src')).attr('poster', $(container).attr('data-poster'));

        var video = that.createVideoElement(asset, container);
        video.load();

        // only play if this is not a slide video
      	// if (asset.type !== 'slideshow-video') {
      	// if (!$(container).parents('.bx-wrapper').length > 0) {
      	if (!$(container).parents('.slideshow').length > 0) {
          if (muted == true){
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

        console.log($(container).attr('data-src'));
	console.log(video);

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

    var src = src = location.protocol + '//' + window.location.hostname + '/' + $(audio).attr('data-src');
    var masterAudio = this.audio_master[0];

    //console.log(src, asset);

    if (!that.assetIsLive(masterAudio)) {
      if (masterAudio.src !== src) {
        masterAudio.src = src;
      }
      if (muted == true){
        masterAudio.volume = 0;
      } else {
        masterAudio.volume = 1;
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

    if (that.assetIsLive(masterAudio)) {
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
      
      console.log('chapter title playing ' + $(container).attr('src'));

      var video = this.createVideoElement(asset, container);
      video.load();
      that.loopEnd = video.duration;

      // only play if this is not a slide video
      //if (asset.type !== 'slideshow-video') {
      //if (!$(container).parents('.bx-wrapper').length > 0) {
      if (!$(container).parents('.slideshow').length > 0) {
        if (muted == true){
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
    } else {
      //console.log('video is already playing');
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
    console.log('starting video loop', video.duration);
    this.stopVideoLoop();
    this.loopCheck = setInterval(function() {
      if (video.currentTime >= video.duration) {
        video.load();
        if (muted == true){
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
    var src = $(container).attr('data-src');
    var controls = (asset.type === 'slideshow-video') ? ' controls ' : '';
    var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
    var autoplay = '';
    
    if (iOS) {
      controls = ' controls ';
    }

    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
      autoplay = ' autoplay ';
    }
   
    // do not autoplay videos in bx-slider (or real slideshows) 
    //if ($(container).parents('.bx-wrapper').length > 0) {
    if ($(container).parents('.slideshow').length > 0) {
      autoplay = '';
    }

    // need to adjust video tag for browser
    if (Modernizr.video) {
      if (Modernizr.video.webm) {
	// chrome and firefox
        $(container).html('<video class="fixed" loop="loop" preload="none" src="' + src + '" ' + autoplay + controls + '></video>"');
      } else if (Modernizr.video.h264){
	// safari
        $(container).html('<video class="fixed" loop="loop" ' + autoplay + controls + '><source src="' + src + '" /></video>"');
      }
    }
    return video = $(container).find('video').get(0);
  },

  assetIsLive: function(asset) {
    var results = $.grep(this.live_assets, function(a) {
        return $(a).attr('src') === $(asset).attr('src');
    });

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
      if ($(this).attr('data-src')) {
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
  options = {
    'ambientAudio': true,
    'chapterTitleVideo': true,
    'shutter': true,
  };
  storyTeller.init(options, function() {
    // do whatever we want to do after the storyTeller init
    //console.log(storyTeller.assets);
    console.log('storyTeller loaded');
  });

});
