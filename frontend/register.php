<?php
session_start();
/*
if(isset($_POST["password"]) && isset($_POST["passwordRepeat"])){
    //checkt ob passwoerter uebereinstimmen.
    if($_POST["password"]!= $_POST["passwordRepeat"]){
        $WARNUNG = "Passwörter stimmen nicht überein! <br> Versuchen sie es erneut."; 
        echo "<h1>" . $WARNUNG . "</h1>"; 
    }else{
        require_once ('../Backend/DBaccess.php'); //Verbindungsdetails einbinden
        $db_obj = new mysqli($host, $user, $password, $database); //db_obj erzeugen und verbinden
        if ($db_obj->connect_error) {
            echo "Connection Error: " . $db_obj->connect_error;
            exit();
        }
        //Einfügen der Daten in die Datenbank mittels prepared statements
        $sql ="INSERT INTO `persons` (`Username`, `Salutation`, `Firstname`, `Lastname`, `Password`, `Usermail`, `Birthdate`)VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $db_obj->prepare($sql); 
        //Parameter binden
        $stmt-> bind_param("sssssss",$uname, $salutation, $firstname, $lastname, $pass, $mail, $datum);
        //Variablen initialisieren
        $uname = $_POST["username"]; $salutation = $_POST["salutation"]; $firstname = $_POST["firstname"]; 
        $lastname = $_POST["lastname"]; $pass = $_POST["password"]; $mail = $_POST["email"];
        $datum = $_POST["birthDate"];
        //Statement ausführen
        $stmt->execute();
        echo "SUCCESS";
    }
}*/
?>