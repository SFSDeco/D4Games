<div class="col-sm-2" id="gameList" style="  position: fixed;top: 62.5;left: 0;height: 100vh; width: 19%;">
                <div class="row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-8">
                        <div style="text-align:center;">
                            <?php if (isset($_SESSION["Loggedin"]) && $_SESSION["Loggedin"] == true) {
                                // User ist eingeloggt, Button ausblenden
                                echo '<!-- Kein Button anzeigen -->';
                            } else {
                                // User ist nicht eingeloggt, Button anzeigen
                                echo '<button class="btn-blue" id="loginGameList" onclick="openForm()">Login</button>
                                ';
                            } ?>
                        </div>
                    </div>
                    <div class="col-sm-2"></div>
                </div>
                <div class="row">
                    <h1 class="h1-white" style="background-color:#3a2e43; margin-bottom:0;">Unsere Spiele</h1>
                </div>
                <div>
                    <div class="row darkRow">
                        <a class="gameLink" href="index.php">Moodle Jump</a>
                    </div>
                    <div class="row  lightRow">
                        <a class="gameLink" href="index.php">Pong</a>
                    </div>
                    <div class="row darkRow">
                        <a class="gameLink" href="index.php">Memory</a>
                    </div>
                    <div class="row  lightRow">
                        <a class="gameLink" href="index.php">Tic-Tac-Toe</a>
                    </div>
                    <div class="row darkRow">
                        <a class="gameLink" href="index.php">Snake</a>
                    </div>
                    <div class="row lightRow">
                        <a class="gameLink" href="index.php">Bubbles</a>
                    </div>
                    <div class="row darkRow">
                        <a class="gameLink" href="index.php">Anygame</a>
                    </div>
                    <div class="row lightRow">
                        <a class="gameLink" href="index.php">Anygame</a>
                    </div>
                </div>

                <?php if($_SESSION["Loggedin"]==true){
                    include("UserMenu.php");
                } ?>
            </div>