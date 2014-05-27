<section class="slideshow{{ if $gimme->article->shutter }} full shutter{{ /if }}{{ if $gimme->article->fade }} fade{{ /if }}{{ if $gimme->article->dark }} dark{{ /if }}">
  {{ include file="_tpl/_storyteller/ambient.tpl" }}
  {{ foreach $gimme->article->slideshows as $slideshow name=slideshowlist }}
    {{ foreach $slideshow->items as $item name=insideslideshow }}
      {{ if $smarty.foreach.insideslideshow.first }}
        <ul class="slides">
      {{ /if }}
        <li>
          {{ image rendition="full" }}
          <figure>
            <img src="{{ $item->image->src }}" width="{{ $item->image->width }}" height="{{ $item->image->height }}" alt="{{ $item->caption }}" />
            <figcaption>
              {{ if !(empty($item->image->photographer)) }}
              <dl>
                <dt>{{ #photo# }}</dt>
                  <dd>{{ $item->image->photographer }}</dd>
              </dl>
              {{ /if }}
              {{ if !(empty($item->image->caption)) }}
                {{ $item->caption }}
              {{ /if }}
            </figcaption>
          </figure>
          {{ /image }}
        </li>
      {{ if $smarty.foreach.insideslideshow.last }}
        </ul>
      {{ /if }}
    {{ /foreach }}
  {{ /foreach }}
</section>
