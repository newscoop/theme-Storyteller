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
            var duration = contentHeight > longform.wHeight ? contentHeight - longform.wHeight : longform.wHeight;


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
            var duration = contentHeight > longform.wHeight ? contentHeight - longform.wHeight : longform.wHeight;

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
                    duration: '200%'
                })
                .setTween(thisId + ' > .bg-image', {
                    top: "20%",
                    ease: Linear.easeNone
                })
                .addTo(sm.controller);
        });

    }





};
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
window.nav = {

    init: function() {

        $(".menu_open").on("click.nav", function() {
            $("body").toggleClass("paneOpen");
        });


        // mute button

        $('.mute').on('click', function(e) {
            e.preventDefault();

            if (longform.muted === true) {
                $(this).removeClass('muted');
                longform.muted = false;
                $('video, audio').each(function() {
                    $(this)[0].volume = 1;
                });
            } else {
                longform.muted = true;
                $(this).addClass('muted');
                $('video, audio').each(function() {
                    $(this)[0].volume = 0;
                });
            }

        });

        $(".longform .nav a").on("click.nav", function(e) {
            e.preventDefault();

            var src = $(this).attr('href').replace('#', '');
            var target = ($('[name=' + src + ']').position().top + 1);

            $('body, html').animate({
                scrollTop: target + 'px'
            }, 1000);

        });
    }
}
$(document).ready(function() {

   // preloader.init();

    longform.init();

    blueimpGallery.init();

    nav.init();

});

window.onload = function() {
    console.log("document loaded");

    sm.init();

    preloader.destroy();

    $(window).trigger('checkInView');
};
