window.longform = {
    wHeight: null,
    wWidth: null,
    imagesSize: null,
    muted: false,
    playingVideo: false,
    loopingVideo: false,
    playingAudio: false,

    init: function() {

        this.setWindowSize();

        window.onresize = function(e) {
            longform.setWindowSize();
            longform.prepareBgImages();
        };

        this.prepareBgImages();

        this.prepareParallaxes();

        this.prepareNavAnchors();

        this.setupSnapping();

        this.prepareAudios();

        this.bindAudioEvents();

        this.bindEmbedEvents();

        var that = this;
        if (!isMobile.any) {
            that.prepareVideos();

            $(window).load(function() {
                that.bindVideoEvents();
            });
        }


    },


    setWindowSize: function() {
        longform.wHeight = $(window).height();
        longform.wWidth = $(window).width();
    },


    setupSnapping: function() {

        $(document).scrollsnap({
            snaps: '.snap',
            proximity: longform.wHeight / 4,
            latency: 150,
            easing: 'swing',
            offset: 0
        });

    },


    ////   trzeba obczaić eventy i podpiać pod button i przekazać targety



    playVideo: function($target) {

        var element = $target.find(".video-container");
        var elementId = element.attr('id');
        var container = $('#' + elementId);
        var loop = container.data("loop");
        var src = container.data("src");
        var video = null;
        var $playButton = $target.find(".pauseplay");


        if (!longform.playingVideo) {

            // pause/play button state
            $playButton.addClass("playing");

            //determine best format based on browser / device
            if (Modernizr.video) {

                if (Modernizr.video.webm) {
                    // chrome & firefox
                    container.html('<video style="display:none" preload="none" src="' + src + '" ></video>"');
                } else if (Modernizr.video.h264) {
                    // safari
                    container.html('<video style="display:none"><source src="' + src + '" /></video>"');
                }

                // TODO: pause ambient audio here so video audio doesn't play over it
                video = container.find('video').get(0);

                $(video).attr('autoplay', 'autoplay');


                if(loop){
                    // chrome has issue with loop which causes constant video loading
                    // manually loop if this is chrome
                    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
                        $(video).bind('ended', function() {
                            this.currentTime = 0.1;
                            this.play();
                        });
                    } else {
                        $(video).attr('loop', 'loop');
                    }
                }else{
                    $(video).bind('ended', function() {
                        $playButton.removeClass("playing");
                    });

                }
                video.load();

                // set the audio state before we start playing
                if (localStorage.getItem('muted')) {
                    video.volume = 0;
                } else {
                    video.volume = 1;
                }

                video.oncanplay = function() {

                    video.play();

                    // hide background image
                    container.css("background-image", 'none');
                    $(video).fadeIn("fast", function(){

                    });
                };

                longform.playingVideo = true;
            }
        }

    },

    stopVideo: function($target) {
        var element = $target.find(".video-container");
        var elementId = $(element).attr('id');
        var container = $('#' + elementId);
        var $playButton = $target.find(".pauseplay");

        if (longform.playingVideo) {

            // pause/play button state
            $playButton.removeClass("playing");

            video = $(container).find('video').get(0);
            video.pause();
            video.src = '';
            $(video).remove();

            container.html('');
            container.css('background-image', 'url(' + container.data("poster") + ')');
            longform.playingVideo = false;
        }

    },

    prepareVideos: function() {

        var counter = 0;
        $('.video-container').each(function() {

            // setting data-target for pause/play buttons
            var $part = $(this).parent(".part");
            var partId = $part.attr("id");
            $part.find('.pauseplay').attr('data-target', "#"+partId);


            $(this).attr("id", "video" + counter++);
            $(this).css('background-image', 'url(' + $(this).data("poster") + ')');

        });

        // select appropriate src for browser/device
        $('.video-container').each(function() {
            var container = $(this);
            var src = null;
            $(container).children('source').each(function() {
                src = $(this).attr('data-src');
                // check for mp4 or webm capability
                if (Modernizr.video) {
                    // chrome > 30 can handle both mp4 and webm but mp4 is used more widely
                    if (Modernizr.video.webm) {
                        // check to see if the last character is a '4'
                        if (src.substr(-1) == 'm') {
                            src = src;
                            return false;
                        }
                    } else if (Modernizr.video.h264) {
                        // check to see if the last digit is an 'm'
                        if (src.substr(-1) == '4') {
                            src = src;
                            return false;
                        }
                    }
                }
            });
            $(container).attr('data-src', src);
        });

},

prepareAudios: function() {

    var counter = 0;
    $('.ambient').each(function() {
        var articleContainer = $(this).next('article');
        var sectionContainer = $(this).prev('section');
        var containerType = $(this).data('container');

        $(this).attr("id", "audio" + counter++);

        if (containerType === 'article') {
            articleContainer.addClass('ambient-container');
            articleContainer.addClass('inview');
            articleContainer.attr('ambient-src', $(this).data('src'));
        } else {
            sectionContainer.addClass('ambient-container');
            sectionContainer.addClass('inview');
            sectionContainer.attr('data-ambient-src', $(this).data('src'));
        }

    });

},

playAudio: function(e) {

    var element = $(e.target);
    var src = $(element).data("ambient-src");
    var audio = $('#master-audio')[0];

    if (!longform.playingAudio) {
        audio.src = location.protocol + '//' + window.location.hostname + src;
        audio.play();
        longform.playingAudio = true;
    }

},

stopAudio: function(e) {
    var audio = $('#master-audio')[0];

    if (longform.playingAudio) {
        audio.pause();
        longform.playingAudio = false;
    }
},

bindVideoEvents: function() {

    $('.st-video').each(function() {
        $(this).bind('inview', function(event, visible) {

            if (visible) {
                longform.playVideo($(event.target));
            } else {
                longform.stopVideo($(event.target));
            }
        });
        $(this).data('inview', false);
    });


    $('.st-content-video').each(function() {
        $(this).bind('inview', function(event, visible, visiblePartX, visiblePartY) {

            if (visible) {

                if (visiblePartY == 'bottom')
                    longform.playVideo($(event.target));

            } else {
                longform.stopVideo($(event.target));

            }
        });
        $(this).data('inview', false);
    });


        //pause play buttons events
        $('.pauseplay').on('click', function() {
            var target = $(this).data("target");
            var $target = $(target);
            var playing = $(this).hasClass("playing");
            var paused = $(this).hasClass("paused");
            var video = $target.find('video').get(0);

            if(playing){
                //is currently playing
                $(this).removeClass("playing").addClass("paused");
                video.pause();
            } else if(paused) {
                // is paused
                video.play();
                $(this).removeClass("paused").addClass("playing");
            }else{
                // not playing, not paused, ended
                video.currentTime = 0.01;
                video.play();
                $(this).addClass("playing");
            }
        });


    },

    bindAudioEvents: function() {

        $('.ambient-container').each(function() {

            $(this).bind('inview', function(event, visible) {
                if (visible) {
                    longform.playAudio(event);
                } else {
                    longform.stopAudio(event);
                }
            });
        });

    },

    prepareNavAnchors: function() {
        var counter = 0;
        $('.part').each(function() {
            $(this).attr("id", "part" + counter++);
            $(this).find('.nextPart').data("next", "part" + counter);

        });

        $('.nextPart').bind('click', function(e) {
            e.preventDefault();
            var nextPart = $('#' + $(this).data("next"));

            var pos = nextPart.offset().top;
            $('html, body').animate({
                scrollTop: pos
            }, 300);

        });

    },

    prepareBgImages: function() {

        var refresh = false;
        var dataSrc = null;

        if (this.wWidth > 1024 && this.imagesSize != 'full') {
            refresh = true;
            this.imagesSize = 'full';
            dataSrc = 'src';

        } else if (this.wWidth > 600 && this.imagesSize != 'medium') {
            refresh = true;
            this.imagesSize = 'medium';
            dataSrc = 'srcmedium';
        } else if (this.wWidth <= 600 && this.imagesSize != 'phone') {
            refresh = true;
            this.imagesSize = 'phone';
            dataSrc = 'srcphone';
        }


        if (refresh) {
            var counter = 0;
            $('.bg-image').each(function() {
                $(this).attr('id', 'BgImage' + counter++);
                $(this).css('background-image', 'url(' + $(this).data(dataSrc) + ')');
            });
        }
    },



    prepareParallaxes: function() {
        var counter = 0;
        $('.parallax').each(function() {
            $(this).attr('id', 'parallax' + counter++);
        });
    },

    bindEmbedEvents: function() {

        $('.embed').each(function() {
            var _that = $(this);
            _that.bind('inview', function(event, visible) {

                if (visible) {
                    _that.find('iframe').fadeIn();
                } else {
                    _that.find('iframe').fadeOut();
                    _that.find('.embed_overlay').show();
                }
            });
            $(this).data('inview', false);
        });


        $('.embed_overlay').on('mousedown', function(){
            $(this).hide();
            console.log("mouse down");
        });
    }
};