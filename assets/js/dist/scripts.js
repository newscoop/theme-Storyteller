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
            var duration = contentHeight > longform.wh ? contentHeight - longform.wh : longform.wh;

            console.log(duration+' '+thisId);

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

        this.setupSnapping();
    },

    setupSnapping : function(){

        $(document).scrollsnap({
                snaps: '.snap',
                proximity: longform.wh/4,
                latency : 150,
                easing: 'swing'
            });

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
window.blueimpGallery = {

    init: function() {

        if (typeof galleryLinksContainer !== 'undefined') {



            // gallery id update in case if we more than one gallery
            if (galleryLinksContainer.length > 0) {

                $(".slideshow-horizontal").each(function(i, item) {
                    $(item).find(".blueimp-gallery-carousel").attr('id', 'blueimp-image-carousel_' + i);
                    $(item).find('*[data-gallery]').attr('data-gallery', i);

                });
            }

            $.each(galleryLinksContainer, function(i, item) {


                var gallery = blueimp.Gallery(item, {
                    container: '#blueimp-image-carousel_' + i,
                    carousel: true,
                    startSlideshow: false,
                    stretchImages: 'cover',

                    onslide: function(index, slide) {

                        var galleryContainer = this.options.container;

                        var caption = '';
                        caption += this.list[index].title;

                        if (this.list[index].photographer.length > 0) {
                            caption += '<span>(photo: ';
                            caption += this.list[index].photographer;
                            caption += ')</span>';
                        }

                        $(galleryContainer).parent().find(".slide-caption").html(caption);

                    }
                });



            }); // each end
        }

    },


    youtube_parser : function(url) {
          var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
          var match = url.match(regExp);
          if (match && match[7].length == 11) {
              return match[7];
          } else {
              return false;
          }
      },

      vimeo_parser : function(url) {

          var regExp = /http:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;

          var match = url.match(regExp);

          if (match) {
              return match[2];


          } else {
              return false;
          }

      },

      vimeo_thumb : function(vNumber) {
         var res;
         $.ajax({
              url: 'http://vimeo.com/api/v2/video/' + vNumber + '.json',
              success: function(result) {

                  res = result[0].thumbnail_large;
              },
              error: function(result) {
                  res  = false;
              },
              async:false
          });
         return res;

      }

}
window.preloader = {

    init: function() {

        // preloading image for preloader :)
        var img = new Image();
        $(img).on('load', function() {
            $("#loader-image").css("backgroundImage", "url(" + this.src + ")").fadeIn("slow");
        });

        var loaderImgSrc = $("#loader-image").data("src");
        if (loaderImgSrc) img.src = loaderImgSrc;

    },

    destroy: function() {

        //preloader remove
        $("#loader-wrapper").fadeOut("fast", function() {
            $(this).remove();
        });

    }
}
$(document).ready(function() {

    preloader.init();

    longform.init();

    blueimpGallery.init();

});

window.onload = function() {
    console.log("document loaded");

    sm.init();

    preloader.destroy();

};