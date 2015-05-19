<section class="part parallax {{$gimme->article->css_class}}" name="{{ $gimme->article->number }}">

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
            ></div>


           <div class="content container">
              {{if $gimme->article->display_title }}
                <div class="row">

                  <div class="col-sm-12 header-fullpage">
                    <h1>{{$gimme->article->display_title}}</h1>
                    {{if $gimme->article->subtitle}}
                      <h2>{{$gimme->article->subtitle}}</h2>
                    {{/if}}
                  </div>

                </div>
              {{/if}}
          </div>
</section>