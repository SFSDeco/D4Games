<?php
session_start();
/*
//Falls Username und Passwort eingegeben wurde werden die (SESSION) Variablen gesetzte (passwort wird gehashed)
if(isset($_POST["username"]) && isset($_POST["psw"])){
    $username = $_POST["username"];
    $pass = $_POST["psw"];
    $_SESSION["Username"] = $_POST["username"];
    //Ausgabe der Nutzerdaten aus der Datenbank
    require_once ('../Backend/DBaccess.php'); //Verbindungs details einbinden
    //db_obj anlegen und verbinden/Backend
    $db_obj = new mysqli($host, $user, $password, $database);
    //Error ausgeben fals die Verbindung fehlschlägt
    if ($db_obj->connect_error){
        echo "Connection Error: " . $db_obj->connect_error;
        exit();
    }
    //User auswählen dessen Username eingegeben wurde
    $sql ="SELECT * FROM persons WHERE Username = '$username'";
    $result = $db_obj->query($sql);
    $row = $result->fetch_array();
    //Passwort variablen setzen und mit eintrag aus der Datenbank vergleichen (gehashed)
    $pass1 = $row["Password"];
    echo $pass1;
    $_SESSION["password"] = $pass;
    //Falls das passwort übereinstimmt wird man eingeloggt ansonsten wird eine Fehlermeldung ausgegeben
    if($pass == $pass1){
        $_SESSION["Loggedin"] = true;
        header('Location: index.php');
    }else{
        $WARNUNG = "Falcher Benutzername oder Passwort, bitte versuchen sie es erneut.";
    }
    $db_obj->close();
}*/
?>




