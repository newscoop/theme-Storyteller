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