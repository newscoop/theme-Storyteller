{{ if $gimme->article->shutter }}
  <section class="slideshow full shutter{{ if $gimme->article->dark }} dark{{ /if }}">
    {{ if $gimme->browser->ua_type != "mobile" }}
      {{ include file="_tpl/_storyteller/ambient.tpl" }}
    {{ /if }}
    {{ list_related_articles }}
      {{ if $gimme->current_list->at_beginning }}
        <ul class="slides">
      {{ /if }}
          <li name="{{ $gimme->article->number }}" class="{{ if $gimme->article->dark }}dark{{ /if }}{{if $gimme->article->left_text}} left-text{{ /if }}{{if $gimme->article->right_text}} right-text{{ /if }}">
            {{ include file="_tpl/_storyteller/slide.tpl" }}
          </li>
      {{ if $gimme->current_list->at_end }}
        </ul>
      {{ /if }}
    {{ /list_related_articles }}
  </section>
{{ else }}
  <section class="slideshow{{ if $gimme->article->fade && not $gimme->article->horizontal }} fade{{ /if }}{{ if $gimme->article->horizontal && not $gimme->article->fade }} horizontal{{ /if }}{{ if $gimme->article->fullscreen }} full{{ /if }}{{ if $gimme->article->dark }} dark{{ /if }}" name="{{ $gimme->article->number }}">
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
{{ /if }}
