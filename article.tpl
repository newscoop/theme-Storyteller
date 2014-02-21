{{ config_load file="{{ $gimme->language->english_name }}.conf" }}

{{ include file="_tpl/_html-head.tpl" }}
  
  <div id="wrapper">

    {{ include file="_tpl/header.tpl" }}

    <div id="content" class="clearfix {{ if $gimme->article->longform }}longform{{ /if }}">

      <section class="main entry">

      {{ if $gimme->article->longform }}
        {{ list_related_articles }}
        <section id="component-{{ $gimme->article->number }}">
          <article>
            {{ if $gimme->article->content_accessible }}
              <h2 id="{{ $gimme->article->number }}">{{ $gimme->article->name }}</h2>
              {{ include file="_tpl/img/img_big.tpl" where="article" }}
              <div class="intro">{{ $gimme->article->deck }}</div>
              {{ include file="_tpl/_edit-article.tpl" }}{{ $gimme->article->full_text }}
            {{ else }}
              <p><em>{{ #thisArticleIsLocked# }}</em></p>
            {{ /if }}
          
            {{ include file="_tpl/article-slideshow.tpl" }}

            {{ if $gimme->article->has_attachments }}
              {{ list_article_attachments }}
                {{ if $gimme->attachment->extension == oga || $gimme->attachment->extension == mp3 || $gimme->attachment->extension == wav }}
                  {{ if $gimme->attachment->description == "ambient" }}
                    
                    <audio class="ambient" loop id="ambient-{{ $gimme->article->number }}">
                      <source src="{{ uri options="articleattachment" }}" />
                    </audio>
                  {{ else }}
                    <div class="audio-attachment">
                      <h3>{{ #listenAudio# }}</h3>
                      <audio src="{{ uri options="articleattachment" }}" width="290" controls>
                        <a href="{{ uri options="articleattachment" }}">{{ #downloadAudioFile# }}</a>
                      </audio>
                    </div><!-- /.audio-attachment -->
                  {{ /if }}

                {{ elseif $gimme->attachment->extension == ogv || $gimme->attachment->extension == ogg || $gimme->attachment->extension == mp4 || $gimme->attachment->extension == webm }}             

                  <div class="video-attachment"><!-- read http://diveintohtml5.org/video.html -->
                    <h3>{{ #watchVideo# }}</h3>
                    <video id="video_{{ $gimme->current_list->index }}" class="video-js vjs-default-skin" controls
                      preload="auto" width="100%" data-setup="{}">
                      <source src="{{ uri options="articleattachment" }}" type='{{ $gimme->attachment->mime_type }}'>
                      <a href="{{ uri options="articleattachment" }}">{{ #download# }} .{{ $gimme->attachment->extension }} {{ #file# }}</a>
                    </video>
                  </div><!-- /#video-attachment --> 

                {{ else }}

                  <div class="attachment">
                    <h3>{{ #downloadFile# }}</h3>
                    <p>{{ #fileOfType# }} {{ $gimme->attachment->mime_type }}</p>
                    <a href="{{ uri options="articleattachment" }}">{{ $gimme->attachment->file_name }} ({{ $gimme->attachment->size_kb }}kb)</a>
                    <p><em>{{ $gimme->attachment->description }}</em></p>
                  </div><!-- /.attachment -->

                {{ /if }}      
              {{ /list_article_attachments }}
            {{ /if }} 

          </article>
        </section>
        {{ /list_related_articles }}

      {{ else }}

        {{ if $gimme->article->type_name == "debate" }}

          {{ include file="_tpl/article-debate.tpl" }}

        {{ else }}

          {{ include file="_tpl/article-cont.tpl" }}

        {{ /if }}

        {{ if $gimme->article->type_name !== "page" }}

          {{ if $gimme->article->type_name !== "debate" }}

            {{ include file="_tpl/article-author-info.tpl" }}

          {{ /if }}

          {{ include file="_tpl/article-rating.tpl" }}

          {{ include file="_tpl/article-comments.tpl" }}
          
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