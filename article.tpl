{{ config_load file="{{ $gimme->language->english_name }}.conf" }}

{{ include file="_tpl/_html-head.tpl" }}

{{ if $gimme->article->type_name == "storyteller" }}

    {{ list_related_articles }}
        {{ if $gimme->current_list->at_beginning }}
        <header>
            <a href="#" id="collapse"></a>
            <nav>
                <ul>
            {{ /if }}
                    <li class="{{ $gimme->article->number }}"><a href="#{{ $gimme->article->number }}"><span>{{ counter }}</span> {{ if $gimme->article->display_title }}{{ $gimme->article->display_title }}{{ /if }}</a></li>
            {{ if $gimme->current_list->at_end }}
                </ul>
            </nav>
            <a href="#" class="mute">Mute</a>
        </header>
        {{ /if }}
    {{ /list_related_articles }}

    {{ list_related_articles }}
        {{ if $gimme->current_list->at_beginning }}
        <section>
            <article>
        {{ /if }}

        {{ if $gimme->article->type_name == "ST_chaptitle" }}
            {{ include file="_tpl/_storyteller/chapter-title.tpl" }}
        {{ /if }}
        {{ if $gimme->article->type_name == "ST_textblock" }}
            {{ include file="_tpl/_storyteller/text-block.tpl" }}
        {{ /if }}
        {{ if $gimme->article->type_name == "ST_slideshow" }}
            {{ include file="_tpl/_storyteller/slideshow.tpl" }}
        {{ /if }}

        {{ if $gimme->current_list->at_end }}
            </article>
        </section>
        {{ /if }}
    {{ /list_related_articles }}

{{ else }}

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

{{ if $gimme->article->type_name !== "debate" }}
{{ include file="_tpl/article-author-info.tpl" }}
{{ /if }}

{{ include file="_tpl/article-rating.tpl" }}

{{ include file="_tpl/article-comments.tpl" }}

{{ /if }}

            </section><!-- / Entry -->

{{ include file="_tpl/article-aside.tpl" }}

            <div class="divider"></div>

{{ include file="_tpl/all-sections.tpl" }}

        </div><!-- / Content -->

{{ include file="_tpl/footer.tpl" }}

    </div><!-- / Wrapper -->

{{ /if }}

{{ include file="_tpl/_html-foot.tpl" }}

</body>
</html>
