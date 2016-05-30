<?php
require_once('../includes/config.php');

//$error = array();
//$data = array();
//
$_POST = json_decode(file_get_contents("php://input"),true);

//echo $_POST['to'].','.$_POST['from'].','.$_POST['subject'].','.$_POST['message'];exit;
//

$to = $_POST['to'];
$from = $_POST['from'];
$subject = $_POST['subject'];
$message = $_POST['message'];

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: <'.$from.'>' . "\r\n";
$headers.= 'X-Mailer: PHP/' . phpversion();

// This mail is sending from localhost with some settings in php.ini file and sendmail.ini file in XAMPP //
if(mail($to,$subject,$message,$headers))
{
	echo "Mail Sent Successfully.";exit;
}
else
{
	echo "Error Sending Mail";exit;
}

?>