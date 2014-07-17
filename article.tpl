{{ config_load file="{{ $gimme->language->english_name }}.conf" }}

{{ include file="_tpl/_html-head.tpl" }}

{{ if $gimme->article->type_name == "storyteller" }}

    <header{{ if $gimme->article->nav }} class="nav"{{ /if }}>
        <a href="/" id="home">{{ #home# }}</a>
        {{ if $gimme->article->nav }}
        <a href="#" id="collapse"></a>
        {{ $i = 1 }}
        {{ list_related_articles }}
            {{ if $gimme->current_list->at_beginning }}
            <nav>
                <ul>
            {{ /if }}
            {{ if $gimme->article->display_title && $gimme->article->show_in_nav }}
                    <li><a href="#{{ $gimme->article->number }}" title="{{ $gimme->article->display_title }}"><span>{{ $i }}</span> {{ $gimme->article->display_title }}</a>
                    {{ $j = 1 }}
                    {{ list_related_articles }}
                        {{ if $gimme->article->display_title && $gimme->article->show_in_nav }}
                            <li class="child"><a href="#{{ $gimme->article->number }}" title="{{ $gimme->article->display_title }}"><span>{{ $i }}.{{ $j }}</span> {{ $gimme->article->display_title }}</a></li>
                            {{ assign var = $j value = $j++ }}
                        {{ /if }}
                    {{ /list_related_articles }}
                    </li>
                    {{ assign var = $i value = $i++ }}
            {{ /if }}
            {{ if $gimme->current_list->at_end || $gimme->current_list->at_end && $gimme->current_list->index == 1 }}
                </ul>
            </nav>
            {{ /if }}
        {{ /list_related_articles }}
        {{ /if }}
        <a href="#" class="mute">Mute</a>
        {{ assign var="l" value="0" }}
        {{ assign var="currLan" value=$gimme->language->code }}
        {{ list_languages of_publication="true" }}
            {{ $l = $l + 1 }}
        {{ /list_languages }}
        {{ list_languages of_publication="true" }}
            {{ if $l > 1 }}
                {{ if $gimme->current_list->at_beginning }}
                <ul>
                {{ /if }}
                <li><a href="{{ uri }}/"{{ if $currLan == $gimme->language->code }} class="active"{{ /if }}>{{ $gimme->language->name }}</a></li>
                {{ if $gimme->current_list->at_end }}
                </ul>
                {{ /if }}
            {{ /if }}
        {{ /list_languages }}
        {{* search_form template="search.tpl" html_code="class=\"search-box\"" button_html_code="class=\"button\"" }}
            {{ camp_edit object="search" attribute="keywords" html_code="placeholder=\"input search\"" }}
        {{ /search_form *}}
    </header>

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
