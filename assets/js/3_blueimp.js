window.blueimpGallery = {

    init: function() {

        if (typeof galleryLinksContainer !== 'undefined') {


                $(".slideshow-horizontal").each(function(i, item) {
                    $(item).find(".blueimp-gallery-carousel").attr('id', 'blueimp-image-carousel_' + i);

                });


            $.each(galleryLinksContainer, function(i, galleryLinks) {

              $.each(galleryLinks, function(j, item){


                if(item.hasOwnProperty('video_url')){

                  var videoNumber = blueimpGallery.youtube_parser(item.video_url)

                  if(videoNumber){
                    item.youtube = videoNumber;
                    item.poster = 'http://img.youtube.com/vi/'+videoNumber+'/0.jpg';
                  }else{
                    videoNumber = blueimpGallery.vimeo_parser(item.video_url);

                    item.vimeo = videoNumber;
                    item.poster = blueimpGallery.vimeo_thumb(videoNumber);
                  }

                }

              });

              var stretch = 'cover';

              if (isMobile.any){
                stretch = false;
              }


                var gallery = blueimp.Gallery(galleryLinks, {
                    container: '#blueimp-image-carousel_' + i,
                    carousel: true,
                    startSlideshow: false,
                    stretchImages: stretch,

                    onslide: function(index, slide) {

                        var galleryContainer = this.options.container;

                        var caption = '';
                        caption += this.list[index].title;

                        if (this.list[index].photographer.length > 0) {
                            caption += '<span>(photo: ';
                            caption += this.list[index].photographer;
                            caption += ')</span>';
                        }

                        if(caption){
                          $(galleryContainer).parent().find(".slide-caption").html(caption).fadeIn();
                        }else{
                          $(galleryContainer).parent().find(".slide-caption").fadeOut();
                        }

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

          var regExp = /.*(vimeo.com)\/([a-z\/]*)(\d+)($|\/)/;

          var match = url.match(regExp);

          if (match) {
              return match[3];


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