<section class="chapter-title">
  <article>
    <span class="title">
      <h1>
        {{ if $gimme->article->display_title }}
          {{ $gimme->article->display_title }}
        {{ else }}
          {{ $gimme->article->title }}
        {{ /if }}
      </h1>
      {{ if $gimme->article->deck }}
        <p>{{ $gimme->article->deck }}</p>
      {{ /if }}
    </span>
    {{ include file="_tpl/img/img_full.tpl" where="article" }}
    </figure>
  </article>
</section>
