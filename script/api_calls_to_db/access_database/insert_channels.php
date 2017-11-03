<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
$youtube_channel_id = $_POST['youtube_channel_id'];
$channel_title = $_POST['channel_title'];
$description = $_POST['description'];
$thumbnail = $_POST['thumbnail'];
$sub_count = $_POST['sub_count'];
$video_count = $_POST['video_count'];
$view_count = $_POST['view_count'];
$date_created = date("Y-m-d H:i:s");
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
if(empty($sub_count)){
    $output['errors'][] = "MISSING SUBSCRIPTION COUNT";
}
if(empty($video_count)){
    $output['errors'][] = "MISSING VIDEO COUNT";
}
if(empty($view_count)){
    $output['errors'][] = "MISSING VIEW COUNT";
}
$stmt = $conn->prepare("INSERT INTO `channels` SET 
`channel_title` = ?, 
`youtube_channel_id` = ?,
`description` = ?, 
`thumbnail_file_name` = ?, 
`sub_count` = ?, 
`video_count` = ?,
`view_count` = ?,
`date_created`=?,
`last_channel_pull`=?");
$stmt->bind_param("ssssiiiss",$channel_title,$youtube_channel_id,$description,$thumbnail
    ,$sub_count,$video_count,$view_count,$date_created,$last_channel_pull);
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