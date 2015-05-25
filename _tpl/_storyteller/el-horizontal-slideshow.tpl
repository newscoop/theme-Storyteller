

       {{ foreach $gimme->article->slideshows as $slideshow  name=slideshowlist}}
         {{ if $smarty.foreach.slideshowlist.first }}

         <script>
         if(galleryLinksContainer===undefined){
           var galleryLinksContainer = [];


         }
         </script>

          <section class="part slideshow-horizontal snap {{$gimme->article->css_class}}" name="{{ $gimme->article->number }}">

            <div class="blueimp-gallery blueimp-gallery-carousel blueimp-gallery-controls">
              <div class="slides"></div>

              <a class="prev">&lsaquo;</a>
              <a class="next">&rsaquo;</a>

              <div class="slide-caption"></div>
            </div>

          </section>

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


                    galleryLinks.push({
                     title: '{{$item->caption|strip_tags:false|escape }}',
                     href: '{{$item->video->url}}',
                     type: 'text/html',
                     video_url: "{{ $item->video->url }}",
                     photographer: '{{ $item->image->photographer }}'

                });




                {{ /if }}

                 {{ if $smarty.foreach.insideslideshow.last }}
                 galleryLinksContainer.push(galleryLinks);

                 </script>

                 {{/if}}

           {{ /foreach }}



         {{ /foreach }}



