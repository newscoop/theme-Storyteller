$(document).ready(function() {

    preloader.init();

    longform.init();

    blueimpGallery.init();

    nav.init();


});

// on iOS mobile devices there is no onload event
if (isMobile.any) {

  $(document).ready(function() {

    $("body").addClass("mobile");

    preloader.destroy();

  });


} else {
    $(window).load(function() {
      sm.init();

      preloader.destroy();


    });
}