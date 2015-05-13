{{if $gimme->article->display_title }}
  <div class="row">
    {{if $gimme->article->full_page_title}}
      <div class="col-lg-8 header-fullpage">
          <div class="middle">
              <h1>{{$gimme->article->display_title}}</h1>
              {{if $gimme->article->subtitle}}
                <h2>{{$gimme->article->subtitle}}</h2>
              {{/if}}
          </div>
      </div>
    {{else}}
      <div class="col-lg-8 header">

              <h1>{{$gimme->article->display_title}}</h1>
              {{if $gimme->article->subtitle}}
                <h2>{{$gimme->article->subtitle}}</h2>
              {{/if}}

      </div>
    {{/if}}
 </div>
{{/if}}