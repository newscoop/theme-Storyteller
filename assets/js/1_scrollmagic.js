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

        this.initParallaxes();
        this.initVideos();

    },

    initVideos: function() {

        $('.video-container').each(function() {
            var thisId = '#' + $(this).attr("id");

            var contentHeight = $(this).parent().find(".content").outerHeight();
            var duration = contentHeight > longform.wHeight*2 ? contentHeight : longform.wHeight*2;

            var scene = new ScrollMagic.Scene({
                    triggerElement: thisId,
                    duration: duration

                })
                .setPin(thisId, {
                    pushFollowers: false
                })
                .addTo(sm.controller);
        });

    },

    initStickyImages: function() {

        $('.sticky-image .bg-image').each(function() {
            var thisId = '#' + $(this).attr("id");
            var contentHeight = $(this).parent().find(".content").outerHeight();
            var duration = contentHeight > longform.wHeight*2 ? contentHeight : longform.wHeight*2;



            var scene = new ScrollMagic.Scene({
                    triggerElement: thisId,
                    duration: duration

                })
                .setPin(thisId, {
                    pushFollowers: false
                })
                .addTo(sm.controller);
        });

    },

    initSlideshows: function() {

        $('.slideshow .bg-image:not([data-animate="no"])').each(function() {
            var thisId = '#' + $(this).attr("id");

            var scene = new ScrollMagic.Scene({
                    triggerElement: thisId,
                    duration: longform.wHeight

                })
                .setPin(thisId, {
                    pushFollowers: false
                })
                .addTo(sm.controller);
        });

    },




    initParallaxes: function() {

        $('.parallax').each(function() {
            var thisId = '#' + $(this).attr("id");

            var scene = new ScrollMagic.Scene({
                    triggerHook: "onEnter",
                    triggerElement: thisId,
                    duration: '100%'
                })
                .setTween(thisId + ' > .bg-image', {
                    top: "60%",
                    ease: Linear.easeNone
                })
                .addTo(sm.controller);

                scene = new ScrollMagic.Scene({
                        triggerHook: "onEnter",
                        triggerElement: thisId,
                        duration: '100%'
                    })
                    .setTween(thisId + ' > .content', {
                        top: "50%",
                        ease: Linear.easeNone
                    })
                    .addTo(sm.controller);


        });

    }

};
