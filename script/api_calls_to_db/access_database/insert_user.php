<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
require_once('mysql_connect.php');
$user_link = $_POST['user_link'];
$date_created = date("Y-m-d H:i:s");
if(empty($user_link)){
    $output['errors'] = "MISSING USERLINK";
}
$stmt = $conn->prepare("INSERT INTO `users` SET `user_link` = ? `date_created` = ?");
$stmt->bind_param("s",$user_link);
$stmt->execute();

if(!empty($stmt)){
    if(mysqli_affected_rows($conn)>0){
        $output['success'] = true;
        $output['id'] = mysqli_insert_id($conn);
    }
    else{
        $output['error'][] = 'Unable to insert data';
    }
}else{
    $output['errors'][]= 'invalid query';
}
?>