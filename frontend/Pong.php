<?php session_start(); $_SESSION["game"] = "Pong";?>
<!DOCTYPE html>
<html lang="en">

<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="games/Pong/styles.css">
    <link rel="stylesheet" href="./D4Styles.css">
    <!--Type ="module" to use modules in the code-->
    <script src="games/pong/script.js" type="module"> </script>
    <title>PONG</title>
</head>

<body>
    <?php include("NavBar.php");?>
    <div class="row" id="leaderBoardRow">
        <div class="col-sm-4">
            <?php include("LeaderBoards.php");?>
        </div>
        <div class="col-sm-8">
        </div>

    </div>
    <div id="gameField">
        <div class="username" id="username"><?php echo $_SESSION["username"]; ?></div>
        <div class="score" id="score">
            <p id="player-score">0</p>
            <p id="game-over-message" style="display: none"></p>
            <div class="center"></div>
        </div>
        <div class="grid">
            <!-- <div class="score">
        <div id="player-score">0</div>
        </div>-->
            <div id="container">
                <canvas id="game"></canvas>
            </div>
            <div class="ball" id="ball"></div>
            <div class="board left" id="player-board"></div>
            <div class="board right" id="bot-board"></div>
        </div>
    </div>
</body>

</html>