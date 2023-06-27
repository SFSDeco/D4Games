<?php session_start(); $_SESSION["game"] = "Snake"?>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Snake</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <link rel="stylesheet" href="./D4Styles.css">
<link rel="stylesheet" href="./games/Snake/Snake.css">
</head>
<body>
    <?php include("NavBar.php");?>
    <div class="row">
        <div class="col-sm-3">
            <?php include("LeaderBoards.php");?>
        </div>
        <div class="col-sm-9">
            <canvas id="canvas" width="960" height="640"></canvas>
        </div>
    </div>
<script type="text/javascript" src="./games/Snake/Snake.js"></script>    
</body>
</html>