<article>

  <div id="titles">

    <small class="section">
      <a href="{{ url options="section" }}">{{ $gimme->section->name }}</a> {{ list_article_topics }}{{ if $gimme->current_list->at_beginning }}<em>/ {{ /if }}<a href="{{ url options="template topic.tpl" }}">{{ $gimme->topic->name }}</a>{{ if $gimme->current_list->at_end }}</em>{{ else }}, {{ /if }}{{ /list_article_topics }}
    </small>
  
    <h2>{{ $gimme->article->name }}</h2>

    <span class="date">
      {{ $gimme->article->publish_date|camp_date_format:"%d %M %Y" }} / {{ #by# }} {{ list_article_authors }}{{ if $gimme->author->user->defined }}<a href="{{ $view->url(['username' => $gimme->author->user->uname], 'user') }}">{{ /if }}{{ $gimme->author->name }}{{ if $gimme->author->user->defined }}</a>{{ /if }} ({{ $gimme->author->type|lower }}){{ if !$gimme->current_list->at_end }}, {{ /if }}{{ /list_article_authors }} {{ list_article_locations }}{{ if $gimme->current_list->at_beginning }}/ {{ /if }}{{ if $gimme->location->enabled }}{{ $gimme->location->name }}{{ if $gimme->current_list->at_end }}{{ else }}, {{ /if }}{{ /if }}{{ /list_article_locations }}
    </span>

  </div>

  <div id="leadImg">
    {{ include file="_tpl/img/img_big.tpl" where="article" }}
  </div>

  <!-- slideshow -->

  <div id="cont">
  {{ if $gimme->article->content_accessible }}
    {{ include file="_tpl/_edit-article.tpl" }}{{ $gimme->article->full_text }}
  {{ else }}
    <p><em>{{ #thisArticleIsLocked# }}</em></p>
  {{ /if }}
  </div>

  {{ include file="_tpl/article-slideshow.tpl" }}

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


</article>