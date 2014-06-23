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
    {{ if $gimme->article->video && $gimme->browser->ua_type != "mobile" }}
      <video class="lead-video" {{ if $gimme->article->loop }}loop="loop" {{ /if }} {{ if $gimme->article->preload }}preload="auto" {{ /if }}>
      {{ list_article_attachments }}
        {{ if $gimme->attachment->extension == mp4 }}
          <source src="{{ uri options="articleattachment" }}" type='{{ $gimme->attachment->mime_type }}' />
        {{ /if }}
        {{ if $gimme->attachment->extension == webm }}
          <source src="{{ uri options="articleattachment" }}" type='{{ $gimme->attachment->mime_type }}' />
        {{ /if }}
      {{ /list_article_attachments }}
      </video>
    {{ /if }}
    {{ include file="_tpl/img/img_full.tpl" where="article" }}
  </article>
  {{ if $gimme->browser->ua_type != "mobile" }}
    {{ include file="_tpl/_storyteller/ambient.tpl" }}
  {{ /if }}
</section>
