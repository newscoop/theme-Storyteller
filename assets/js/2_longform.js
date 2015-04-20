window.longform = {
    wh: null,
    muted: false,

    init: function() {
        this.wh = $(window).height();

        this.prepareStickyBgImages();

        this.prepareSlideshows();

        this.prepareParallaxes();

        this.prepareNavAnchors();

        this.setupSnapping();

        this.prepareVideos();

        this.bindVideoEvents();
    },





    setupSnapping: function() {

        $(document).scrollsnap({
            snaps: '.snap',
            proximity: longform.wh / 4,
            latency: 150,
            easing: 'swing'
        });

    },

    playVideo: function(e) {

        var element = $(e.target).find(".video-container");
        var elementId = element.attr('id');
        var container = $('#' + elementId);
        var src = container.data("src");



        container.html('<video  loop="loop" preload="none" src="' + src + '" autoplay ></video>"');
        container.css("background-image", 'none');
    },
    stopVideo: function(e) {
        var element = $(e.target).find(".video-container");
        var elementId = $(element).attr('id');
        var container = $('#' + elementId);
        container.html('');
        container.css('background-image', 'url(' + container.data("poster") + ')');

    },

    prepareVideos: function() {

        var counter = 0;
        $('.st-video .video-container').each(function() {
            $(this).attr("id", "video" + counter++);
            $(this).css('background-image', 'url(' + $(this).data("poster") + ')');

        });

    },

    bindVideoEvents : function(){

        // setting offset so playVideo() will be fired one screen height before it is in view
        $('.st-video').attr('data-offset', longform.wh);

        $('.st-video').bind('inview', function (event, visible) {
           if (visible) {
            console.log("video visible");
             longform.playVideo(event);
           } else {

            console.log("video NOT visible");
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

    prepareStickyBgImages: function() {
        var counter = 0;
        $('.sticky-image .bg-image').each(function() {
            $(this).attr('id', 'stickyBgImage' + counter++);
            $(this).css('background-image', 'url(' + $(this).data("src") + ')');
        });
    },

    prepareSlideshows: function() {
        var counter = 0;
        $('.slideshow .bg-image, .slideshow-horizontal .bg-image').each(function() {
            $(this).attr('id', 'slideshowImage' + counter++);
            $(this).css('background-image', 'url(' + $(this).data("src") + ')');
        });



    },

    prepareParallaxes: function() {
        var counter = 0;
        $('.parallax').each(function() {
            $(this).attr('id', 'parallax' + counter++);
        });


        $('.parallax .bg-image').each(function() {
            $(this).css('background-image', 'url(' + $(this).data("src") + ')');
        });

    }

};