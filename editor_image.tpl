{{ dynamic }}


<figure class="cms-image {{ $imageDetails['align']  }}" style="max-width: {{$imageDetails['width']}};">


<img src="{{ $uri->uri }}" style="max-width: 100%" rel="resizable" alt="{{ $imageDetails['alt'] }}" />



{{ if $gimme->image->photographer|strip !== "" OR $gimme->image->description|strip !== "" }}
  <figcaption>{{ $gimme->image->description }}
    {{ if $gimme->image->photographer|strip !== "" }}
    <span class="photographer">
   &copy; {{ if $gimme->image->photographer_url }}<a style="display: inline" href="{{ $gimme->image->photographer_url }}">{{ $gimme->image->photographer }}</a>{{ else }}{{ $gimme->image->photographer }}{{ /if }}
 </span>
   {{ /if }}
  </figcaption>
{{/if}}
</figure>
{{ /dynamic }}