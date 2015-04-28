<div class="st-video part inview" name="{{ $gimme->article->number }}">
    {{ if $gimme->browser->ua_type != "mobile" }}
      <div class="video-container"
        {{ if $gimme->article->loop }}data-loop="loop" {{ /if }}
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
    {{ /if }}

    {{include file="_tpl/_storyteller/content.tpl"}}
</div>
