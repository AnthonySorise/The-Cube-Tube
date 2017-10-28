<?php
require_once('mysql_connect.php');
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
$user_id = $_POST['user_id'];
$query = "DELETE FROM `users` WHERE `id`={$user_id}";
$result = mysqli_query($conn,$query);

if(!empty($result)){
    if(mysqli_affected_rows($conn)>0){
        $output['success'] = true;
        $output['id'] = mysqli_insert_id($conn);
    }
    else{
        $output['error'] = 'Unable to delete data';
    }
}else{
    $output['errors'][]= 'invalid query';
}
?>