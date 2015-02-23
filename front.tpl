{{ assign var=artNum value=0 }}
{{ if $gimme->language->code == "en" }}
{{ assign var="plName" value="takeover-en" }}
{{ else }}
{{ assign var="plName" value="takeover" }}
{{ /if }}

{{ list_playlist_articles name=$plName }}

    {{ $artNum = $gimme->article->number }}
  
{{ /list_playlist_articles }}

{{ list_articles constraints="number is $artNum" }}
{{ if $gimme->language->code == "en" }}
  {{ include file="layout.tpl" }}
{{ else }}
  {{ include file="article.tpl" }}
{{ /if }}
{{ /list_articles }}
