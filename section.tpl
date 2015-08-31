{{ $lang = $gimme->issue->language->code }}
{{ config_load file="strings-{{ $lang }}.tpl" }}

{{ include file="_tpl/_html-head.tpl" }}
<body class="longform"{{ if $gimme->browser->ua_type == "mobile" }} mobile{{ /if }}>
<article>

{{ list_articles  constraints="type is storyteller"}}
  <div class="landingpage" >

      <div class="bg-image"
        {{image rendition="fullscreen"}}
          data-src="{{ $image->src }}"
        {{/image}}

        {{image rendition="fullscreen_medium"}}
          data-srcMedium="{{ $image->src }}"
        {{/image}}

        {{image rendition="fullscreen_phone"}}
          data-srcPhone="{{ $image->src }}"
        {{/image}}
      >
      </div>


    <div class="content container">
      <div class="row">

          <div class="col-lg-12 header-fullpage">
              <div class="middle">
                  <h1>{{$gimme->article->name}}</h1>


                  <a href="{{url options="article"}}" class="startButton" >{{ #open# }}</a>

              </div>
          </div>

     </div>
   </div>

  </div>

{{ /list_articles }}

</article>
{{ include file="_tpl/_html-foot.tpl" }}

</body>
</html>

