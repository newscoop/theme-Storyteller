{{ include file="_tpl/_html-head.tpl" }}

<body>

{{list_articles constraints="type is storyteller" length="1"}}

  <!-- todo: navigation -->
  {{* include file="_tpl/_storyteller/nav.tpl" *}}
  <!-- todo: ambient audio -->
  {{* include file="_tpl/_storyteller/ambient-audio.tpl" *}}


  <!-- we don't show content of wrapper article here. It is there for playlists, frontpage etc. -->

  <article>


    {{ list_related_articles }}

      {{if $gimme->article->background_image}}
      <!-- background image -->
        {{include file="_tpl/_storyteller/el-bg-image.tpl"}}


      {{elseif $gimme->article->background_video}}
      <!-- background video TODO!!!!!!! -->
        {{include file="_tpl/_storyteller/el-bg-video.tpl"}}


      {{elseif $gimme->article->parallax_image}}
      <!-- parallax image with possible header text -->
        {{include file="_tpl/_storyteller/el-parallax-image.tpl"}}


      {{elseif $gimme->article->slideshow}}
      <!-- slideshow -->
        {{include file="_tpl/_storyteller/el-slideshow.tpl"}}


      {{elseif $gimme->article->horizontal_slideshow}}
      <!-- horizontal slideshow (still ugly) -->
        {{include file="_tpl/_storyteller/el-horizontal-slideshow.tpl"}}


      {{else}}
      <!-- no effects/regular block -->
        {{include file="_tpl/_storyteller/el-no-effects.tpl"}}

      {{/if}}


    {{ /list_related_articles }}

  </article>

{{/list_articles}}


{{ include file="_tpl/_html-foot.tpl" }}

</body>
</html>
