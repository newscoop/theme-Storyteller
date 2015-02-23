{{ image rendition="full" }}
	<figure {{ if $gimme->article->type_name == "ST_chaptitle" }}class='lead-image'{{ /if }}>
    <img src="{{ $image->src }}" width="{{ $image->width }}" height="{{ $image->height }}" rel="resizable" style="max-width: 100%" alt="{{ $image->caption }} ({{ #photo# }} {{ $image->photographer }})" />
    {{ if $where == "article" }}
      <figcaption>
        {{ if not $gimme->article->type_name == "ST_chaptitle" }}
          {{ $image->caption }}
        {{ /if }}
        {{ if $image->photographer }}
          <dl>
            <dt>{{ #photo# }}</dt>
              <dd>{{ $image->photographer }}</dd>
          </dl>
        {{ /if }}
      </figcaption>
    {{ /if }}
  </figure>
{{ /image }}
