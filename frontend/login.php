<?php
session_start();
if (!isset($_SESSION["Loggedin"])) {
    $_SESSION["Loggedin"] = false;
}

$password = "Admin.123";
$passwordHashed = hash('sha256', $password);

if (isset($_POST["username"])) {
    $_SESSION["username"] = $_POST["username"];
}

if (isset($_POST["psw"])) {
    $UserPassword = $_POST["psw"];
    $UserPasswordHashed = hash('sha256', $UserPassword);
}

if (isset($UserPasswordHashed)) {
    if ($UserPasswordHashed == $passwordHashed) {
        $_SESSION["Loggedin"] = true;
    }
}

function singUp(){
    $birthDate = $_POST["birthDate"];
    $salutation = $_POST["salutation"];
    $firstName = $_POST["firstname"];
    $lastName = $_POST["lastname"];
    $email = $_POST["email"];
    $username = $_POST["username"];
    $password = hash('sha256',$_POST["password"]);
    $passwordRepeat = hash('sha256',($_POST["passwordRepeat"]));
    if($password == $passwordRepeat){
        //User in DB einfügen mir ajax Call, sodass die Seite nich neu geladen werdn muss;
    }
}
?>

