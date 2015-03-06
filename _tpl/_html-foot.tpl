<script src="{{ url static_file="assets/js/libs/modernizr-2.0.6.js" }}"></script>
{{ if $gimme->article->type_name == "storyteller" }}
<script src="{{ url static_file="assets/js/storyteller/libs/jquery.bxslider.min.js" }}"></script>
<script src="{{ url static_file="assets/js/storyteller/libs/jquery.dotimeout.1.0.js" }}"></script>
<script src="{{ url static_file="assets/js/storyteller/libs/jquery.easing.1.3.js" }}"></script>
<script src="{{ url static_file="assets/js/libs/skrollr/skrollr-master/dist/skrollr.min.js" }}"></script>
<script type="text/javascript">
  var s = skrollr.init();
</script>
<script src="{{ url static_file="assets/js/storyteller/StoryTellerClass.js?v=1.2.9" }}"></script>
{{ if $gimme->article->dthree }}
<script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.4.8/d3.min.js"></script>
{{ /if }}
{{ else }}
<script src="{{ uri static_file="assets/js/libs/jquery.jcarousel.min.js" }}"></script>

<!--[if (gte IE 6)&(lte IE 8)]>
<script type="text/javascript" src="{{ uri static_file="assets/js/libs/selectivizr-min.js" }}"></script>
<![endif]-->

{{ if $gimme->article->defined }}
<script src="{{ url static_file='assets/js/article-rating.js?v=1.0' }}"></script>
{{ /if }}

<script src="{{ uri static_file="assets/js/init.js?v=1.0" }}"></script>
<script src="{{ url static_file='assets/js/plugins.js?v=1.0' }}"></script>
<script src="{{ url static_file='assets/js/script.js?v=1.0' }}"></script>
{{ /if }}
