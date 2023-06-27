<?php session_start(); $_SESSION["game"] = "TicTacToe"?>

<!DOCTYPE html>
<html lang="EN">

<head>
    <title>Demon Gaming</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp" crossorigin="anonymous">
    
    <link rel="stylesheet" href="D4Styles.css">
    
    <script src="games/TicTacToe/ticTacScript.js" type="module"></script>
    <script src="./indexScript.js" type="module"></script>
    <link rel="stylesheet" href="games/TicTacToe/ticTacStyle.css">
</head>

<body>
    <?php include("NavBar.php"); ?>

    <div class="row">
        <div class="col-4">
            <?php include("LeaderBoards.php");?>
        </div>
        <div class="col-8 position">
            <h1 style="color:white; font-size: 80px" >Tic Tac Toe</h1>
            <div class="board"></div>
            <div class="counter">Wins: <span id="winCount">0</span></div>
        </div>
    </div>
</body>
</html>