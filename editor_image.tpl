{{ dynamic }}
{{ if ($imageDetails['align'] !== "left") && ($imageDetails['align'] !== "right")  }}
<figure class="image-main">
{{ else }}
<figure class="image-float" style="max-width: {{$imageDetails['width']}}px; {{ if $imageDetails['align'] == "left"}} float:left; margin: 0 10px 5px 0{{ elseif $imageDetails['align'] == "right"}} float: right; margin: 0 0 5px 10px{{ /if }}">
{{ /if }}

<img src="{{ $uri->uri }}" style="max-width: 100%" rel="resizable" alt="{{ $imageDetails['alt'] }}" />

<figcaption>{{ $imageDetails['sub'] }} {{ if $gimme->image->photographer|strip !== "" }}(Photo: {{ if $gimme->image->photographer_url }}<a style="display: inline" href="{{ $gimme->image->photographer_url }}">{{ $gimme->image->photographer }}</a>{{ else }}{{ $gimme->image->photographer }}{{ /if }}){{ /if }}</figcaption>
{{ if ($imageDetails['align'] !== "left") && ($imageDetails['align'] !== "right")  }}
</figure>
{{ else }}
</figure>
{{ /if }}
{{ /dynamic }}