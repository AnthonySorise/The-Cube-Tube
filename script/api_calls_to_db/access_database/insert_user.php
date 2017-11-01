<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
require_once('mysql_connect.php');
$user_link = $_POST['user_link'];
if(empty($user_link)){
    $output['errors'] = "MISSING USERLINK";
}
$statement = mysqli_prepare($conn,"INSERT INTO users SET user_link = ?");
$result = mysqli_bind_param($statement,"s",$user_link);
mysqli_execute($result);
if(!empty($result)){
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