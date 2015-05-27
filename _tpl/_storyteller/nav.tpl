
{{ if $gimme->article->nav }}

<div class="menu_open">
  <div class="sticks_wrapper">
    <div class="stick -first" id="stick1"></div>
    <div class="stick -second" id="stick2"></div>
    <div class="stick -third" id="stick3"></div>
  </div>
</div>

<div class="nav">
  {{ $cover = 0 }}

      {{ $i = 1 }}
      {{ $j = 0 }}

      {{ list_related_articles }}

      {{ if $gimme->article->display_title }}
        {{ assign var="artTitle" value=$gimme->article->display_title }}
      {{ else }}
        {{ assign var="artTitle" value=$gimme->article->name }}
      {{ /if }}

      {{ if $gimme->current_list->at_beginning }}
        <nav>
          <ul>
            {{ if $gimme->article->display_title }}
              {{ assign var="artTitle" value=$gimme->article->display_title }}
            {{ else }}
              {{ assign var="artTitle" value=$gimme->article->name }}
            {{ /if }}
            <li>
              <a href="#top">{{ $artTitle }}</a>
            </li>
      {{ /if }}

      {{ if $gimme->article->chapter_head }}
            {{ capture name="chapImage" assign="chapImage" }}
              {{ strip }}
                {{ image rendition="sidebar" }}
                  <figure>
                    <a href="#{{ $gimme->article->number }}" title="{{ $artTitle }}">
                      <img src="{{ $image->src }}" width="{{ $image->width }}" height="{{ $image->height }}" />
                    </a>
                  </figure>
                {{ /image }}
              {{ /strip }}
            {{ /capture }}
            <li>
              <a href="#{{ $gimme->article->number }}" title="{{ $artTitle }}">
                <span>{{ $i }}</span> {{ $artTitle }}</a>
            {{ $n = 0 }}
            <ul>
              <li>{{ $chapImage }}</li>
            {{ list_related_articles }}
              {{ $n = $n + 1 }}
            {{ /list_related_articles }}
            {{ if $n > 0 }}
              {{ list_related_articles }}
              {{ if $gimme->article->display_title }}
                {{ assign var="artTitle" value=$gimme->article->display_title }}
              {{ else }}
                {{ assign var="artTitle" value=$gimme->article->name }}
              {{ /if }}
                  <li><a href="#{{ $gimme->article->number }}" title="{{ $artTitle }}">{{ $artTitle }}</a></li>
              {{ /list_related_articles }}
              </ul>
            {{ /if }}
            {{ $i = $i+1 }}
      {{ /if }}

      {{ if $gimme->current_list->at_end }}
          </ul>
        </nav>
      {{ /if }}
      {{ /list_related_articles }}

      {{ assign var="l" value="0" }}
      {{ assign var="currLan" value=$gimme->language->code }}

   </div>

{{/if}}