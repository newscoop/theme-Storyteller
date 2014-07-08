<section class="chapter-title{{ if $gimme->article->dark }} dark{{ /if }}" name="{{ $gimme->article->number }}">
  <article>
    <span class="title">
      <h1>
        {{ if $gimme->article->display_title }}
          {{ $gimme->article->display_title }}
        {{ /if }}
      </h1>
      {{ if $gimme->article->deck }}
        <div>
          {{ $gimme->article->deck }}
        </div>
      {{ /if }}
    </span>
    {{ if $gimme->article->video && $gimme->browser->ua_type != "mobile" }}
      <video class="lead-video" {{ if $gimme->article->loop }}loop="loop" {{ /if }} {{ if $gimme->article->preload }}preload="auto" {{ /if }}>
      {{ list_article_attachments }}
        {{ if $gimme->attachment->extension == mp4 }}
          <source data-src="{{ uri options="articleattachment" }}" type='{{ $gimme->attachment->mime_type }}' />
        {{ /if }}
        {{ if $gimme->attachment->extension == webm }}
          <source data-src="{{ uri options="articleattachment" }}" type='{{ $gimme->attachment->mime_type }}' />
        {{ /if }}
      {{ /list_article_attachments }}
      </video>
    {{ /if }}
    <div class="bgContainer" style="background: url('{{ $gimme->url->base }}{{ image rendition='full' }}{{ $image->src }}{{ /image }}')"></div>
  </article>
  {{ if $gimme->browser->ua_type != "mobile" }}
    {{ include file="_tpl/_storyteller/ambient.tpl" }}
  {{ /if }}
</section>
