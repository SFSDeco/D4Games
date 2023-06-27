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
    public function submitScore($param){
        $playerID = $param["playerID"];
        $gameID = $param["gameID"];
        $score = $param["score"];

        $sql = "INSERT INTO scores (Score, P_ID, G_ID) VALUES (?,?,?)";
        $stmt = self::$db->prepare($sql);
        $stmt->bind_param("iii",$score, $playerID, $gameID);
        $stmt->execute();
    }

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

    public function Logout(){
        if(isset($_SESSION["Loggedin"])){
            session_destroy();
            unset($_SESSION["Loggedin"]);
            unset($_SESSION["username"]);
            return "Successfully logged out.";
        }
        return "Error, not logged in.";
    }
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
