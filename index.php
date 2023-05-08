<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <link rel="stylesheet" href="D4Styles.css">
    <title>D4GAMES</title>
</head>

<body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
        crossorigin="anonymous"></script>
    <div calss="row">
        <?php include("NavBar.php"); ?>
    </div>

    <div class="container-fluid">

        <div class="form-popup" id="myForm">
            <form action="/action_page.php" class="form-container">
                <h1 class="h1-white">Login</h1>

                <label for="usernames" class="inputLabel"><b>Username</b></label><br>
                <input type="text" class="textInput" placeholder="Enter Username" name="username" required><br>

                <label for="psw" class="inputLabel"><b>Password</b></label><br>
                <input type="password" class="textInput" placeholder="Enter Password" name="psw" required><br>

                <button type="submit" class="btn-green" id="loginSub">Login</button>
                <button type="button" class="btn-blue" id="loginCan" onclick="closeForm()">Cancel</button>
            </form>
        </div>
        <div class="row">
            <div class="col-sm-2" id="gameList" style="  position: fixed;top: 62.5;left: 0;height: 100vh; width: 19%;">
                <div class="row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-8">
                        <div style="text-align:center;">
                            <button class="btn-blue" id="loginGameList" onclick="openForm()">Login</button>




                            <script>
                                function openForm() {
                                    document.getElementById("myForm").style.display = "block";
                                    $("#myForm").hide();
                                    $("#myForm").fadeIn(300);
                                }

                                function closeForm() {
                                    $("#myForm").fadeOut(300);
                                }
                            </script>
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
            </div>


            <div class="col-sm-10" style="width: 81%;margin-left: 19%;">

                <!-- Carousel der Homepage mit Spielen -->
                <div class="row" id="carouselRow">
                    <div id="carouselExampleCaptions" class="carousel slide">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-slide-to="0" class="active" aria-current="true"
                                aria-label="Slide 1" id="carIndicator"></button>
                            <button type="button" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="Snake.png" class="d-block w-100" alt="...">
                                <div class="overlay"> </div>
                                <div class="carousel-caption d-none d-md-block">
                                    <h4>Spiele für die Gesamte Familie</h4>
                                    <h2>Spielen sie die Klassiker von Früher</h2>
                                    <p>Some representative placeholder content for the first slide.</p>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src="PongTobi.png" class="d-block w-100" alt="...">
                                <div class="overlay"> </div>
                                <div class="carousel-caption d-none d-md-block">
                                    <h4>Spiele für die Gesamte Familie</h4>
                                    <h2>Spiele für die Gesamte Familie</h2>
                                    <p>Some representative placeholder content for the second slide.</p>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src="Memory.png" class="d-block w-100" alt="...">
                                <div class="overlay"> </div>
                                <div class="carousel-caption d-none d-md-block">
                                    <h4>Spiele für die Gesamte Familie</h4>
                                    <h2>Kompetetive Online Games</h2>
                                    <p>Some representative placeholder content for the third slide.</p>
                                </div>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

                <div class="row">
                    <h1 class="h1-white" id="ourGames-h1"> UNSERE AUSWAHL AN GRANDIOSEN SPIELEN:</h1>
                </div>

                <div class="row">

                    <div class="col-sm-2">
                        <div class="card">
                            <img src="Bubbles.png" alt="Avatar" style="width:100%" id="CardImg">
                            <div id="" container>
                                <h4><b>Bubbles</b></h4>
                                <p>Spielen sie den Klassiker Bubbles kostenlost und völlig ohne Werbung <br>Erzielen sie
                                    neue Highscores und sammeln Sie Trophäen <br> <br </p>
                                    <a></a>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-2">
                        <div class="card">
                            <img src="Memory.png" alt="Avatar" style="width:100%" id="CardImg">
                            <div id="" container>
                                <h4><b>Memory</b></h4>
                                <p>Mit dem allseits bekannten Gesellschaftsspiel bieten wir eine Möglichkeit für klein
                                    und Groß <br>mit der gesamten Familie spaß zu haben <br> <br </p>
                                    <a></a>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-2">
                        <div class="card">
                            <img src="Snake.png" alt="Avatar" style="width:100%" id="CardImg">
                            <div id="" container>
                                <h4><b>Snake</b></h4>
                                <p>Alltbekannt und altbweährt, Snake bietet mit simplen Mechaniken großen Spielspaß.
                                    Inspirert von der Legendären Vorlage bieten wir eine ganz eigene Version</p>
                                <a></a>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-2">
                        <div class="card">
                            <img src="PongTobi.png" alt="Avatar" style="width:100%" id="CardImg">
                            <div id="" container>
                                <h4><b>Pong</b></h4>
                                <p>Jeder kennt es und die meisten lieben es, Pong ist eines der Erfolgreichesten Spiele
                                    allerzeiten und wird auch heute noch täglich von einer vielzahl von Personen
                                    gespielt</p>
                                <a></a>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-2">
                        <div class="card">
                            <img src="Memory.png" alt="Avatar" style="width:100%" id="CardImg">
                            <div id="" container>
                                <h4><b>Spiel4</b></h4>
                                <p>Mit dem allseits bekannten Gesellschaftsspiel bieten wir eine Möglichkeit für klein
                                    und Groß <br>mit der gesamten Familie spaß zu haben <br> <br </p>
                                    <a></a>
                            </div>
                        </div>

                    </div>
                    <div class="col-sm-2">
                        <div class="card">
                            <img src="Memory.png" alt="Avatar" style="width:100%" id="CardImg">
                            <div id="" container>
                                <h4><b>Spiel4</b></h4>
                                <p>Mit dem allseits bekannten Gesellschaftsspiel bieten wir eine Möglichkeit für klein
                                    und Groß <br>mit der gesamten Familie spaß zu haben <br> <br </p>
                                    <a></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <h1 class="h1-white" id="oneSem">ONE SEMESTER D4GAMES</h1>
                    <div class="col-sm-3"></div>
                    <div class="col-sm-6">
                        <p class="centeredInfo-white">D4Games was founded at the beginning of this semester and has been
                            growing steadily since then. Our contributors work daily to improve the experience on our
                            site and reduce bugs. D4Games was founded at the beginning of this semester and has been
                            growing steadily since then. Our contributors work daily to improve the experience on our
                            site and reduce bugs. D4Games was founded at the beginning of this semester and has been
                            growing steadily since then. Our contributors work daily to improve the experience on our
                            site and reduce bugs.</p>
                    </div>
                    <div class="col-sm-3"></div>
                </div>
                <div class="row" style="margin-top:5rem;">
                    <div class="col-sm-6">
                        <img src="SouthPark.png" alt="" class="gridImg">
                    </div>
                    <div class="col-sm-6">
                        <h1 class="h1-white" style="margin-top:10%;">Our History</h1>
                        <p class="centeredInfo-white-bold">We at D4Games are passionate gamers and we want people
                            without powerful hardware to be able to enjoy computer games as well.<br> That's why we
                            decided to found D4Games.<br> For a semester now, we have been working to provide our users
                            with a comprehensive online experience without setting paywalls or incurring other costs.
                        </p>
                    </div>
                </div>
                <div class="row" style="margin-top:5rem;">
                    <div class="row" style="margin-top:5rem;">
                        <div class="col-sm-6">
                            <h1 class="h1-white" style="margin-top:10%;">Inspired by Education</h1>
                            <p class="centeredInfo-white-bold">We at D4Games are passionate gamers and we want people
                                without powerful hardware to be able to enjoy computer games as well.<br> That's why we
                                decided to found D4Games.<br> For a semester now, we have been working to provide our
                                users with a comprehensive online experience without setting paywalls or incurring other
                                costs.</p>
                        </div>
                        <div class="col-sm-6">
                            <img src="Technikum.jpg" alt="" class="gridImg">
                        </div>
                    </div>
                    <div class="row" style="margin-top:5rem; background-color:#3a2e43;">
                        <div class="col-sm-2"></div>
                        <div class="col-sm-2">
                            <ul>
                                <h3 class="h3-white">Über uns</h3>
                                <a class="li-white">Impressum</a><br>
                                <a class="li-white">Hilfe</a><br>
                                <a class="li-white">Datenschutz</a><br>
                                <a class="li-white">Forum</a><br>
                                <a class="li-white">FAQ</a><br>
                                <a class="li-white">Geschichte</a><br>
                                <a class="li-white">Allgemeine Geschäftsgedingungen</a><br>
                            </ul>
                        </div>
                        <div class="col-sm-2">
                            <ul>
                                <h3 class="h3-white">Konto</h3>
                                <a class="li-white">Profil</a><br>
                                <a class="li-white">Datenschutz</a><br>
                                <a class="li-white">Kennwort ändern</a><br>
                                <a class="li-white">Nutzername ändern</a><br>
                                <a class="li-white">Persönliche Daten</a><br>
                                <a class="li-white">Trophäen</a><br>
                            </ul>
                        </div>
                        <div class="col-sm-2">
                            <ul>
                                <h3 class="h3-white">Kontakt</h3>
                                <a class="li-white">Mail:<br> d4games@gmx.at</a><br>
                                <br>
                                <a class="li-white">Hotline: <br>+43664123421</a><br>
                            </ul>
                        </div>
                        <div class="col-sm-2">
                            <ul>
                                <h3 class="h3-white">Location</h3>
                                <p class="centeredInfo-white-sm">FH-Technikum Wien,<br>
                                    Hochstädtplatz-09,<br>
                                    1200-Wien,<br>
                                    Metro: Dresdner Straße
                        </div>
                        <div class="col-sm-2"></div>
                    </div>
                </div>
            </div>

</body>

</html>