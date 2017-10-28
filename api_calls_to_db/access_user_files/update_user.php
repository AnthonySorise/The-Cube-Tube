<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
require_once('mysql_connect.php');
$user_link = $_POST['user_link'];
$id = $_POST['id'];
$time = date();
$query = "UPDATE users SET user_link = '{$user_link}' last_modified ='{$time}' WHERE id={$id}";
$results = mysqli_query($conn,$query);
if(empty($results)){
    $output['errors'][] = 'database error';
}else{
    if(mysqli_affected_rows($results)>0){
        $output['success'] = true;
    }
    else{
        $output['errors'][] = 'update error';
    }
}
/**
 * Created by PhpStorm.
 * User: collin
 * Date: 10/27/17
 * Time: 6:00 PM
 */