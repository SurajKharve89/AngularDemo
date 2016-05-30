<?php
require_once('../includes/config.php');

$error = array();
$data = array();

$_POST = json_decode(file_get_contents("php://input"),true);

//echo $_POST['username'];exit;

// Check for errors //
if(!preg_match("/^[a-zA-Z ]*$/",$_POST['username']))
$error['username'] = "Please enter valid name";

if(!filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
$error['email'] = "Please enter valid email";


if(!$error)//saving to database
{
	$query = mysqli_query($con , "Insert into customers_auth set name='".$_POST['username']."' , email ='".$_POST['email']."' , password = '".SHA1($_POST['password'])."' , created=Now()");
	if($query)
	$data['success'] = "User Registered Successfully.";
	else
	$data['failure'] = "ERROR :".mysqli_error($con).".";
}
else
{
	$data['error'] = $error;
}

/*if(!$error)//Calling Stored Procedure//
{
	$result = mysqli_query($con , "Call getusers()");
	if($result)
	{
		while($row = mysqli_fetch_assoc($result))
		{
			$data[] = $row;
			
		}
		
	}
	else
	$data['failure'] = "ERROR :".mysqli_error($con).".";
}
*/

echo json_encode($data);
mysqli_close($con);
?>