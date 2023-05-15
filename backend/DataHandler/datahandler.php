<?php
include("./dbService/scores.php");
require_once("./DBaccess.php");

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

        $sql = "INSERT INTO scores (Score, P_ID, G_ID) VALUE (?,?,?)";
        $stmt = self::$db->prepare($sql);
        $stmt->bind_param("iii",$score, $playerID, $gameID);
        $stmt->execute();
    }

    public function submitPlayer($param){
        $firstname = $param["firstname"];
        $lastname = $param["lastname"];
        $usermail = $param["usermail"];
        $password = $param["password"];
        $username = $param["username"];
        $useravailable=true;

        $sql = "SELECT * FROM persons";
        $res = self::$db->query($sql);
        while($row=$res->fetch_array()){
            if($row["Username"]=$username){
                $useravailable=false;
            }
        }
        if($useravailable){
            $sql = "INSERT INTO 'persons' ('Username','Firstname', 'Lastname', 'Usermail', 'Password') VALUE (?,?,?,?)";
            $stmt = self::$db->prepare($sql);
            $stmt->bind_param("sssss",$username,$firstname,$lastname,$usermail,$password);
        }
    }
    public function searchPlayer($param){
        $username = $param;
        $data = [];
        $userexist=false;
        $sql = "SELECT * FROM persons";
        $res = self::$db->query($sql);
        
        while($row = $res->fetch_array()){
            if($row["Username"]=$username){
                $userexist=true;
            }
        }
        $sql = "SELECT * FROM persons WHERE Username = $username";
        $res = self::$db->query($sql);
        $i=0;
        while($row = $res->fetch_array()){
            $data[$i]=$row;
        }

        return $data;
    }
}