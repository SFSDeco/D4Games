<!DOCTYPE html>
<html>
    <header>
        <title>Username Profil</title>
    </header>

    <!--TODO: PHP Implementation! -->
    <?php include "php/header.php"; ?>
<br><br>

    <body>
        <?php include "Navbar.php";?>
        <!-- div for bootstrap container-->
        <div>
            <h1>Profil:</h1>
            <div>
                <form method="post" action="">
                    <label for="uname">Neuer Username?:</label><br>
                    <input type="text" id="uname" name="uname" value='Placeholderusername'><br>
                    <button id="submit" type="submit">Update Name</button>
                </form>
            </div>
            <div>
                <form method="post" action="">
                    <label for="email">Neue Email?:</label><br>
                    <input type="text" id="email" name="email" value="Placeholderemail"><br>
                    <button id="submit" type="submit">Update Name</button>
                </form>
            </div>
            
            <div class="container">
                <form method="post" action="">
                    <label for="oldpw">Altes Passwort:</label><br>
                    <input type="password" id="oldpw" name="oldpw" class=""><br>
                    <label for="passwort">Neues Passwort:</label><br>
                    <input type="password" id="passwort" name="passwort" class="" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}"><br>
                    <label for="pww">Neues Passwort wiederholen:</label><br>
                    <input type="password" id="pww" name="pww" class="" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}"><br>
                    <button id="submit" type="submit">Update Passwort</button>
                </form>
            </div>
        </div>

        <div>
            <h1>Highscores:</h1>

            <table>
                <tr>
                    <th>Spiel</th>
                    <th>Score</th>
                </tr>
                <tr>
                    <td>Wow such game</td>
                    <td>9000+</td>
                </tr>
            </table>
        </div>
    </body>

    <?php include "php/footer.php"; ?>
</html>