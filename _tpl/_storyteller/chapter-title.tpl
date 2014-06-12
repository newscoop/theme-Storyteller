<section class="chapter-title{{ if $gimme->article->dark }} dark{{ /if }}" name="{{ $gimme->article->number }}">
  <article>
    <span class="title">
      <h1>
        {{ if $gimme->article->display_title }}
          {{ $gimme->article->display_title }}
        {{ /if }}
      </h1>
      {{ if $gimme->article->deck }}
        <p>{{ $gimme->article->deck }}</p>
      {{ /if }}
    </span>
    {{ if $gimme->article->video }}
      <video class="lead-video fixed" {{ if $gimme->article->loop }}loop="loop" {{ /if }} {{ if $gimme->article->preload }}preload="auto" {{ /if }} poster="{{ $gimme->url->base }}{{ image rendition='full' }}{{ $image->src }}{{ /image }}">
      {{ list_article_attachments }}
        {{ if $gimme->attachment->extension == mp4 }}
          <source src="{{ uri options="articleattachment" }}" type='{{ $gimme->attachment->mime_type }}' />
        {{ /if }}
        {{ if $gimme->attachment->extension == webm }}
          <source src="{{ uri options="articleattachment" }}" type='{{ $gimme->attachment->mime_type }}' />
        {{ /if }}
      {{ /list_article_attachments }}
      </video>
    {{ else }}
      {{ include file="_tpl/img/img_full.tpl" where="article" }}
    {{ /if }}
  </article>
  {{ include file="_tpl/_storyteller/ambient.tpl" }}
</section>
