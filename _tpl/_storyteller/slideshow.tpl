{{ if $gimme->article->shutter }}
  {{ assign var="shutter" value="true" }}
  <section name="{{ $gimme->article->number }}" class="slideshow {{ if $gimme->article->fullscreen }}full {{ /if }}{{ if $gimme->article->shutter }}shutter full {{ /if}}{{ if $gimme->article->fade }} fade{{ /if }}{{ if $gimme->article->dark }} dark{{ /if }}">
    {{ if $gimme->browser->ua_type != "mobile" }}
      {{ include file="_tpl/_storyteller/ambient.tpl" }}
    {{ /if }}
    {{ list_related_articles }}
      {{ if $gimme->current_list->at_beginning }}
        <ul class="slides">
      {{ /if }}
          <li name="{{ $gimme->article->number }}" {{ if $gimme->article->dark || $gimme->article->left_text || $gimme->article->right_text }}class="{{ /if }}{{ if $gimme->article->dark }}dark{{ /if }}{{if $gimme->article->left_text}} left-text{{ /if }}{{if $gimme->article->right_text}} right-text{{ /if }}{{ if $gimme->article->dark || $gimme->article->left_text || $gimme->article->right_text }}"{{ /if }}>
            {{ include file="_tpl/_storyteller/slide.tpl" }}
          </li>
      {{ if $gimme->current_list->at_end }}
        </ul>
      {{ /if }}
    {{ /list_related_articles }}
  </section>
{{ else }}
  {{ assign var="shutter" value="false" }}
  <section class="slideshow{{ if $gimme->article->fade && not $gimme->article->horizontal }} fade{{ /if }}{{ if $gimme->article->horizontal && not $gimme->article->fade }} horizontal{{ /if }}{{ if $gimme->article->fullscreen }} full{{ /if }}{{ if $gimme->article->dark }} dark{{ /if }}" name="{{ $gimme->article->number }}">

  {{ if $gimme->browser->ua_type != "mobile" }}
    {{ include file="_tpl/_storyteller/ambient.tpl" }}
  {{ /if }}

  {{* check for an attached slideshow *}}
  {{ assign var="j" value="0" }}
  {{ foreach $gimme->article->slideshows as $slideshow name=slideshowlist }}
    {{ foreach $slideshow->items as $item name=insideslideshow }}
      {{ $j = $j + 1 }}
    {{ /foreach }}
  {{ /foreach }}

  {{ if $j > 0 }}
    <!-- it's a normal slideshow  -->
    {{ foreach $gimme->article->slideshows as $slideshow name=slideshowlist }}
      {{ foreach $slideshow->items as $item name=insideslideshow }}
        {{ if $smarty.foreach.insideslideshow.first }}
          <ul class="slides">
        {{ /if }}
            <li>
              {{ include file="_tpl/_storyteller/slide.tpl" }}
            </li>
        {{ if $smarty.foreach.insideslideshow.last }}
          </ul>
        {{ /if }}
      {{ /foreach }}
    {{ /foreach }}
  {{ else }}
    {{ assign var="i" value="0" }}
    {{ list_related_articles }}
      {{ if $gimme->current_list->at_beginning }}
        {{ $i = $i + 1 }}
      {{ /if }}
    {{ /list_related_articles }}
    {{ if $i > 0 }}
      <!-- it's a custom slideshow -->
      {{ list_related_articles }}
        {{ if $gimme->current_list->at_beginning }}
          <ul class="slides">
        {{ /if }}
            <li name="{{ $gimme->article->number }}">
              {{ include file="_tpl/_storyteller/slide.tpl" }}
            </li>
        {{ if $gimme->current_list->at_end }}
          </ul>
        {{ /if }}
      {{ /list_related_articles }}
    {{ else }}
      <!-- there's no slideshow -->
    {{ /if }}
  {{ /if }}

  </section>
{{ /if }}