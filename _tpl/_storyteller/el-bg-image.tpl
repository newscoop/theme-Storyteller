<section class="part sticky-image" name="{{ $gimme->article->number }}">
  {{image rendition="fullscreen"}}
    <div class="bg-image" data-src="{{ $image->src }}"></div>
  {{/image}}

  {{include file="_tpl/_storyteller/content.tpl"}}

</section>