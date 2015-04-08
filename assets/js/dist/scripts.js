window.sm = {
    controller: null,

    init: function() {
        this.controller = new ScrollMagic.Controller({
            globalSceneOptions: {
                triggerHook: "onLeave"
            }
        });

        this.initStickyImages();
        this.initSlideshows();
        this.initHorizontalSlideshows();
        this.initParallaxes();
        this.initVideos();
    },

    initVideos: function() {

        $('.video-container').each(function() {
            var thisId = '#' + $(this).attr("id");

            var contentHeight = $(this).parent().find(".content").outerHeight();
            var duration = contentHeight > longform.wh ? contentHeight - longform.wh : longform.wh;

            var scene = new ScrollMagic.Scene({
                    triggerElement: thisId,
                    duration: duration

                })
                .setPin(thisId, {
                    pushFollowers: false
                })
                .on("enter", longform.playVideo)
                .on("leave", longform.stopVideo)
                .addIndicators({
                    name: thisId
                }) // add indicators (requires plugin)
                .addTo(sm.controller);
        });

    },

    initStickyImages: function() {

        $('.sticky-image .bg-image').each(function() {
            var thisId = '#' + $(this).attr("id");
            var contentHeight = $(this).parent().find(".content").outerHeight();
            var duration = contentHeight > longform.wh ? contentHeight - longform.wh : longform.wh;

            var scene = new ScrollMagic.Scene({
                    triggerElement: thisId,
                    duration: duration

                })
                .setPin(thisId, {
                    pushFollowers: false
                })
                .addIndicators({
                    name: thisId
                }) // add indicators (requires plugin)
                .addTo(sm.controller);
        });

    },

    initSlideshows: function() {

        $('.slideshow .bg-image:not([data-animate="no"])').each(function() {
            var thisId = '#' + $(this).attr("id");

            var scene = new ScrollMagic.Scene({
                    triggerElement: thisId,
                    duration: longform.wh

                })
                .setPin(thisId, {
                    pushFollowers: false
                })
                .addIndicators({
                    name: thisId
                }) // add indicators (requires plugin)
                .addTo(sm.controller);
        });

    },

    initHorizontalSlideshows: function() {





        $('.slideshow-horizontal').each(function() {
            var thisId = '#' + $(this).attr("id");


            // build tween
            var tween = new TimelineMax();

            $(this).find('.bg-image:not([data-animate="no"])').each(function() {
                var elemId = '#' + $(this).attr("id");
                tween.add(TweenMax.to(elemId, 9, {
                    transform: "translateX(0)"
                }));
            });



            var scene = new ScrollMagic.Scene({
                    triggerElement: thisId,
                    duration: '100%'

                })
                .setTween(tween)
                .setPin(thisId, {
                    pushFollowers: true
                })
                .addIndicators({
                    name: thisId
                }) // add indicators (requires plugin)
                .addTo(sm.controller);
        });

    },


    initParallaxes: function() {

        $('.parallax').each(function() {
            var thisId = '#' + $(this).attr("id");

            var scene = new ScrollMagic.Scene({
                    triggerHook: "onEnter",
                    triggerElement: thisId,
                    duration: '200%'
                })
                .setTween(thisId + ' > .bg-image', {
                    top: "20%",
                    ease: Linear.easeNone
                })
                .addIndicators({
                    name: thisId
                }) // add indicators (requires plugin)
                .addTo(sm.controller);
        });

    }





};
window.longform = {
    wh: null,

    init: function() {
        this.wh = $(window).height();

        this.prepareStickyBgImages();

        this.prepareSlideshows();

        this.prepareParallaxes();

        this.prepareNavAnchors();

        this.prepareVideos();
    },

    playVideo: function(e) {
        var element = e.target.triggerElement();
        var elementId = $(element).attr('id');
        var container = $('#'+elementId);


        var src = container.data("src");

        container.html('<video  loop="loop" preload="none" src="' + src + '" autoplay ></video>"');
        container.css("background-image", 'none');
    },
    stopVideo: function(e) {
        var element = e.target.triggerElement();
        var elementId = $(element).attr('id');
        var container = $('#'+elementId);
        container.html('');
        container.css('background-image', 'url(' + container.data("poster") + ')');

    },

    prepareVideos: function() {

        var counter = 0;
        $('.video-container').each(function() {
            $(this).attr("id", "video" + counter++);
            $(this).css('background-image', 'url(' + $(this).data("poster") + ')');

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

        counter = 0;
        $('.slideshow-horizontal').each(function() {
            $(this).attr('id', 'slideshow-horizontal' + counter++);

            $(this).find('.bg-image').each(function(){
                $(this).attr('id', 'slideshowHorizontalImage' + counter++);
            });

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

$(document).ready(function(){
  longform.init();

  sm.init();
});

