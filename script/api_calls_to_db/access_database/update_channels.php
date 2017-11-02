<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
$channel_title = $_POST['channel_title'];
$description = $_POST['description'];
$thumbnail = $_POST['thumbnail'];
$sub_count = $_POST['sub_count'];
$video_count = $_POST['video_count'];
$view_count = $_POST['view_count'];
$channel_id = $_POST['channel_id'];
$last_channel_pulled = date("Y-m-d H:i:s");
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
sub_count = ?, 
video_count = ?,
view_count = ?,
last_channel_pulled = ?
WHERE channel_id = ?");
$stmt->bind_param("sssiiisi",$channel_title,$description,$thumbnail,$sub_count,$video_count,$view_count,$last_channel_pulled,$channel_id);
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