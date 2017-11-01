<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
$channel_title = $POST['channel_title'];
$description = $_POST['description'];
$thumbnail = $_POST['thumbnail'];
$video_id = $_POST['video_id'];
if(empty($channel_title)){
    $output['errors'][]='MISSING CHANNEL TITLE';
}
if(empty($description)){
    $output['errors'][] = "MISSING VIDEO DESCRIPTION";
}
if(empty($thumbnail)){
    $output['errors'][] = "MISSING THUMBNAILS";
}
if(empty($videoId)){
    $output['errors'][] = "MISSING ID";
}
$statement = mysqli_prepare($conn,"UPDATE video SET 
channel_title = ?,  
description = ?, 
thumbnail_file_name = ?, 
WHERE video_id = ?");
$results = mysqli_bind_param($statement,"sssi",$channel_title,$description,$thumbnail,$video_id);
mysqli_execute($results);
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