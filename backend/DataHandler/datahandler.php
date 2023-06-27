<?php
include("./models/scores.php");
include("./models/player.php");
include("./models/highscore.php");
require_once("./DBaccess.php");
session_start();

class DataHandler
{   

    public static $db;
    public static $dbaccess;

    public function __construct() {
        self::$dbaccess = new DBaccess();
        self::$db = self::$dbaccess->connect();
    }




//Most of the functions in the datahandler get parameters from the Frontend and use the 
//either to insert data in the database or query data in the database
//functions with names like query, get, or search at the beginning are used to query data from the database
//funtcions with names like insert, or set at the beginning are used to insert data in Database
//functions with names like update or alter at the beginning are used to change data in the database

    //function to query a score by playerId
    public function queryScoresPerPlayer($param)
    {
        $sql = "SELECT * FROM scores WHERE P_ID=$param;";
        $res = self::$db->query($sql);
        $data=[];
        $i=0;
        while($row=$res->fetch_array()){
            $data[$i]=$row;
            $i++;
        }
        return $data;
    }

    //function to query score by gameID
    public function queryScoresPerGame($param)
    {
        $sql = "SELECT * FROM scores WHERE P_ID=$param;";
        $res = self::$db->query($sql);
        $data=[];
        $i=0;
        while($row=$res->fetch_array()){
            $data[$i]=$row;
            $i++;
        }
        return $data;
    }

    //function to submit scores in database
    public function submitScore($param){
        $playerID = $param["playerID"];
        $gameID = $param["gameID"];
        $score = $param["score"];

        $sql = "INSERT INTO scores (Score, P_ID, G_ID) VALUES (?,?,?)";
        $stmt = self::$db->prepare($sql);
        $stmt->bind_param("iii",$score, $playerID, $gameID);
        $stmt->execute();
    }


    //function to insert new User in database
    public function submitPlayer($param){
        
        $salutation = $param[0];
        $usermail = $param[1];
        $birthDate = $param[2];
        $firstname = $param[3];
        $lastname = $param[4];
        $username = $param[5];
        $password = $param[6];
        
       
    
        $sql = "INSERT INTO persons (Username,Firstname,Lastname, Usermail, Password,Birthdate,Salutation) VALUES (?,?,?,?,?,?,?)";
        $stmt = self::$db->prepare($sql);
        $stmt->bind_param("sssssss",$un,$fn,$ln,$um,$pw,$bd,$sal);
        $un = $username; $fn = $firstname; $ln = $lastname; $bd = $birthDate; $um = $usermail; $pw = $password; $sal = $salutation;
        if($stmt->execute()){
            return "Successful Insert";
        }
        return "Oompa Loompa";
    }


    //function to search user in database
    public function searchPlayer($param){
        $username = $param;
        $data = [];
        $username = $_SESSION["username"];
       
        $sql = "SELECT * FROM persons WHERE Username like '$username'";
        $res = self::$db->prepare($sql);
        $res->execute();
        $res->bind_result($id,$username,$firstname,$lastname,$email,$password,$birthDate,$salutation);
        
        while($res->fetch()){
            $data[] = new Player($firstname, $lastname, $username,$email,$birthDate,$salutation,$password);
        }
        return $data;
    }

    //backend function to log the user in
    public function loginUser($param){
        $username = $param[0]; $password = $param[1];
        if(!isset($_SESSION["Loggedin"])){
            $sql = "SELECT password FROM persons WHERE Username LIKE ?";
            $stmt = self::$db->prepare($sql);
            //Prepared Statements um gegen Injection vorzubeugen
            $stmt->bind_param("s", $un);
            $un = $param[0];
            $stmt->execute();
            $stmt->bind_result($pword);
            if($stmt->fetch()){
                if($pword === $password){
                    $_SESSION["username"]=$username;
                    $_SESSION["Loggedin"] = true;
                }else{
                    $WARNUNG = "Falscher Benutzername oder Passwort, bitte versuchen sie es erneut.";
                }
                return $username;
            }
        }
        return "Did not work";
    }

//backend function to get the Leaderboards from the Database
    public function getLeaders(){
        $result=[];
        $game = $_SESSION["game"];
        $sql = "SELECT username, score FROM scores 
                INNER JOIN persons ON scores.p_id = persons.id
                INNER JOIN games ON scores.g_id = games.id
                WHERE games.name LIKE ?
                ORDER BY score DESC
                LIMIT 13";
        $stmt = self::$db->prepare($sql);
        $stmt->bind_param("s", $g);
        $g = $game;
        $stmt->execute();
        $stmt->bind_result($user, $score);
        while($stmt->fetch()){
            //Jedes result wird in ein Array von Termin Objekten geschrieben
            $result[] = new Highscore($user, $score);
        }
        self::$db->close();
        return $result;
    }

//function that gets a playername as parameter and returns the corresponding game
    public function getGameID($game){
        $invalid = -1;
        $sql = "SELECT id FROM games WHERE name LIKE '$game'";
        $stmt = self::$db->prepare($sql);
        $stmt->execute();
        $stmt->bind_result($id);
        if($stmt->fetch()){
            return $id;
        }
        return $invalid;
    }

    //function that gets username as parameter and returns corresponding userID
    public function getPlayerID($user){
        $invalid = -1;
        $sql = "SELECT id FROM persons WHERE username LIKE '$user'";
        $stmt = self::$db->prepare($sql);
        $stmt->execute();
        $stmt->bind_result($id);
        if($stmt->fetch()){
            return $id;
        }
        return $invalid;
    }

    //function that inserts a score in the database
    public function setLeader($param){
        $gameid = $this->getGameID($_SESSION["game"]);
        $userid = $this->getPlayerID($_SESSION["username"]);
        $sql = "INSERT INTO scores (score, p_id, g_id) VALUES (?, ?, ?)";
        $stmt = self::$db->prepare($sql);
        $stmt->bind_param("iii", $sc, $pi, $gi);
        $sc = $param; $pi = $userid; $gi = $gameid;
        if($stmt->execute()){
            return "Succesful Insert";
        }
        
        return "Invalid";
    }

    //function to log the user out and destroy the session
    public function Logout(){
        if(isset($_SESSION["Loggedin"])){
            session_destroy();
            unset($_SESSION["Loggedin"]);
            unset($_SESSION["username"]);
            return "Successfully logged out.";
        }
        return "Error, not logged in.";
    }




    // Below are functions to update userdata in the database

    //function to update username in database
    public function alterUsername($param){
        $username=$_SESSION["username"];
        $sql = "UPDATE persons 
                SET username = ? 
                WHERE username LIKE '$username'";
        $stmt = self::$db->prepare($sql);
        $stmt->bind_param("s",$un);
        $un = $param;
        if($stmt->execute()){
            $_SESSION["username"]=$param;
            return("successAlter");
        }
        return("errorAlter");
        
        
    }

    //function to update users lastname in database

    public function alterLastname($param){
        $username=$_SESSION["username"];
        $sql = "UPDATE persons 
                SET Lastname = ? 
                WHERE username LIKE '$username'";
        $stmt = self::$db->prepare($sql);
        $stmt->bind_param("s",$ln);
        $ln = $param;
        $stmt->execute();
        return("successAlter");
        
    }

    //function to update users firstname in database
    public function alterFirstname($param){
        $username=$_SESSION["username"];
        $sql = "UPDATE persons 
                SET Firstname = ? 
                WHERE username LIKE '$username'";
        $stmt = self::$db->prepare($sql);
        $stmt->bind_param("s",$fn);
        $fn = $param;
        $stmt->execute();
        return("successAlter");
        
    }

    //function to update users salutation in database
    public function alterSalutation($param){
        $username=$_SESSION["username"];
        $sql = "UPDATE persons 
                SET Salutation = ? 
                WHERE username LIKE '$username'";
        $stmt = self::$db->prepare($sql);
        $stmt->bind_param("s",$sa);
        $sa = $param;
        $stmt->execute();
        return("successAlter");
        
    }

    //function to update users birth-date in database
    public function alterBirthDate($param){
        $username=$_SESSION["username"];
        $sql = "UPDATE persons 
                SET BirthDate = ? 
                WHERE username LIKE '$username'";
        $stmt = self::$db->prepare($sql);
        $stmt->bind_param("s",$bd);
        $bd = $param;
        $stmt->execute();
        return("successAlter");
        
    }


    //function to update users password in database
    public function alterPassword($param){
        $username=$_SESSION["username"];
        $sql = "UPDATE persons 
                SET 'Password' = ? 
                WHERE username LIKE '$username'";
        $stmt = self::$db->prepare($sql);
        $stmt->bind_param("s",$pw);
        $pw = $param;
        $stmt->execute();
        return("successAlter");
        
        
    }


    //function to update users email in database
    public function alterEmail($param){
        $username=$_SESSION["username"];
        $sql = "UPDATE persons 
                SET Usermail = ? 
                WHERE username LIKE '$username'";
        $stmt = self::$db->prepare($sql);
        $stmt->bind_param("s",$em);
        $em = $param;
        $stmt->execute();
        return("successAlter");
        
    }
}

