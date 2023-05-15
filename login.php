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
?>

