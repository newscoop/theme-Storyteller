<div class="part slideshow">


  {{ foreach $gimme->article->slideshows as $slideshow  name=slideshowlist}}
      {{ foreach $slideshow->items as $item  name=insideslideshow }}
        {{ if $item->is_image }}

          <div class="bg-image"
          data-src="{{ $item->image->src }}"
          {{ if $smarty.foreach.insideslideshow.last }}
            data-animate="no"
          {{/if}}
            >
            <div class="caption">
              <h3>{{$item->caption}}</h3>
              <p>{{ $item->image->photographer}}</p>
            </div>
          </div>

        {{/if}}
      {{ /foreach }}
    {{ /foreach }}






</div>

