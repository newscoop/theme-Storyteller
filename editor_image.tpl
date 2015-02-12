{{ dynamic }}
{{ if ($imageDetails['align'] !== "left") && ($imageDetails['align'] !== "right")  }}
<figure class="image-main">
{{ else }}
<figure class="image-float" style="max-width: {{$imageDetails['width']}}px; {{ if $imageDetails['align'] == "left"}} float:left; margin: 0 10px 5px 0{{ elseif $imageDetails['align'] == "right"}} float: right; margin: 0 0 5px 10px{{ /if }}">
{{ /if }}
{{* if $imgZoomLink && ($imageDetails['width'] gt 1000) *}}{{* if image zooming is enabled in system preferences, do the fancy-box thing - otherwise don't. Also, check the width of the image *}}
{{*<a href="{{ $imgZoomLink }}" title="{{ $imageDetails['sub']|strip_tags:false }}" photographerName="{{ $gimme->image->photographer|strip_tags:false }}" class="fancybox-thumb">
<span></span>*}}
{{* /if *}}
<img src="{{ $uri->uri }}" style="max-width: 100%" rel="resizable" alt="{{ $imageDetails['alt'] }}" />
{{* if $imgZoomLink && ($imageDetails['width'] gt 1000) }}</a>{{ /if *}}
<p style="font-style: italic; font-size: 0.725em !important; color: #606060;">{{ $imageDetails['sub'] }} {{ if $gimme->image->photographer|strip !== "" }}(Foto: {{ if $gimme->image->photographer_url }}<a style="display: inline" href="{{ $gimme->image->photographer_url }}">{{ $gimme->image->photographer }}</a>{{ else }}{{ $gimme->image->photographer }}{{ /if }}){{ /if }}</p>
{{ if ($imageDetails['align'] !== "left") && ($imageDetails['align'] !== "right")  }}
</figure><p>
{{ else }}
</figure><p>
{{ /if }}
{{ /dynamic }}