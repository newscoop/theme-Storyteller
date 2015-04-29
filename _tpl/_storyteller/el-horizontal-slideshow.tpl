

       {{ foreach $gimme->article->slideshows as $slideshow  name=slideshowlist}}
         {{ if $smarty.foreach.slideshowlist.first }}

         <script>
         if(galleryLinksContainer===undefined){
           var galleryLinksContainer = [];


         }
         </script>

          <div class="part slideshow-horizontal snap {{$gimme->article->css_class}}" name="{{ $gimme->article->number }}">

            <div class="blueimp-gallery blueimp-gallery-carousel blueimp-gallery-controls">
              <div class="slides"></div>

              <a class="prev">&lsaquo;</a>
              <a class="next">&rsaquo;</a>

              <div class="slide-caption"></div>
            </div>

         {{/if}}


           {{ foreach $slideshow->items as $item  name=insideslideshow }}
              {{ if $smarty.foreach.insideslideshow.first }}
                <script>
                var galleryLinks = [];
              {{ /if }}

                 {{ if $item->is_image }}


                     galleryLinks.push({

                      title: '{{$item->caption|strip_tags:false|escape:javascript:'UTF-8' }}',
                      photographer: '{{ $item->image->photographer|escape:javascript:'UTF-8' }}',
                      href: '{{ $item->image->src }}',
                      original_id: '{{ $item->image->id }}',
                      type: 'image/jpeg'

                    });

                 {{ else }}

                 videoNumber = blueimpGallery.youtube_parser("{{ $item->video->url }}");
               //youtube
               if( videoNumber ){
                galleryLinks.push({
                 title: '{{$item->caption|strip_tags:false|escape }}',
                 href: '{{$item->video->url}}',
                 type: 'text/html',
                 youtube: videoNumber,
                 poster: 'http://img.youtube.com/vi/'+videoNumber+'/0.jpg',
                 photographer: '{{ $item->image->photographer }}'

               });



              }else{



               videoNumber = blueimpGallery.vimeo_parser("{{ $item->video->url }}");

                   //vimeo
                   if (videoNumber){



                     var vimeoObj = new Object();
                     vimeoObj.title = '{{$item->caption|strip_tags:false|escape }}';
                     vimeoObj.href = '{{$item->video->url}}';
                     vimeoObj.type = 'text/html';
                     vimeoObj.vimeo = videoNumber;
                     vimeoObj.poster = blueimpGallery.vimeo_thumb(videoNumber);
                     vimeoObj.photographer = '{{ $item->image->photographer }}';




                     galleryLinks.push(vimeoObj);


                   }

                 }

                 {{ /if }}

                 {{ if $smarty.foreach.insideslideshow.last }}
                 galleryLinksContainer.push(galleryLinks);

                 </script>

                 {{/if}}

           {{ /foreach }}

           {{ if $smarty.foreach.slideshowlist.last }}
            </div>
           {{/if}}

         {{ /foreach }}



