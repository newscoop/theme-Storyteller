{{ config_load file="{{ $gimme->language->english_name }}.conf" }}

{{ include file="_tpl/_html-head.tpl" }}
  
  <div id="wrapper" class="{{ if $gimme->article->minimenu }} minimenu {{ /if }}{{ if $gimme->article->whiteout }} whiteout {{ /if }}">

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
          
            {{* slideshow *}}
            {{ assign var="i" value=0 }}
            {{ foreach $gimme->article->slideshows as $slideshow name=slideshowlist }}
              {{ foreach $slideshow->items as $item name=insideslideshow }}
                {{ if $smarty.foreach.insideslideshow.first }}
                <div class="bxslider">
                {{ /if }}
                {{ assign var="i" value=$i+1 }}
                {{ if $item->is_image }}
                  <div id="tab-{{ $i }}" class="gall-box">
                    <figure>
                      <img src="{{ $item->image->src }}" width="{{ $item->image->width }}" height="{{ $item->image->height }}" alt="{{ $item->caption }}" />
                      <small>{{ $item->caption }} {{ if !(empty($item->image->photographer)) }}(Bild: {{ $item->image->photographer }}){{ /if }}</small>
                    </figure>
                  </div>
                {{ else }}
                  <div id="tab-{{ $i }}" class="gall-box">
                    <figure>
                      {{ video_player video=$item->video }}
                      <small>{{ $item->caption }}</small>
                    </figure>
                  </div>
                {{ /if }}
              {{ /foreach }} 
              </div><!-- / Thumb gallery -->
            {{ /foreach }}

            {{ if $gimme->article->has_attachments }}
              {{ list_article_attachments length="1" }}
                {{ if $gimme->attachment->extension == oga || $gimme->attachment->extension == mp3 || $gimme->attachment->extension == wav }}
                  {{ if $gimme->attachment->description == "ambient" }}                    
                    <audio class="ambient" loop id="ambient-{{ $gimme->article->number }}">
                      <source src="{{ uri options="articleattachment" }}" />
                    </audio>
                  {{ /if }}
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