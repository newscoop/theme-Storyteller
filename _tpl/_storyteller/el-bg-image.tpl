<section class="part sticky-image {{$gimme->article->css_class}}" name="{{ $gimme->article->number }}">

    <div class="bg-image"
      {{image rendition="fullscreen"}}
        data-src="{{ $image->src }}"
      {{/image}}

      {{image rendition="fullscreen_medium"}}
        data-srcMedium="{{ $image->src }}"
      {{/image}}

      {{image rendition="fullscreen_phone"}}
        data-srcPhone="{{ $image->src }}"
      {{/image}}
    >
    </div>


  {{include file="_tpl/_storyteller/content.tpl"}}

</section>