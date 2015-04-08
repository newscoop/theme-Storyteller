{{ include file="_tpl/_html-head.tpl" }}

<body>

{{list_articles constraints="type is storyteller" length="1"}}

  <!-- todo: navigation -->
  {{include file="_tpl/_storyteller/nav.tpl"}}
  <!-- todo: ambient audio -->
  {{include file="_tpl/_storyteller/ambient-audio.tpl"}}


  <!-- we don't show content of wrapper article here. It is there for playlists, frontpage etc. -->

  <article>


    {{ list_related_articles }}
      <!-- background image -->

      <!-- background video -->

      <!-- parallax image with possible header text -->

      <!-- slideshow -->

      <!-- parallax slideshow -->

      <!-- horizontal slideshow (still ugly) -->

      <!-- full page header with possible background -->

      <!-- no effects/regular block -->


    {{ /list_related_articles }}

  </article>

{{/list_articles}}


{{ include file="_tpl/_html-foot.tpl" }}

</body>
</html>
