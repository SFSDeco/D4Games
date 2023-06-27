<?php
class Highscore{
    public $user;
    public $score;

    function __construct($us, $sc){
        $this->user = $us;
        $this->score = $sc;
    }
}