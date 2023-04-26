<!DOCTYPE html>
<html>
    <head>
        <title>
            D4Games project
        </title>

        <!--TODO: PHP Implementation! -->
        <?php include "php/header.php"; ?>
    </head>

    <body>
        <?php include "Navbar.php";?>
        <h1>Wilkommen auf D4Games</h1>

        <div>
            <p>Die ist eine online Spielewebseite, um kostenlos und werbefrei Spaß am Spielen zu haben</p><br><hr>
            <p>Wenn sie bereits eine Account erstellt haben Drücken Sie hier um sich anzumelden:</p>
            <button onclick="window.location.href='login.php';">
                anmelden 
            </button><hr>
            <br>
            <br>
            <br>
            <hr>
            <p>Wenn sie einen Account erstellt wollen Drücken Sie hier:</p>
            <button onclick="window.location.href='Reg.php';">
                registrieren 
            </button>
            <hr>

        </div>
<br><br>

 <!-- div mit id "games" um später die Spiele nur anzuzeigen, wenn der user eingeloggt ist-->   
        <div id="games">
            <p>Hier werden die Spiele angezeigt, wenn man eingeloggt ist :)</p>
        </div>

        <br>

        <div>
            <a href="impressum.html">Zum impressum</a>
        </div>
    </body>

    <?php include "php/footer.php"; ?>
</html>