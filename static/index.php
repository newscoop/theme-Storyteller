<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta title="Storyteller" />
  <script src="//code.jquery.com/jquery-2.1.0.min.js"></script>
  <link rel="stylesheet" type="text/css" href="css/storyteller.css" />
  <link rel="stylesheet" type="text/css" href="css/bxslider/jquery.bxslider.css" />
</head>
<body class="longform">
  <header>
    <p id="collapse">Collapse/Expand the menu</p>
    <h1>
      <a href="/">Site name</a>
    </h1>
    <form id="search" name="search">
      <legend>Search</legend>
      <input type="text" placeholder="Search" />
    </form>
    <nav>
      <ul>
        <li><a href="/">Section</a></li>
      </ul>
    </nav>
  </header>
  <section>
    <article>
    <!-- media types are listed below -->
    <?php include "modules/chapter_title.php"; ?>
    <?php include "modules/masthead.php"; ?>
    <?php include "modules/masthead_image.php"; ?>
    <?php include "modules/masthead_video.php"; ?>
    <?php include "modules/text.php"; ?>
    <?php include "modules/text_fixed_image.php"; ?>
    <?php include "modules/video.php"; ?>
    <?php include "modules/text_fixed_video.php"; ?>
    <?php include "modules/audio.php"; ?>
    <?php include "modules/slideshow.php"; ?>
    <?php include "modules/slideshow_text.php"; ?>
    <?php include "modules/slideshow_text_overlay.php"; ?>
    <?php include "modules/slideshow_full_fade.php"; ?>
    <?php include "modules/slideshow_full_slide.php"; ?>
    <?php include "modules/slideshow_full_shutter.php"; ?>
    <?php include "modules/map.php"; ?>
    <?php include "modules/map_fullscreen.php"; ?>
    </article>
  </section>
  <footer>
  </footer>
  <script src="js/libs/jquery.bxslider.min.js"></script>
  <script src="js/libs/jquery.easing.1.3.js"></script>
  <script src="js/storyteller.js"></script>
</body>
</html>
