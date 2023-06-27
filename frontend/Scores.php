<?php include("login.php");
if (isset($_POST["SelectLeaderBoard"])) {
    $_SESSION["game"] = $_POST["SelectLeaderBoard"];
} ?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="IndexScript.js"></script>
    <link rel="stylesheet" href="D4Styles.css">
    <title>D4GAMES</title>
</head>

<body>


    <div class="container-fluid">
        <div calss="row"> <?php include("NavBar.php"); ?></div>
        <div class="row">
            <div class="col-sm-4"></div>
            <div class="col-sm-4">
                <form action="Scores.php" method="POST" name="SelectLeaderBoard" id="SelectLeaderBoard">
                    <select name="SelectLeaderBoard">
                        <option value="Moodle Jump">Moodle Jump</option>
                        <option value="StickHero">Stick Hero</option>
                        <option value="TicTacToe">Tic-Tac-Toe</option>
                        <option value="Snake">Snake</option>
                        <option value="Minesweeper">Minesweeper</option>
                        <option value="Pong">Pong</option>
                    </select>
                    <input type="submit" class="btn-blue" value="Submit"></input>
                </form>
            </div>
            <div class="col-sm-4"></div>
        </div>
        <div class="row" style="margin-bottom:400px;">
            <div class="col-sm-4"></div>
            <div class="col-sm-4"><?php include("LeaderBoards.php"); ?></div>
            <div class="col-sm-4"></div>
        </div>
    </div>
    <?php include("footer.php"); ?>
</body>