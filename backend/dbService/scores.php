<?php

class Scores {
    public $gameId;
    public $playerId;
    public $score;

    function __construct($gameId, $playerId, $score) {
        $this->gameId = $gameId;
        $this->playerId = $playerId;
        $this->score = $score;
      }
}


class Player {
  public $id;
  public $firstname;
  public $lastname;
  public $username;


  function __construct($id, $firstname, $lastname, $username) {
    $this->id = $id;
    $this->firstname = $firstname;
    $this->lastname = $lastname;
    $this->username = $username;
  }
}
