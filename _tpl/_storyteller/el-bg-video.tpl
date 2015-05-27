<section class="st-video part inview {{$gimme->article->css_class}}" name="{{ $gimme->article->number }}">
    {{ if $gimme->browser->ua_type != "mobile" }}
      <div class="video-container"
        data-loop="loop"
        data-preload="none"
        data-poster="{{ $gimme->url->base }}{{ image rendition='fullscreen' }}{{ $image->src }}{{ /image }}" >


        {{ list_article_attachments }}
          {{ if $gimme->attachment->extension == mp4 }}
            <source data-src="{{ uri options="articleattachment" }}" type='{{ $gimme->attachment->mime_type }}' />
          {{ /if }}
          {{ if $gimme->attachment->extension == webm }}
            <source data-src="{{ uri options="articleattachment" }}" type='{{ $gimme->attachment->mime_type }}' />
          {{ /if }}
        {{ /list_article_attachments }}

      </div>

    {{else}}
    <div class="video-container">
    <video controls poster="{{ $gimme->url->base }}{{ image rendition='fullscreen_medium' }}{{ $image->src }}{{ /image }}">
      {{ list_article_attachments }}
        {{ if $gimme->attachment->extension == mp4 OR $gimme->attachment->extension == webm}}
          <source src="{{ uri options="articleattachment" }}" type="{{ $gimme->attachment->mime_type }}" />
        {{/if}}
      {{/list_article_attachments }}
    </video>
  </div>
    {{ /if }}

    {{include file="_tpl/_storyteller/content.tpl"}}
</section>
