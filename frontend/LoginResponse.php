<?php
session_start();
$response = array('Loggedin' => $_SESSION['Loggedin']);
echo json_encode($response);
?>