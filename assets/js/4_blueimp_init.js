$(document).ready(function() {

    if (typeof galleryLinksContainer !== 'undefined') {

        var galleries = [];

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

            galleries.push(gallery);

        }); // each end
    }

});