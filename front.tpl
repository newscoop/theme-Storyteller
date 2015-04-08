{{ include file="_tpl/_html-head.tpl" }}
<body>

list of sections. Each section contains one longform.<br />

{{ list_sections  }}

    <a href="{{url options="section"}}" >{{$gimme->section->name}}</a>

{{ /list_sections }}


{{ include file="_tpl/_html-foot.tpl" }}

</body>
</html>

