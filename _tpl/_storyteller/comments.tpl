{{ config_load file="settings.tpl" }}

<div class="content container-fluid">
 
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-lg-6 text">
      <div id="disqus_thread"></div>
      <script>
          /**
           *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
           *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables
           */
          /*
          var disqus_config = function () {
              this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
              this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
          };
          */
          (function() {  // REQUIRED CONFIGURATION VARIABLE: EDIT THE SHORTNAME BELOW
              var d = document, s = d.createElement('script');
              
              {{ assign var="disqus" value={{ #disqus# }} }}
              {{ if $disqus == "" }}
              s.src = '//SAMPLE.disqus.com/embed.js';  // IMPORTANT: Replace EXAMPLE with your forum shortname!
              {{ else }}
              s.src = '//{{ $disqus }}.disqus.com/embed.js';  // IMPORTANT: Replace EXAMPLE with your forum shortname!
              {{ /if }}              
              s.setAttribute('data-timestamp', +new Date());
              (d.head || d.body).appendChild(s);
          })();
      </script>
      <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript" rel="nofollow">comments powered by Disqus.</a></noscript>      
    </div>
  </div>

</div>