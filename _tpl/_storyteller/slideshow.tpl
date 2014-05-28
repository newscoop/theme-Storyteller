<section class="slideshow{{ if $gimme->article->shutter }} full shutter{{ /if }}{{ if $gimme->article->fade }} fade{{ /if }}{{ if $gimme->article->dark }} dark{{ /if }}" name="{{ $gimme->article->number }}">
  {{ include file="_tpl/_storyteller/ambient.tpl" }}
  {{ foreach $gimme->article->slideshows as $slideshow name=slideshowlist }}
    {{ foreach $slideshow->items as $item name=insideslideshow }}
      {{ if $smarty.foreach.insideslideshow.first }}
        <ul class="slides">
      {{ /if }}
        <li>
          {{ if $item->is_image }}
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
                <p>{{ $item->caption }}</p>
              </figcaption>
            </figure>
            {{ /image }}
          {{ else }}
            <video>
              {{ if $item->extension == mp4 }}
                <source src="{{ uri options="articleattachment" }}" type='{{ $gimme->attachment->mime_type }}' />
              {{ /if }}
              {{ if $item->extension == webm }}
                <source src="{{ uri options="articleattachment" }}" type='{{ $gimme->attachment->mime_type }}' />
              {{ /if }}
            </video>
          {{ /if }}
        </li>
      {{ if $smarty.foreach.insideslideshow.last }}
        </ul>
      {{ /if }}
    {{ /foreach }}
  {{ /foreach }}
</section>
