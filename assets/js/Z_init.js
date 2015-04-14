
$(document).ready(function(){
  longform.init();

  sm.init();


// preloading image for preloader :)
  var img = new Image();
  $(img).on('load', function() {
      $("#loader-image").css("backgroundImage", "url(" + this.src + ")" ).fadeIn("slow");
  });

  var loaderImgSrc = $("#loader-image").data("src");
  if(loaderImgSrc) img.src = loaderImgSrc;

});

window.onload = function(){
  console.log("document loaded");
  $("#loader-wrapper").fadeOut("fast", function(){
    $(this).remove();
  });
};
