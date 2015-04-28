$(document).ready(function() {

    preloader.init();

    longform.init();

    blueimpGallery.init();

    nav.init();


});

// on touch/mobile devices there is no onload event
if (Modernizr.touch) {

  $(document).ready(function() {

     sm.init();

     preloader.destroy();

     $(window).trigger('checkInView');


  });


} else {
    $(window).load(function() {


        sm.init();

        preloader.destroy();

        $(window).trigger('checkInView');
    });
}