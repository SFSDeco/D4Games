<?php
class Player {

  public $firstname;
  public $lastname;
  public $username;
  public $birthDate;
  public $salutation;
  public $email;
  public $password; 


  function __construct($firstname, $lastname, $username,$email,$birthDate,$salutation,$password) {

    $this->firstname = $firstname;
    $this->lastname = $lastname;
    $this->username = $username;
    $this->email = $email;
    $this->birthDate = $birthDate;
    $this->salutation = $salutation;
    $this->password = $password;

  }
}
?>
