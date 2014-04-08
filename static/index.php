<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta title="Storyteller" />
  <script src="//code.jquery.com/jquery-2.1.0.min.js"></script>
  <link rel="stylesheet" type="text/css" href="css/storyteller.css" />
</head>
<body class="longform">
  <header>
    <h1>
      <a href="/">Site name</a>
    </h1>
    <nav>
      <ul>
        <li><a href="/">Section</a></li>
      </ul>
    </nav>
  </header>
  <section>
    <article>
    <!-- media types are listed below -->
    <?php include "modules/masthead.php"; ?>
    <?php include "modules/masthead_image.php"; ?>
    <?php include "modules/masthead_video.php"; ?>
    <?php include "modules/text.php"; ?>
    <?php include "modules/text_fixed_image.php"; ?>
    <?php include "modules/video.php"; ?>
    <?php include "modules/video_text.php"; ?>
    <?php include "modules/audio.php"; ?>
    <?php include "modules/slideshow.php"; ?>
    <?php include "modules/slideshow_text.php"; ?>
    <?php include "modules/map.php"; ?>
    <?php include "modules/map_fullscreen.php"; ?>
    </article>
  </section>
  <footer>
  </footer>
  <script src="/js/storyteller.js"></script>
</body>
</html>
