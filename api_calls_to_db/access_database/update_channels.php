<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
$channel_title = $_POST['channelTitle'];
$description = $_POST['description'];
$thumbnail = $_POST['thumbnails'];
$sub_count = $_POST['subscriberCount'];
$video_count = $_POST['videoCount'];
$viewCount = $_POST['viewCount'];
$id = $_POST['channel_id'];
if(empty($channel_title)){
    $output['errors'][]='MISSING CHANNEL TITLE';
}
if(empty($description)){
    $output['errors'][] = "MISSING CHANNEL DESCRIPTION";
}
if(empty($thumbnail)){
    $output['errors'][] = "MISSING THUMBNAILS";
}
if(empty($sub_count)){
    $output['errors'][] = "MISSING SUBSCRIPTION COUNT";
}
if(empty($video_count)){
    $output['errors'][] = "MISSING VIDEO COUNT";
}
if(empty($viewCount)){
    $output['errors'][] = "MISSING VIEW COUNT";
}
if(empty($id)){
    $output['errors'][] = "MISSING ID";
}
$query = "UPDATE channels SET channelTitle = '{$channel_title}',  
description = '{$description}', 
thumbnails = '{$thumbnail}', 
sub_count = {$sub_count}, ,
videoCount = {$video_count},
viewCount = {$viewCount} 
WHERE channel_id = {$id}";
$results = mysqli_query($conn,$query);
if(empty($results)){
    $output['errors'][]='invalid query';
}else{
    if(mysqli_affected_rows($conn)>0){
        $output['success'] = true;
    }else{
        $output['errors'][]='UNABLE TO UPDATE';
    }
}
?>