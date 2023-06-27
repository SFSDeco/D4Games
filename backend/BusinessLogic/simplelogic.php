<?php
include("./DataHandler/datahandler.php");

class SimpleLogic
{
    private $dh;
    function __construct()
    {
        $this->dh = new DataHandler();
    }

    function handleRequest($method, $param)
    {
        // hier werden die verschiedenen Funktionen aufgerufen,
        
        switch ($method) {
            
            case "queryScoresPerPlayer":
                $res = $this->dh->queryScoresPerPlayer($param); //param = player id
                break;
            case "queryScoresPerGame":
                $res = $this->dh->queryScoresPerGame($param); //param = game id
                break;
            case "submitScore":
                $res = $this->dh->submitScore($param); //param = {playerID = player id,gameID = game id,score = score}
                break;
            case "submitPlayer":
                $res = $this->dh->submitPlayer($param); //param = {firstname = firstname, lastname= lastname, username = username, password = password, usermail = usermail}
                break;
            case "searchPlayer":
                $res = $this->dh->searchPlayer($param); //param = username
                break;
            case "loginUser":
                $res = $this->dh->loginUser($param); //param = username, pw
                break;
            case "getLeaders":
                $res = $this->dh->getLeaders();
                break;
            case "setLeader":
                $res = $this->dh->setLeader($param);
                break;
            case "Logout":
                $res = $this->dh->Logout();
                break;
            case "alterUsername":
                $res = $this->dh->alterUsername($param);
                break;
            case "alterFirstname":
                $res = $this->dh->alterFirstname($param);
                break;
            case "alterLastname":
                $res = $this->dh->alterLastname($param);
                break;    
            case "alterPassword":
                $res = $this->dh->alterPassword($param);
                break;
            case "alterEmail":
                $res = $this->dh->alterEmail($param);
                break; 
            case "alterSalutation":
                $res = $this->dh->alterSalutation($param);
                break;    
            case "alterBirthDate":
                $res = $this->dh->alterBirthDate($param);
                break;    
                
                
                     
        }
        return $res;
    }
}
