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