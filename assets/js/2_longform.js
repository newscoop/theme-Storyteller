window.longform = {
    wHeight: null,
    wWidth: null,
    imagesSize: null,
    muted: false,
    playingVideo: false,
    loopingVideo: false,

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

        this.prepareVideos();

        this.bindVideoEvents();
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
            easing: 'swing'
        });

    },

    playVideo: function(e) {

        var element = $(e.target).find(".video-container");
        var elementId = element.attr('id');
        var container = $('#' + elementId);
        var src = container.data("src");
        var video = null;

        if (!longform.playingVideo) {
            // hide background image
            container.css("background-image", 'none');

            //determine best format based on browser / device
            if (Modernizr.video) {
                if (Modernizr.video.webm) {
                    // chrome & firefox
                    container.html('<video preload="none" src="' + src + '"></video>"');
                } else if (Modernizr.video.h264) {
                    // safari
                    container.html('<video><source src="' + src + '" /></video>"');
                }

                // TODO: pause ambient audio here so video audio doesn't play over it
                video = container.find('video').get(0);

                $(video).attr('autoplay', 'autoplay');

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
                video.load();
                video.play();

                longform.playingVideo = true;
            }
        }

    },

    stopVideo: function(e) {
        var element = $(e.target).find(".video-container");
        var elementId = $(element).attr('id');
        var container = $('#' + elementId);

        if (longform.playingVideo) {
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
        $('.st-video .video-container').each(function() {
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

    bindVideoEvents: function() {

        // setting offset so playVideo() will be fired one screen height before it is in view
        $('.st-video').attr('data-offset', longform.wHeight);

        $('.st-video').bind('inview', function(event, visible) {
            if (visible) {
                longform.playVideo(event);
            } else {
                longform.stopVideo(event);
            }
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




    }

};