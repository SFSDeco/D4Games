<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp" crossorigin="anonymous">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
        <link rel="stylesheet" href="D4Styles.css">
        <title>D4GAMES</title>
    <!--TODO: PHP Implementation! -->
</head>
<body>
<div calss="row"> <?php include("NavBar.php");?></div>
    <div class="container-fluid">
        <div class = "row">
        <div class = "col-sm-4"></div>
        <div class = "col-sm-4">
        <form class="formstyling" method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
                <div class="row-auto">
                    <h1 class="h1-white">Sing-Up</h1>
                </div>
                <div class="row-auto">
                </div>
                <div class="row-auto">
                    <label for="salutation" class="inputLabel">Salutation:</label><br>
                    <select name="salutation" id="salutation">
                    <option value="Mr">Mr.</option>
                    <option value="Mrs">Mrs.</option>
                    <option value="Ms">Ms.</option>
                    <option value="Div">Div.</option>
                </select><br><br>
                </div>
                <div class="row-auto">
                    <label for="password" class="inputLabel">Birth-Date:</label><br>
                    <input type="date" name="password" id="password" class="textInput" placeholder="Password" required>
                </div>
                <div class="row-auto">
                    <label for="firstname" class="inputLabel">First Name:</label><br>
                    <input type="text" name="firstname" id="firstname" class="textInput" placeholder="First Name" required>
                </div>
                <div class="row-auto">
                    <label for="lastname" class="inputLabel">Last Name:</label><br>
                    <input type="text" name="lastname" id="lastname" class="textInput" placeholder="Last Name" required>
                </div>
                <div class="row-auto">
                    <label for="email" class="inputLabel">Email:</label><br>
                    <input type="email" name="email" id="email" class="textInput" placeholder="Email" required>
                </div>
                <div class="row-auto">

                <div class="row-auto">
                    <label for="username" class="inputLabel">Username:</label><br>
                    <input type="text" name="username" id="username" class="textInput" placeholder="Username" required>
                </div>
                <div class="row-auto">
                    <label for="password" class="inputLabel">Password:</label><br>
                    <input type="password" name="password" id="password" class="textInput" placeholder="Password" required>
                </div>

                <div class="row-auto">
                    <label for="submit"></label>
                    <input class="btn-green" type="submit" id="submitButtonSignUp" name="btnSubmit" value="Submit">
                </div>
            </form>
        </div>
        <div class = "col-sm-4"></div> 
        </div>           
        </div>
        <?php include("footer.php");?>
</body>
</html>