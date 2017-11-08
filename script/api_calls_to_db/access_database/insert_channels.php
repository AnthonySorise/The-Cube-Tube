<?php
if(empty($LOCAL_ACCESS)){
    die('direct access not allowed');
}
//if session and get are empty , make user link mysqli insert id
if(!isset($_SESSION['user_link']) and !isset($_GET['user'])){
    function generateRandomString(){
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < 12; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
        }
        $_SESSION['user_link'][] = generateRandomString();
        include('./script/api_calls_to_db/access_database/insert_user.php');
        define('user_link',$_SESSION['user_link']);
}
$youtube_channel_id = $_POST['youtube_channel_id'];
$channel_title = $_POST['channel_title'];
$description = $_POST['description'];
$thumbnail = $_POST['thumbnail'];
$date_created = date('Y-m-d H:i:s');
$last_channel_pull = date("Y-m-d H:i:s");
if(empty($youtube_channel_id)){
    $output['errors'][]='MISSING YOUTUBE CHANNEL ID';
}
if(empty($channel_title)){
    $output['errors'][]='MISSING CHANNEL TITLE';
}
if(empty($description)){
    $output['errors'][] = "MISSING CHANNEL DESCRIPTION";
}
if(empty($thumbnail)){
    $output['errors'][] = "MISSING THUMBNAILS";
}
$stmt = $conn->prepare("INSERT INTO channels SET 
channel_title = ?, 
youtube_channel_id = ?,
description = ?, 
thumbnail_file_name = ?, 
date_created=?,
last_channel_pull=?");
$stmt->bind_param('ssssss',$channel_title,$youtube_channel_id,$description,$thumbnail,$date_created,$last_channel_pull);
$stmt->execute();
if(empty($stmt)){
    $output['errors'][]='invalid query';
}else{
    if(mysqli_affected_rows($conn)>0){
        $output['success'] = true;
        $output['id'] = mysqli_insert_id($conn);
    }else{
        $output['errors'][]='UNABLE TO INSERT';
    }
}
?>