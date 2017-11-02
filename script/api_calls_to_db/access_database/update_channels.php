<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
$channel_title = $_POST['channelTitle'];
$description = $_POST['description'];
$thumbnail = $_POST['thumbnail'];
$sub_count = $_POST['subCount'];
$video_count = $_POST['videoCount'];
$view_count = $_POST['viewCount'];
$channel_id = $_POST['channelId'];
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
if(empty($view_count)){
    $output['errors'][] = "MISSING VIEW COUNT";
}
if(empty($channel_id)){
    $output['errors'][] = "MISSING ID";
}
$stmt=$conn->prepare("UPDATE channels SET 
channel_title = ?,  
description = ?, 
thumbnail_file_name = ?, 
sub_count = ?, ,
video_count = ?,
view_count = ? 
WHERE channel_id = ?");
$stmt->bind_param("sssiii",$channel_title,$description,$thumbnail,$sub_count,$video_count,$view_count,$channel_id);
$stmt->execute();
if(empty($stmt)){
    $output['errors'][]='invalid query';
}else{
    if(mysqli_affected_rows($conn)>0){
        $output['success'] = true;
        $output['id'] = mysqli_insert_id($conn);
    }else{
        $output['errors'][]='UNABLE TO UPDATE';
    }
}
?>