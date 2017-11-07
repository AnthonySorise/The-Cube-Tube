<?php
if(empty($LOCAL_ACCESS)){
    die('direct access not allowed');
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
$stmt = $conn->prepare("INSERT INTO `channels` SET 
`channel_title` = ?, 
`youtube_channel_id` = ?,
`description` = ?, 
`thumbnail_file_name` = ?, 
`date_created`=?,
`last_channel_pull`=?");
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