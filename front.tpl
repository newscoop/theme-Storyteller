{{ include file="_tpl/_html-head.tpl" }}
<body>

<div class="container">
  <div class="row">
    <div class="col-md-12">
      <h1>Each section contains one longform.</h1>
    </div>
  </div>


{{ list_articles  constraints="type is storyteller"}}
{{if $gimme->current_list->index%2==1}}
  <div class="row">
{{/if}}
  <div class="col-md-6">
    {{image rendition="fullscreen"}}
    <a href="{{url options="section"}}">
      <img src="{{ $image->src }}" />
    </a>
    {{/image}}

    <h2><a href="{{url options="section"}}" >{{$gimme->article->name}}</a></h2>
    <p>{{$gimme->article->deck}}</p>
  </div>


  {{if $gimme->current_list->index%2==0 OR $gimme->current_list->at_end}}
    </div>
  {{/if}}
{{ /list_articles }}


</div>
{{ include file="_tpl/_html-foot.tpl" }}

</body>
</html>

