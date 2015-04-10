<div class="part parallax">
          {{image rendition="fullscreen"}}
            <div class="bg-image" data-src="{{ $image->src }}"></div>
          {{/image}}

           <div class="content container">
              {{if $gimme->article->display_title }}
                <div class="row">

                  <div class="col-lg-12 header-fullpage">
                    <h1>{{$gimme->article->display_title}}</h1>
                    {{if $gimme->article->subtitle}}
                      <h2>{{$gimme->article->subtitle}}</h2>
                    {{/if}}
                  </div>

                </div>
              {{/if}}
          </div>
</div>