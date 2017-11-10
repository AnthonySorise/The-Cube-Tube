<?php
if(empty($LOCAL_ACCESS)){
    die('direct access not allowed');
}
$channel_title = $_POST['channel_title'];
$description = $_POST['description'];
$thumbnail = $_POST['thumbnail'];
$channel_id = $_POST['channel_id'];
$last_channel_pulled = date("Y-m-d H:i:s");
if(empty($channel_title)){
    $output['errors'][]='MISSING CHANNEL TITLE';
}
//TM87
// if(!preg_match('/[a-zA-Z0-9]{6,20}/', $channel_title)){
//     $output['errors'][] = 'INVALID YOUTUBE CHANNEL TITLE';
//     output_and_exit($output);
// }
if(empty($description)){
    $output['errors'][] = "MISSING CHANNEL DESCRIPTION";
}
if(empty($thumbnail)){
    $output['errors'][] = "MISSING THUMBNAILS";
}
if(empty($channel_id)){
    $output['errors'][] = "MISSING ID";
}
//tm87
// if(!preg_match('/[a-zA-Z0-9\-\_]{24}/', $channel_id)){
//     $output['errors'][] = 'INVALID YOUTUBE CHANNEL ID';
//     output_and_exit($output);
// }
$stmt=$conn->prepare("UPDATE channels SET 
channel_title = ?,  
description = ?, 
thumbnail_file_name = ?, 
last_channel_pulled = ?
WHERE channel_id = ?");
$stmt->bind_param('ssssi',$channel_title,$description,$thumbnail,$last_channel_pulled,$channel_id);
$stmt->execute();
if(empty($stmt)){
    $output['errors'][]='invalid query';
}else{
    if(mysqli_affected_rows($conn)>0){
        $output['success'] = true;
    }else{
        $output['errors'][]='UNABLE TO UPDATE';
    }
}
?>