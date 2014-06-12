<!-- default template -->
<section class="text{{ if $gimme->article->dark }} dark{{ /if }}{{ if $gimme->article->left_text }} left-text{{ /if }}{{ if $gimme->article->right_text }} right-text{{ /if }}" name="{{ $gimme->article->number }}">

  {{ $gimme->article->full_text }}

</section>
