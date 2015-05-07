window.nav = {

    init: function() {

        $(".menu_open").on("click.nav", function() {
            $("body").toggleClass("paneOpen");
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

            $('body, html').animate({
                scrollTop: target + 'px'
            }, 1000);

        });
    }
}