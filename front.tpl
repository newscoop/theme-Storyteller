{{ include file="_tpl/_html-head.tpl" }}
<body>

<div class="container">
  <div class="row">
    <div class="col-lg-12">
      <h1>Each section contains one longform.</h1>
    </div>
  </div>

  <div class="row">
{{ list_articles  constraints="type is storyteller"}}
  <div class="col-lg-6">
    {{image rendition="fullscreen"}}
    <a href="{{url options="section"}}">
      <img src="{{ $image->src }}" />
    </a>
    {{/image}}

    <h2><a href="{{url options="section"}}" >{{$gimme->article->name}}</a></h2>
    <p>{{$gimme->article->deck}}</p>
  </div>



{{ /list_articles }}
</div>

</div>
{{ include file="_tpl/_html-foot.tpl" }}

</body>
</html>

