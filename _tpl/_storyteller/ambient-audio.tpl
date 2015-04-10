
{{ list_article_attachments }}
  {{ if $gimme->attachment->extension == mp3 && $gimme->attachment->description == "ambient" }}
    <audio src='{{ uri options="articleattachment" }}' type='{{ $gimme->attachment->mime_type }}' class="ambient" preload="none"></audio>
  {{ /if }}
{{ /list_article_attachments }}

