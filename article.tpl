{{ include file="_tpl/_html-head.tpl" }}
  
  <div id="wrapper">

    {{ include file="_tpl/header.tpl" }}

    <div id="content" class="clearfix">

      <section class="main entry">

      {{ if $gimme->article->type_name == "debate" }}

        {{ include file="_tpl/article-debate.tpl" }}

      {{ else }}

        {{ include file="_tpl/article-cont.tpl" }}

      {{ /if }}

      {{ if $gimme->article->type_name !== "page" }}

        {{ if $gimme->article->longform }}
          <div id="longform-article-tools">
        {{ /if }}

          <!-- Video  -->
          {{ if $gimme->article->longform }}
            {{ list_article_attachments }}
            {{ if $gimme->attachment->extension == oga }}
              <div class="audio-attachment aside-box">
                <h2>{{ #listenAudio# }}</h2>
                <audio src="{{ uri options="articleattachment" }}" width="290" controls>
                  <a href="{{ uri options="articleattachment" }}">{{ #downloadAudioFile# }}</a>
                </audio>
              </div><!-- /.audio-attachment -->
            {{ /if }}

            {{ if $gimme->attachment->extension == ogv || $gimme->attachment->extension == ogg || $gimme->attachment->extension == mp4 || $gimme->attachment->extension == webm }}             

              <div class="video-attachment aside-box"><!-- read http://diveintohtml5.org/video.html -->
                <h2>{{ #watchVideo# }}</h2>
                <video id="video_{{ $gimme->current_list->index }}" preload="auto">
                  <source src="{{ uri options="articleattachment" }}" type='{{ $gimme->attachment->mime_type }}'>
                  <a href="{{ uri options="articleattachment" }}">{{ #download# }} .{{ $gimme->attachment->extension }} {{ #file# }}</a>
                </video>
              </div><!-- /#video-attachment --> 

            {{ /if }}
            {{ /list_article_attachments }}
          {{ /if }}

          {{ if $gimme->article->type_name !== "debate" }}

            {{ include file="_tpl/article-author-info.tpl" }}

          {{ /if }}

          {{ include file="_tpl/article-rating.tpl" }}

          {{ include file="_tpl/article-comments.tpl" }}
        
        {{ if $gimme->article->longform }}
          </div>
        {{ /if }}

      {{ /if }}

      </section><!-- / Entry -->

      {{ if not $gimme->article->longform }}
        {{ include file="_tpl/article-aside.tpl" }}
      {{ /if }}

      {{ if not $gimme->article->longform }}
        <div class="divider"></div>
        {{ include file="_tpl/all-sections.tpl" }}
      {{ /if }}

    </div><!-- / Content -->

    {{ include file="_tpl/footer.tpl" }}

    {{ config_load file="{{ $gimme->language->english_name }}.conf" }}


  </div><!-- / Wrapper -->

  {{ include file="_tpl/_html-foot.tpl" }}

</body>
</html>