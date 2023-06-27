
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
</head>

<body>
    <div class="col-sm-2" id="gameList" style="position: fixed;top: auto;">
        <div class="container">
            <div class="row">
                <div class="col-sm-2"></div>
                <div class="col-sm-8" style="align-items:center;">
                    <?php if (isset($_SESSION["Loggedin"]) && $_SESSION["Loggedin"] == true) {
                        // User ist eingeloggt, Button ausblenden
                        echo '<!-- Kein Button anzeigen -->';
                    } else {
                        // User ist nicht eingeloggt, Button anzeigen
                        echo '<button class="btn-blue" id="loginGameList" onclick="openForm()">Login</button>';
                    } ?>
                </div>
                <div class="col-sm-2"></div>
            </div>
            <div class="row">
                <h1 class="h1-white" style="background-color:#3a2e43; margin-bottom:0; text-align:center;">Our Games</h1>
            </div>
            <div class="row darkRow">
                <a class="gameLink" href="DoodleJump.php">Moodle Jump</a>
            </div>
            <div class="row  lightRow">
                <a class="gameLink" href="StickHero.php">Stick Hero</a>
            </div>
            <div class="row darkRow">
                <a class="gameLink" href="solitaire.php">Solitaire</a>
            </div>
            <div class="row  lightRow">
                <a class="gameLink" href="demon.php">Tic-Tac-Toe</a>
            </div>
            <div class="row darkRow">
                <a class="gameLink" href="Snake.php">Snake</a>
            </div>
            <div class="row lightRow">
                <a class="gameLink" href="chess.php">Chess</a>
            </div>
            <div class="row darkRow">
                <a class="gameLink" href="Pong.php">Pong</a>
            </div>
            <div class="row lightRow">
                <a class="gameLink" href="minesweeper.php">Minesweeper</a>
            </div>

            <div class="row" id="UserMenu">
                <div class="col-sm-12">
                <a href="Profile.php" style="text-decoration:none;">
                    <button class="MenuBtn" href="Profile.php">
                        <img src="Images/Settings.png" alt="" class="MenuImg">
                        <span class="button-text">Settings</span>
                    </button>
                    </a>
                    <a href="Hilfe.php" style="text-decoration:none;">
                    <button class="MenuBtn">
                        <img src="Images/Support.png" alt="" class="MenuImg"> <span class="button-text">Support</span>
                    </button>
                    </a>
                    <button class="MenuBtn" onclick="logoutUser()">
                        <img src="Images/Logout.png" alt="" class="MenuImg"> <span class="button-text">Logout</span>
                    </button>
                </div>
            </div>
        </div>
    </div>




</body>

</html>