{{ if $gimme->article->video }}
  <span>
    {{ if $gimme->article->display_title && $gimme->article->show_title }}
      <h2>{{ $gimme->article->display_title }}</h2>
    {{ /if }}
    {{ if $gimme->article->full_text }}
      {{ $gimme->article->full_text }}
    {{ /if }}
  </span>
  <div class="lead-video video-container" {{ if $gimme->article->loop }}loop="loop" {{ /if }}preload="true" controls data-poster="{{ $gimme->url->base }}{{ image rendition='video' }}{{ $image->src }}{{ /image }}">
  {{ list_article_attachments }}
    {{ if $gimme->attachment->extension == mp4 }}
      <source data-src="{{ uri options="articleattachment" }}" type='{{ $gimme->attachment->mime_type }}' />
    {{ /if }}
    {{ if $gimme->attachment->extension == webm }}
      <source data-src="{{ uri options="articleattachment" }}" type='{{ $gimme->attachment->mime_type }}' />
    {{ /if }}
  {{ /list_article_attachments }}
  </div>
  {{ if $gimme->browser->ua_type != "mobile" }}
    {{ include file="_tpl/_storyteller/ambient.tpl" }}
  {{ /if }}
{{ else }}
  {{ image rendition="full" }}
    <figure {{ if $gimme->article->type_name == "ST_chaptitle" || $gimme->article->type_name == "ST_slide" }}class='lead-image'{{ /if }}>
      <img src="{{ $image->src }}" rel="resizable" style="max-width: 100%" alt="{{ $image->caption }} ({{ #photo# }} {{ $image->photographer }})" />
      {{ if $where == "article" }}
        {{ if $image->photographer }}
          <dl>
            <dt>{{ #photo# }}</dt>
              <dd>{{ $image->photographer }}</dd>
          </dl>
        {{ /if }}
      {{ /if }}
      <figcaption>
        {{ if $gimme->article->display_title && $gimme->article->show_title }}
         <h3>{{ $gimme->article->display_title }}</h3>
        {{ /if }}
        {{ if $gimme->article->full_text }}
         {{ $gimme->article->full_text }}
        {{ /if }}
      </figcaption>
    </figure>
  {{ /image }}
  {{ if $gimme->browser->ua_type != "mobile" }}
    {{ include file="_tpl/_storyteller/ambient.tpl" }}
  {{ /if }}
{{ /if }}
{{ if $full == 'true' }}
<div class="bgContainer" style="background-image: url('{{ $gimme->url->base }}{{ image rendition='full' }}{{ $image->src }}{{ /image }}')"></div>
{{ /if }}
