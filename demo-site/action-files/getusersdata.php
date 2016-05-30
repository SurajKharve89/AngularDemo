<?php
require_once('../includes/config.php');

$data = array();

$_POST = json_decode(file_get_contents("php://input"),true);

$id = $_POST['userid'];
//echo $id;exit;
$result = mysqli_query($con , "Call getusers(".$id.")");
	if($result)
	{
		while($row = mysqli_fetch_assoc($result))
		{
			$data = $row;
			
		}
		
	}
	else
	$data = "ERROR :".mysqli_error($con).".";


echo json_encode($data);
mysqli_close($con);
?>