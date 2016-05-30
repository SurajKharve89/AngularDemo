<?php
require_once('../includes/config.php');

$error = array();
$data = array();

//$_POST = json_decode(file_get_contents("php://input"),true); // not req when using angular upload method - ngfileupload,Upload.upload

//echo $_POST['name']." ".$_POST['email']." ".$_POST['id']." ".@$_FILES['file']['name'];exit;

// Check for errors //
if(!preg_match("/^[a-zA-Z ]*$/",$_POST['name']))
$error['username'] = "Please enter valid name";

if(!filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
$error['email'] = "Please enter valid email";


if(!$error)//updating to database
{
	$query = mysqli_multi_query($con , "update customers_auth set name='".$_POST['name']."' , email ='".$_POST['email']."' , modified =Now() where uid = '".$_POST['id']."'");
	
	
	if($query)
	{
		if(@$_FILES['file']['name'] != '')
		{
			
			// unlink old file //
			@$sqlunlink =  mysqli_query($con , "select * from customers_auth where uid = '".$_POST['id']."'");
			//@$sqlunlink =  mysqli_multi_query($con , "Call getusers(".$_POST['id'].")");
			
			@$row = mysqli_fetch_assoc($sqlunlink);
			
			if(@$row['profile_pic'] != '')
			{
				@unlink('../uploads/'.$row['profile_pic']);
				}
			
			$basename = pathinfo($_FILES['file']['name'],PATHINFO_FILENAME);
			$extension = pathinfo($_FILES['file']['name'],PATHINFO_EXTENSION);
			$newname = $basename.'-'.$_POST['id'].'.'.$extension;
			$sqlprofilepic = mysqli_multi_query($con , "update customers_auth set profile_pic='".$newname."', modified =Now() where uid = '".$_POST['id']."'");
			if($sqlprofilepic)
			{
			move_uploaded_file($_FILES['file']['tmp_name'],'../uploads/'.$newname);
			}
					
		}
		
		$data['success'] = "Profile Updated Successfully.";
	}
	else
	{
		$data['failure'] = "ERROR :".mysqli_error($con).".";
	}
	
	
}
else
{
	$data['error'] = $error;
}

echo json_encode($data);
//mysqli_close($con);
?>