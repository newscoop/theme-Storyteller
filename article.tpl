{{ include file="_tpl/_html-head.tpl" }}

{{ list_articles constraints="type is storyteller" length="1" }}

<body class="longform{{ if !$gimme->article->nav }} no-nav{{/if}}{{ if $gimme->browser->ua_type == "mobile" }} mobile{{ /if }}" name="top">

  <div id="fb-root"></div>
  <script>(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));</script>

  <div id="loader-wrapper" >
    {{ image rendition="fullscreen" }}
    <div id="loader-image" data-src="{{ $image->src }}" ></div>
    {{ /image }}

    <div class="spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>

  </div>

  <!-- main audio -->
  <audio id="master-audio" preload="none" autoplay="autoplay" loop="loop"></audio>
  {{ if $gimme->browser->ua_type != "mobile" }}
  <a href="#" class="mute">Mute</a>
  {{ /if }}

  <!-- navigation -->
  {{ include file="_tpl/_storyteller/nav.tpl" }}
  {{ include file="_tpl/_storyteller/ambient-audio.tpl" container="article" }}

  <!-- we don't show content of wrapper article here. It is there for playlists, frontpage etc. -->

  <article>

    {{ list_related_articles }}

    {{ if $gimme->article->background_image }}
    <!-- background image -->
    {{ include file="_tpl/_storyteller/el-bg-image.tpl" }}

    {{ elseif $gimme->article->content_video }}
    <!-- content fullscreen video -->
    {{ include file="_tpl/_storyteller/el-content-video.tpl" }}

    {{ elseif $gimme->article->background_video }}
    <!-- background video -->
    {{ include file="_tpl/_storyteller/el-bg-video.tpl" }}

    {{ elseif $gimme->article->parallax_image }}
    <!-- parallax image with possible header text -->
    {{ include file="_tpl/_storyteller/el-parallax-image.tpl" }}

    {{ elseif $gimme->article->slideshow }}
    <!-- slideshow -->
    {{ include file="_tpl/_storyteller/el-slideshow.tpl" }}

    {{ elseif $gimme->article->horizontal_slideshow }}
    <!-- horizontal slideshow -->
    {{ include file="_tpl/_storyteller/el-horizontal-slideshow.tpl" }}

    {{ elseif $gimme->article->embed }}
    <!-- horizontal slideshow -->
    {{ include file="_tpl/_storyteller/el-embed.tpl" }}

    {{ else }}
    <!-- no effects/regular block -->
    {{ include file="_tpl/_storyteller/el-no-effects.tpl" }}

    {{/if}}

    <!-- ambient audio -->
    {{ include file="_tpl/_storyteller/ambient-audio.tpl" container="section" }}

    {{ /list_related_articles }}

  </article>

  {{ if $gimme->current_list->at_end }}
  <div class="social-buttons credits">
    <div class="fb-share-button" data-href="{{ url }}" data-layout="button"></div>
    <a href="https://twitter.com/share" class="twitter-share-button" data-url="{{ url }}" data-via="sourcefabric" data-count="none">Tweet</a>
    <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
  </div>
  {{ if $gimme->article->comments != "" }}
    {{ include file="_tpl/_storyteller/comments.tpl" }}
  {{ /if }}
 {{ /if }}

 {{/list_articles}}


 {{ include file="_tpl/_html-foot.tpl" }}

</body>
</html>
