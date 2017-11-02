<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
$channel_title = $POST['channel_title'];
$description = $_POST['description'];
$video_id = $_POST['video_id'];
if(empty($channel_title)){
    $output['errors'][]='MISSING CHANNEL TITLE';
}
if(empty($description)){
    $output['errors'][] = "MISSING VIDEO DESCRIPTION";
}
if(empty($video_id)){
    $output['errors'][] = "MISSING ID";
}
$stmt = $conn->prepare("UPDATE video SET 
channel_title = ?,  
description = ?, 
WHERE video_id = ?");
$stmt ->bind_param("ssi",$channel_title,$description,$video_id);
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