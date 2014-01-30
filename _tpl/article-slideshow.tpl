{{ assign var="i" value=0 }}
{{ foreach $gimme->article->slideshows as $slideshow name=slideshowlist }}
  {{ foreach $slideshow->items as $item name=insideslideshow }}
    {{ if $smarty.foreach.insideslideshow.first }}
      <div class="thumb-gallery tabs">
    {{ /if }}
    {{ assign var="i" value=$i+1 }}
    {{ if $item->is_image }}
        <div id="tab-{{ $i }}" class="gall-box">
          <figure>
            {{ if not $gimme->article->longform }}
            <a href="{{ $gimme->url->scheme }}://{{ $gimme->publication->site }}/{{ $item->image->original }}" title="{{ $item->caption }} {{ if !(empty($item->image->photographer)) }}(Bild: {{ $item->image->photographer }}){{ /if }}" rel="fancybox-thumb" class="zoom fancybox-thumb">Zoom</a>
            {{ /if }}
            <img src="{{ $item->image->src }}" width="{{ $item->image->width }}" height="{{ $item->image->height }}" alt="{{ $item->caption }}" />
            <small>{{ $item->caption }} {{ if !(empty($item->image->photographer)) }}(Bild: {{ $item->image->photographer }}){{ /if }}</small>
          </figure>
        </div>
    {{ else }}
        <div id="tab-{{ $i }}" class="gall-box">
          <figure>
            {{ video_player video=$item->video }}
            <small>{{ $item->caption }}</small>
          </figure>
        </div>
    {{ /if }}
  {{ /foreach }} 

  {{ if not $gimme->article->longform }}
    {{ assign var="i" value=0 }}
    {{ foreach $slideshow->items as $item name=insideslideshow }}
      {{ if $smarty.foreach.insideslideshow.first }}
          <ul class="carousel jcarousel-skin-gallery clearfix">
      {{ /if }} 
      {{ assign var="i" value=$i+1 }}
      {{ if $item->is_image }}
            <li><a href="#tab-{{ $i }}"><img src="{{ $item->image->src }}" width="90" height="67" alt="{{ $item->caption }}" /></a></li>
      {{ else }}
            <li><a href="#tab-{{ $i }}"><img src="{{ uri static_file="pictures/video-thumb.png" }}" width="90" height="67" alt="{{ $item->caption }}" /></a></li>
      {{ /if }}
      {{ if $smarty.foreach.insideslideshow.last }}
          </ul>
      {{ /if }}
    {{ /foreach }}
  {{ /if }}
        </div><!-- / Thumb gallery -->
{{ /foreach }}