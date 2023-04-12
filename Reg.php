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
    $passwordIdentity = "";
    $fname = $email = $gender = $lname = $username = $password = $password1 = $ok= "";

    function test_input($data)
    {
      $data = trim($data);
      $data = stripslashes($data);
      $data = htmlspecialchars($data);
      return $data;
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $ok = 0;
    
        $gender = test_input($_POST["gender"]);
        $fname = test_input($_POST["fname"]);
        $lname = test_input($_POST["lname"]);
        $email = test_input($_POST["email"]);
        $username = test_input($_POST["username"]);
        $password = test_input($_POST["password"]);
        $password1 = test_input($_POST["password1"]);

        if (($_POST['password'] !== $_POST['password1'])) {
            $passwordIdentity = "Passwords dont match";
            $ok = 1;
          }
    }
    if ($ok === 0) {
        $_SESSION['gender'] = $gender;
        $_SESSION['fname'] = $fname;
        $_SESSION['lname'] = $lname;
        $_SESSION['username'] = $username;
        $_SESSION['email'] = $email;
    
    }
    ?>
    <div class="container text-container">

        <div class="row-auto">
            <h1>Sign Up</h1>
        </div>

        <form class="formstyling" method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
        <div class="row-auto">
            Gender:&nbsp;
            <input type="radio" name="gender" value="female" required>Female
            <input type="radio" name="gender" value="male">Male
            <input type="radio" name="gender" value="other">Other
        </div>

        <div class="row-auto">
            Firstname:&nbsp; <input type="text" name="fname" required>
        </div>

        <div class="row-auto">
            Lastname:&nbsp; <input type="text" name="lname" required>
        </div>

        <div class="row-auto">
            E-mail:&nbsp; <input type="email" name="email" required>
        </div>

        <div class="row-auto">
            Username:&nbsp; <input type="text" name="username" required>
        </div>

        <div class="row-auto">
            Password:&nbsp; <input type="password" name="password" required>
        </div>

        <div class="row-auto">
            Password again:&nbsp; <input type="password" name="password1" required>
        </div>

        <div class="row-auto">
            <span class="error"><?php echo $passwordIdentity; ?></span>
        </div>

        <div class="row-auto">
            <input class="btn btn-primary" type="submit" name="submit" value="Submit">
        </div>
        </form>
    </div>
    <?php 
    if(isset($_SESSION['username']))
        echo $_SESSION['username'];


    include "php/footer.php";
    ?>  
    
</body>
</html>