
{{ list_article_attachments }}
  {{ if $gimme->attachment->extension == mp3 && $gimme->attachment->description == "ambient" }}
    <audio src='{{ uri options="articleattachment" }}' type='{{ $gimme->attachment->mime_type }}' class="ambient" preload="none" autoplay="true" loop="true"></audio>

    <a href="#" class="mute">Mute</a>
  {{ /if }}
{{ /list_article_attachments }}

