<?php session_start(); $_SESSION["game"] = "StickHero"?>

  <!DOCTYPE html>
<html lang="en">
<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="D4Styles.css">
    <link rel="stylesheet" href="games/StickHero/stickStyle.css">
    <!--Type ="module" to use modules in the code-->
    <script src="games/StickHero/stickScript.js" type="module"> </script>
    <script src="indexScript.js" type="module"> </script>
    <title>Stick Hero</title>
</head>
<body>
<?php include("NavBar.php"); ?>
    <div class="row">
        <div class="col-sm-4"style="padding:0;">
            <?php
                  include("LeaderBoards.php");
                  ?>
            </div>
    <div class="col-sm-8">
        <div class="container">
            <div id="score"></div>
            <div id="high-score"></div>
            <canvas id="game" width="375" height="375"></canvas>
            <div id="introduction">Hold down the mouse to stretch out a stick</div>
            <div id="perfect">DOUBLE SCORE</div>
            <button id="restart">RESTART</button>
        </div>
    </div>
    </div>
</body>
</html>