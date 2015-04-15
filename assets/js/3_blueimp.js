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