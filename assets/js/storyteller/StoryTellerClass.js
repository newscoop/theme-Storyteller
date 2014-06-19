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
  audio_playing: [],
  video_playing: [],
  initialized: false,

  init: function(options, callback) {
    // TODO: check options to see if we should skip certain asset types
    this.loadChapterTitleAssets();
    this.loadShutterAssets();
    this.loadAudioAssets();

    console.log(this.assets);

    // call function to set scroll function
    $(window).scroll(this.onScroll());

    this.initialized = true;

    if (callback) {
      callback();
    }
  },

  onScroll: function() {
    var that = this;
    currViewport = this.getViewport();

    // trigger assets that come into view
    for (var asset in this.assets) {
      if ((currViewport >= asset.top) && (currViewport <= asset.bottom)) {
        // TODO: call triggerAsset function, and add asset to current playing assets
        console.log(asset);
      }
    }

    // TODO: stop playing assets that move out of view
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
          bottom: parBot
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
    console.log('triggering: ', asset);
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
