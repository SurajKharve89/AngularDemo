<?php
require_once('../includes/config.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');

$data = array();

$_POST = json_decode(file_get_contents("php://input"),true);

$name = $_POST['name'];
echo $name;exit;
?>