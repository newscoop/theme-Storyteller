  {{ if $gimme->browser->ua_type != "mobile" }}
    {{ include file="_tpl/_storyteller/ambient.tpl" }}
  {{ /if }}

    {{ foreach $gimme->article->slideshows as $slideshow name=slideshowlist }}
    {{ if $smarty.foreach.slideshowlist.first }}
		<section class="slideshow fade{{* full horizontal *}}" name="{{ $gimme->article->number }}">  
	{{ /if }}  
	
      {{ foreach $slideshow->items as $item name=insideslideshow }}
        {{ if $smarty.foreach.insideslideshow.first }}
          <ul class="slides">
        {{ /if }}
            <li>
            	<img src="{{ $item->image->src }}" width="{{ $item->image->width }}" height="{{ $item->image->height }}" alt="{{ $item->caption }}" />
            	<!--p class="fullscreenSlideCaption">{{ $item->image->caption }}{{ if $item->image->photographer }} (Photo: {{ $item->image->photographer }}){{ /if }}</p-->
            </li>
        {{ if $smarty.foreach.insideslideshow.last }}
          </ul>
          {{ if $gimme->article->text_block }}
        	<div class="slideshowDescription">
          		{{ $gimme->article->text_block }}
        	</div>
      	  {{ /if }}  
        {{ /if }}
      {{ /foreach }}
      
      {{ if $smarty.foreach.slideshowlist.last }}      
	  	</section>
	  {{ /if }}      
    {{ /foreach }}