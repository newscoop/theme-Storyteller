
{{ list_article_attachments }}
  {{ if $gimme->attachment->extension == mp3 && $gimme->attachment->description == "ambient" }}

    <!-- ambient-audio trigger -->
    <div
        data-src='{{ uri options="articleattachment" }}' 
        data-mime='{{ $gimme->attachment->mime_type }}' 
        data-container='{{ $container }}'
        class="ambient"></div>

  {{ /if }}
{{ /list_article_attachments }}

