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