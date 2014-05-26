{{ image rendition="full" }}
	<figure>
    <img src="{{ $image->src }}" width="{{ $image->width }}" height="{{ $image->height }}" rel="resizable" style="max-width: 100%" alt="{{ $image->caption }} ({{ #photo# }} {{ $image->photographer }})" />
    {{ if $where == "article" }}
    <figcaption>
        {{ if $image->photographer }}
        <dl>
            <dt>{{ #photo# }}</dt>
                <dd>{{ $image->photographer }}</dd>
        </dl>
        {{ $image->caption }}
        {{ /if }}
    </figcaption>
    {{ /if }}
    </figure>
{{ /image }}
