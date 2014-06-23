{{ if $gimme->article->video }}
  <video class="lead-video fixed" {{ if $gimme->article->loop }}loop="loop" {{ /if }} {{ if $gimme->article->preload }}preload="auto" {{ /if }} poster="{{ $gimme->url->base }}{{ image rendition='full' }}{{ $image->src }}{{ /image }}{{ if $gimme->browser->ua_type == "mobile"}} controls{{ /if }}">
  {{ list_article_attachments }}
    {{ if $gimme->attachment->extension == mp4 }}
      <source src="{{ uri options="articleattachment" }}" type='{{ $gimme->attachment->mime_type }}' />
    {{ /if }}
    {{ if $gimme->attachment->extension == webm }}
      <source src="{{ uri options="articleattachment" }}" type='{{ $gimme->attachment->mime_type }}' />
    {{ /if }}
  {{ /list_article_attachments }}
  </video>
  <span>
    {{ if $gimme->article->display_title && $gimme->article->show_title }}
      <h2>{{ $gimme->article->display_title }}</h2>
    {{ /if }}
    {{ if $gimme->article->full_text }}
      {{ $gimme->article->full_text }}
    {{ /if }}
  </span>
{{ else }}
  {{ image rendition="full" }}
    <figure {{ if $gimme->article->type_name == "ST_chaptitle" || $gimme->article->type_name == "ST_slide" }}class='lead-image'{{ /if }}>
      <img src="{{ $image->src }}" width="{{ $image->width }}" height="{{ $image->height }}" rel="resizable" style="max-width: 100%" alt="{{ $image->caption }} ({{ #photo# }} {{ $image->photographer }})" />
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
{{ /if }}
