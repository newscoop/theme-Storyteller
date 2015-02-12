{{dynamic}}
{{if $gimme->user->is_admin }}
<a style="display: block; text-decoration: none; border: 1px solid #ff7e00; color: #000; padding: 0px 3px; background:#cccc00; font-family:sans; font-size:9px; z-index: 999"
href="http://{{ $gimme->publication->site }}/admin/articles/edit.php?f_publication_id={{ $gimme->publication->identifier }}&f_issue_number={{ $gimme->issue->number }}&f_section_number={{ $gimme->section->number }}&f_article_number={{ $gimme->article->number }}&f_language_id={{ $gimme->language->number }}&f_language_selected={{ $gimme->language->number }}" target="_blank" title="Edit">edit</a>
{{ /if }}
{{/dynamic}}