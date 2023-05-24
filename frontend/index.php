<?php include("login.php"); ?>
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
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
        crossorigin="anonymous"></script>
    <div calss="row">
        <?php include("NavBar.php"); ?>
    </div>

    <div class="container-fluid">
        <div class="form-popup" id="myForm">
            <form action="index.php" class="form-container" method="POST">
                <h1 class="h1-white">Login</h1>

                <label for="username" class="inputLabel"><b>Username</b></label><br>
                <input type="text" class="textInput" placeholder="Enter Username" name="username" id="username"
                    required><br>

                <label for="psw" class="inputLabel"><b>Password</b></label><br>
                <input type="password" class="textInput" placeholder="Enter Password" name="psw" id="psw" required><br>

                <input type="submit" class="btn-green" id="loginSub" value="Login"></input>
                <button type="button" class="btn-blue" id="loginCan" onclick="closeForm()">Cancel</button>
            </form>
        </div>
        <div class="row">
            <?php
            include("VerticalMenu.php");
            ?>
            <div class="col-sm-10" style="width: autp;margin-left: auto;">

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
                                <img src="Images/Snake.png" class="d-block w-100" alt="...">
                                <div class="overlay"> </div>
                                <div class="carousel-caption d-none d-md-block">
                                    <h4>Spiele für die Gesamte Familie</h4>
                                    <h2>Spielen sie die Klassiker von Früher</h2>
                                    <p>Some representative placeholder content for the first slide.</p>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src="Images/PongTobi.png" class="d-block w-100" alt="...">
                                <div class="overlay"> </div>
                                <div class="carousel-caption d-none d-md-block">
                                    <h4>Spiele für die Gesamte Familie</h4>
                                    <h2>Spiele für die Gesamte Familie</h2>
                                    <p>Some representative placeholder content for the second slide.</p>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <img src="Images/Memory.png" class="d-block w-100" alt="...">
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
                            <img src="Images/Bubbles.png" alt="Avatar" style="width:100%" id="CardImg">
                            <div id="" container>
                                <h4><b>Bubbles</b></h4>
                                <p>Spielen sie den Klassiker Bubbles kostenlost und völlig ohne Werbung <br>Erzielen
                                    sie
                                    neue Highscores und sammeln Sie Trophäen <br> <br> </p>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-2">
                        <div class="card">
                            <img src="Images/Memory.png" alt="Avatar" style="width:100%" id="CardImg">
                            <div id="" container>
                                <h4><b>Memory</b></h4>
                                <p>Mit dem allseits bekannten Gesellschaftsspiel bieten wir eine Möglichkeit für
                                    klein
                                    und Groß <br>mit der gesamten Familie spaß zu haben <br> <br> </p>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-2">
                        <div class="card">
                            <img src="Images/Snake.png" alt="Avatar" style="width:100%" id="CardImg">
                            <div id="" container>
                                <h4><b>Snake</b></h4>
                                <p>Alltbekannt und altbweährt, Snake bietet mit simplen Mechaniken großen Spielspaß.
                                    Inspirert von der Legendären Vorlage bieten wir eine ganz eigene Version</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-2">
                        <div class="card">
                            <img src="Images/PongTobi.png" alt="Avatar" style="width:100%" id="CardImg">
                            <div id="" container>
                                <h4><b>Pong</b></h4>
                                <p>Jeder kennt es und die meisten lieben es, Pong ist eines der Erfolgreichesten
                                    Spiele
                                    allerzeiten und wird auch heute noch täglich von einer vielzahl von Personen
                                    gespielt</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-2">
                        <div class="card">
                            <img src="Images/Memory.png" alt="Avatar" style="width:100%" id="CardImg">
                            <div id="" container>
                                <h4><b>Spiel4</b></h4>
                                <p>Mit dem allseits bekannten Gesellschaftsspiel bieten wir eine Möglichkeit für
                                    klein
                                    und Groß <br>mit der gesamten Familie spaß zu haben <br> <br> </p>
                            </div>
                        </div>

                    </div>
                    <div class="col-sm-2">
                        <div class="card" onClick="handleCardClick()">
                            <img src="Images/Memory.png" alt="Avatar" style="width:100%" id="CardImg">
                            <h4><b>Spiel4</b></h4>
                            <p>Mit dem allseits bekannten Gesellschaftsspiel bieten wir eine Möglichkeit für klein
                                und Groß mit der gesamten Familie Spaß zu haben.</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <h1 class="h1-white" id="oneSem">ONE SEMESTER D4GAMES</h1>
                    <div class="col-sm-3"></div>
                    <div class="col-sm-6">
                        <p class="centeredInfo-white-mid">D4Games was founded at the beginning of this semester and
                            has been
                            growing steadily since then. Our contributors work daily to improve the experience on
                            our
                            site and reduce bugs. D4Games was founded at the beginning of this semester and has been
                            growing steadily since then. Our contributors work daily to improve the experience on
                            our
                            site and reduce bugs. D4Games was founded at the beginning of this semester and has been
                            growing steadily since then. Our contributors work daily to improve the experience on
                            our
                            site and reduce bugs.</p>
                    </div>
                    <div class="col-sm-3"></div>
                </div>
                <div class="row" style="margin-top:5rem;">
                    <div class="col-sm-6">
                        <img src="Images/SouthPark.png" alt="" class="gridImg-left">
                    </div>
                    <div class="col-sm-6">
                        <h1 class="h1-white">Our History</h1>
                        <p class="centeredInfo-white-bold">We at D4Games are passionate gamers and we want people
                            without powerful hardware to be able to enjoy computer games as well.<br> That's why we
                            decided to found D4Games.<br> For a semester now, we have been working to provide our
                            users
                            with a comprehensive online experience without setting paywalls or incurring other
                            costs.
                        </p>
                    </div>
                </div>

                <div class="row" style="margin-top:5rem;">
                    <div class="col-sm-6">
                        <h1 class="h1-white">Inspired by Education</h1>
                        <p class="centeredInfo-white-bold">We at D4Games are passionate gamers and we want people
                            without powerful hardware to be able to enjoy computer games as well.<br> That's why we
                            decided to found D4Games.<br> For a semester now, we have been working to provide our
                            users with a comprehensive online experience without setting paywalls or incurring other
                            costs.</p>
                    </div>
                    <div class="col-sm-6">
                        <img src="Images/Technikum.jpg" alt="" class="gridImg-right">
                    </div>
                </div>
                <?php include("footer.php"); ?>

            </div>
        </div>
</body>

</html>