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
        }
        return $res;
    }
}