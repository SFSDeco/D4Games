<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <!--TODO: PHP Implementation! -->
    <?php include "php/header.php"; ?>
</head>
<body>
    <?php 
    $userErr="";

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if(isset($_POST['username'])){
            $_SESSION['username'] = $_POST['username'];
            /*$_SESSION['lname'] = $_POST['lastname'];
            $_SESSION['fname'] = $_POST['firstname'];
            $_SESSION['email'] = $_POST['useremail'];
            $_SESSION['gender'] = $_POST['gender'];*/               // Muss dann wieder eingefügt werden wenn man zugriff auf die datenbank hat und geändert werden
        }
    }
      
    
    
    //Datenbank zugriff und Check der Daten muss noch eingefügt werden
    ?>





    <div class="container text-container">
            <form class="formstyling" method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
                <div class="row-auto">
                    <h1>Login</h1>
                </div>
                <div class="row-auto">
                    <span class="error"><?php echo $userErr ?></span>
                </div>
                <div class="row-auto">
                    <label for="username">Username:</label>
                    <input type="text" name="username" id="username" placeholder="username" required>
                </div>

                <div class="row-auto">
                    <label for="password">Password:</label>
                    <input type="password" name="password" id="password" placeholder="Password" required>
                </div>

                <div class="row-auto">
                    <label for="submit"></label>
                    <input class="btn btn-primary" type="submit" id="submitButton" name="btnSubmit" value="Submit">
                </div>
            </form>
            <a href="Reg.php">Account erstellen</a>
        </div>

<?php 
    if(isset($_SESSION['username']))
        echo $_SESSION['username'];


    include "php/footer.php";
?>
</body>
</html>