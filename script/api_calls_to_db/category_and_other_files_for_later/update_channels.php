<?php
if(empty($LOCAL_ACCESS)){
    die('direct access not allowed');
}
$channel_title = $_POST['channel_title'];
$description = $_POST['description'];
$thumbnail = $_POST['thumbnail'];
$youtube_channel_id = $_POST['youtube_channel_id'];
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
if(empty($youtube_channel_id)){
    $output['errors'][] = "MISSING ID";
}
//tm87
// if(!preg_match('/[a-zA-Z0-9\-\_]{24}/', $channel_id)){
//     $output['errors'][] = 'INVALID YOUTUBE CHANNEL ID';
//     output_and_exit($output);
// }
$query = 
    "UPDATE 
        channels 
    SET 
        channel_title = ?,  
        description = ?, 
        thumbnail_file_name = ?
    WHERE 
        youtube_channel_id = ?";
if(!($stmt=$conn->prepare($query))){
    $output['errors'][] = 'invalid query';
    output_and_exit($output);
}
$stmt->bind_param('ssss',$channel_title,$description,$thumbnail,$youtube_channel_id);
$stmt->execute();
if($conn->affected_rows>0){
    $output['success'] = true;
    $output['messages'][] = 'update success';
}else{
    $output['errors'][]='UNABLE TO UPDATE';
}

?>