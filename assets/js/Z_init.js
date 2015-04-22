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
