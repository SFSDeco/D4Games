<?php
class DBaccess {
  private $host = "localhost";
  private $user = "root";
  private $dbpassword = "";
  private $database = "d4games";

  // Funktion um die DB zu öffnen
  public function connect() {
      $mysqli = new mysqli($this->host, $this->user, $this->dbpassword, $this->database);
      if ($mysqli->connect_errno) {
          echo "Failed to connect to MySQL: " . $mysqli->connect_error;
          exit();
      }
      return $mysqli;
  }

    // Funktion um die DB zu schließen
  public function disconnect($mysqli) {
      $mysqli->close();
  }
}
?>
