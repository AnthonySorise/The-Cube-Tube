<?php
if(empty($LOCAL_ACCESS)){
    die('direct access not allowed');
}
$channel_title = $POST['channel_title'];
$description = $_POST['description'];
$video_id = $_POST['video_id'];
$last_updated = date('Y-m-d H:i:s');
if(empty($channel_title)){
    $output['errors'][]='MISSING CHANNEL TITLE';
}
if(empty($description)){
    $output['errors'][] = 'MISSING VIDEO DESCRIPTION';
}
if(empty($video_id)){
    $output['errors'][] = 'MISSING ID';
}
//tm87
// if(!preg_match('/[a-zA-Z0-9\-\_]{11}/', $video_id)){
//     $output['errors'][] = 'INVALID YOUTUBE VIDEO ID';
//     output_and_exit($output);
// }

$stmt = $conn->prepare("UPDATE video SET 
channel_title = ?,  
description = ?, 
last_updated = ?
WHERE video_id = ?");
$stmt ->bind_param('sssi',$channel_title,$description,$last_updated,$video_id);
$stmt->execute();
if(empty($stmt)){
    $output['errors'][]='invalid query';
}else{
    if($conn->affected_rows>0){
        $output['success'] = true;
    }else{
        $output['errors'][]='UNABLE TO UPDATE';
    }
}
?>