<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta title="Storyteller" />
  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
  <link rel="stylesheet" type="text/css" href="css/storyteller.css" />
</head>
<body>
  <header>
  </header>
  <section>
    <article>
    <!-- media types are listed below -->
    <?php include "modules/video.php"; ?>
    <?php include "modules/video_text.php"; ?>
    <?php include "modules/audio.php"; ?>
    <?php include "modules/slideshow.php"; ?>
    <?php include "modules/slideshow_text.php"; ?>
    <?php include "modules/masthead.php"; ?>
    <?php include "modules/masthead_image.php"; ?>
    <?php include "modules/masthead_video.php"; ?>
    </article>
  </section>
  <footer>
  </footer>
  <script src="js/storyteller.js"></script>
</body>
</html>
