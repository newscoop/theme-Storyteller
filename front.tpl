{{ config_load file="{{ $gimme->language->english_name }}.conf" }}

{{ assign var=artNum value=0 }}

{{ list_playlist_articles name="takeover" }}

    {{ $artNum = $gimme->article->number }}
  
{{ /list_playlist_articles }}

{{ list_articles constraints="number is $artNum" }}
  {{ include file="article.tpl" }}
{{ /list_articles }}
