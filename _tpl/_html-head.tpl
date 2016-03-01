{{ assign var="lang" value="{{ $gimme->language->code }}" }}
{{ config_load file="strings-{{ $lang }}.tpl" }}

<!DOCTYPE html>
<!--[if lt IE 7 ]> <html lang="{{ $lang }}" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="{{ $lang }}" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="{{ $lang }}" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="{{ $lang }}" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="{{ $lang }}" id="modernizrcom" class="no-js"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <title>{{ if $gimme->article->defined }}{{ $gimme->article->name }} | {{ elseif $gimme->section->defined }}{{ $gimme->section->name }} | {{ /if }}{{ $gimme->publication->name }}</title>
  <meta name="author" content="{{$gimme->publication->name}}" >


{{ if empty($siteinfo) }}{{ $siteinfo=['description' => '', 'keywords' => ''] }}{{ /if }}
  {{* if an article is active, meta-description of web page will be article's intro, otherwise it will pull site's description from System Preferences (/Configure/System Preferences) *}}
  <meta name="description" content="{{ if $gimme->article->defined }}{{ $gimme->article->deck|strip_tags:false|strip|escape:'html':'utf-8' }}{{ else }}{{ $siteinfo.description }}{{ /if }}">
  {{* if an article is active, meta-keywords will be generated of article keywords (defined on article edit screen), otherwise it will use site-wide keywords from System Preferences (/Configure/System Preferences) *}}
  <meta name="keywords" content="{{ if $gimme->article->defined }}{{ $gimme->article->keywords }}{{ else }}{{$siteinfo.keywords}}{{ /if }}" />

  <!-- RSS & Pingback -->
  <link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="http://{{ $gimme->publication->site }}/en/static/rss/">

{{ if $gimme->article->defined }}{{* Open Graph protocol metatags for Facebook sharing *}}
  <meta property="og:title" content="{{$gimme->article->name|html_entity_decode|regex_replace:'/&(.*?)quo;/':'&quot;'}}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="http://{{ $gimme->publication->site }}{{ uri }}" />
  <meta property="og:site_name" content="{{ $gimme->publication->name }}" />
  <meta property="og:description" content="{{$gimme->article->deck|strip_tags:false|strip|escape:'html':'utf-8' }}" />
{{ list_article_images }}
  <meta property="og:image" content="{{ $gimme->article->image->imageurl }}" />
{{ /list_article_images }}
{{ /if }}


    <meta content="yes" name="apple-mobile-web-app-capable">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="shortcut icon" href="{{uri static_file="assets/img/favicon.ico"}}">
    <link rel="apple-touch-icon" href="{{uri static_file="assets/img/touch-icon.png" }}">



    <!-- grunt boilerplate -->
      <!-- assets versioning -->
      {{ assign var="VER_ENV" value="1456843666235" scope="global" }}

      <link href="{{ url static_file="assets/css/style.css?v=$VER_ENV" }}" rel="stylesheet">

      <!-- remember to put jquery in header. It is used by newscoop maps -->
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>

    <!-- /grunt boilerplate -->
</head>