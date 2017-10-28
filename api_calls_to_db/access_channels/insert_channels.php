<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
$channel_title = $_POST['channelTitle'];
$description = $_POST['description'];
$thumbnails = $_POST['thumbnails'];
$sub_count = $_POST['subscriberCount'];
$video_count = $_POST['videoCount'];
$viewCount = $_POST['viewCount'];

$query = "INSERT INTO channels SET channelTitle = '{$channel_title}', 
description = '{$description}', 
thumbnails = '{$thumbnails}', 
sub_count = {$sub_count}, ,
videoCount = {$video_count},
viewCount = {$viewCount}";
$results = mysqli_query($conn,$query);
if(empty($results)){
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