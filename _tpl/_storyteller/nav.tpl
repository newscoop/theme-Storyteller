{{ if $gimme->article->nav }}

<div class="menu_open">
  <div class="sticks_wrapper">
    <div class="stick -first" id="stick1"></div>
    <div class="stick -second" id="stick2"></div>
    <div class="stick -third" id="stick3"></div>
  </div>
</div>

<div class="nav">
  <nav>
  <ul>
  {{ $cover = 0 }}

  {{ $i = 1 }}
  {{ $j = 0 }}

  {{ list_related_articles }}

  {{ if $gimme->article->display_title }}
    {{ assign var="artTitle" value=$gimme->article->display_title }}
  {{ else }}
    {{ assign var="artTitle" value=$gimme->article->name }}
  {{ /if }}

  {{ if $gimme->article->chapter_head }}
  {{* "close the list item if it's not the first element in this loop" *}}
  {{ if $i > 1 }}
  </li>
  {{ /if }}
  {{ if $j >= 1 }}
  </ul>
  {{ $j = 0 }}
  {{ /if }}
  <li class="first-level"><a href="#{{ $gimme->article->number }}" data-articleNumber="{{ $gimme->article->number }}" title="{{ $artTitle }}"><span>{{ $i }}</span> <p>{{ $artTitle }}</p></a>
  {{ $i = $i+1 }}
  {{ capture name="chapImage" assign="chapImage" }}
    {{ strip }}
      {{ image rendition="sidebar" }}<figure><a href="#{{ $gimme->article->number }}" title="{{ $artTitle }}"><img src="{{ $image->src }}" width="{{ $image->width }}" height="{{ $image->height }}" /></a></figure>{{ /image }}
    {{ /strip }}
  {{ /capture }}

  {{ elseif !$gimme->article->dont_show_in_nav }}
    {{ $j = $j+1 }}
  {{ if $j == 1 }}
    <ul>
    {{ $chapImage }}
  {{ /if }}
      <li class="child"><a href="#{{ $gimme->article->number }}" data-articleNumber="{{ $gimme->article->number }}" title="{{ $artTitle }}"> {{ $artTitle }}</a></li>
  {{ /if }}

  {{ if $gimme->current_list->at_end }}
      </li>
      <li><!-- {{ #comments# }} --></li>
    </ul>
  </nav>
  {{ /if }}
{{ /list_related_articles }}

{{ assign var="l" value="0" }}
{{ assign var="currLan" value=$gimme->language->code }}

</div>

<!--
<div class="social-buttons">
  <div class="fb-share-button" data-href="{{ url }}" data-layout="button"></div>
    <a href="https://twitter.com/share" class="twitter-share-button" data-url="{{ url }}" data-via="sourcefabric" data-count="none">Tweet</a>
    <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
  </div>
</div>
-->
{{/if}}