
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


