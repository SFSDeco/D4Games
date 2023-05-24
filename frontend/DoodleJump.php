<?php session_start(); ?>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="IndexScript.js"></script>
    <link rel="stylesheet" href="D4Styles.css">
    <title>D4GAMES</title>
  <style>
    html, body {
      height: 100%;
      background-color: #463751;
    }

    canvas {
      background-image: url("Images/DoodleBackground.jpg");
      background-repeat: repeat;
    }
  </style>
</head>
<body>
<?php include("NavBar.php"); ?>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-4">
      <?php
            include("LeaderBoards.php");
            ?>
      </div>
      <div class="col-sm-4">
      <h1 id="Score" class="h1-white">Score:</h1>
      <canvas width="600" height="735" id="game"></canvas>
      </div>
      <div class="col-sm-4">

      </div>
    </div>
  </div>
  
<button class="btn-green" id="startDoodleJump" onclick="startGame()" style=" width:10%;position:fixed; top:50%; left:47.5%;">GO!</button>
<script src="DoodleJump.js"></script>
</body>
</html>
