window.nav = {

    init: function() {

        $(".menu_open").on("click.nav", function() {
            $("body").toggleClass("paneOpen");
            if ($('body').hasClass('mobile')){
              $(".longform .nav").find('ul.active').each(function(){
                $(this).removeClass('active');
              });
            }
        });


        // mute button

        if (localStorage.getItem('muted')) {
          $('video, audio').each(function() {
              $(this)[0].volume = 0;
          });
          longform.muted = true;
          $('.mute').addClass('muted');
        }

        $('.mute').on('click', function(e) {
            e.preventDefault();

            if (localStorage.getItem('muted')) {
              localStorage.removeItem('muted');
            } else {
              localStorage.setItem('muted', true);
            }

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
            var moveTo = function(){
              $('body, html').animate({
                  scrollTop: target + 'px'
              }, 1000);
            };

            if ($('body').hasClass('mobile')){
              if ($(this).parent().parent().parent().is('nav')){
                // traverse the nav and remove all active classes
                var parSibEl = $(this).parent().siblings().find('ul.active');
                parSibEl.removeClass('active');
                var parEl = $(this).parent().find('ul');
                if (parEl.hasClass('active')){
                  parEl.removeClass('active');
                } else {
                  parEl.addClass('active');
                }
              }
              moveTo();
            } else {
              moveTo();
            }

        });

        //active navigation listener. Listen only when there is a navigation

        if ($('.nav').length) {

            $('.part').each(function() {
                var that = this;
                $(this).bind('inview', function(event, visible) {
                    if (visible) {
                        var artNumber = $(that).attr("name");

                        $('.nav a').removeClass("active");

                        var elem = $('.nav a[data-articleNumber="' + artNumber + '"]');
                        elem.addClass("active");

                        elem.parents('li.first-level').children('a').addClass('active')


                    }
                });
            });
        }
    }
}