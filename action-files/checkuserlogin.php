<?php
require_once('../includes/config.php');

$error = array();
$data = array();

$_POST = json_decode(file_get_contents("php://input"),true);

//echo $_POST['username'];exit;

// Check for errors //

if(!filter_var($_POST['username'],FILTER_VALIDATE_EMAIL))
$error['username'] = "Please enter valid email";


if(!$error)//saving to database
{
	$query = mysqli_query($con , "Select * from customers_auth where email ='".$_POST['username']."' and password = '".SHA1($_POST['password'])."' ");
	if(mysqli_num_rows($query) > 0)
	{
		$result = mysqli_fetch_assoc($query);
		$data['userauth'] = $result;
		$data['success'] = "User Logged in successfully.";
	}
	else
	$data['failure'] = "ERROR : Invalid Credentials. Try again.";
}
else
{
	$data['error'] = $error;
}

mysqli_close($con);
echo json_encode($data);
?>