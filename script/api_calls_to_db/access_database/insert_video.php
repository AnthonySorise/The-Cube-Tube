<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
$_POST['videoArray'];
foreach($_POST['videoArray'] as $video_array) {
    $video_title = $video_array['video_title'];
    $channel_id = $video_array['channel_id'];
    $youtube_video_id = $video_array['youtube_video_id'];
    $description = $video_array['description'];
    $published_at = $video_array['published_at'];
    $last_updated = date("Y-m-d H-i-s");
    if (empty($channel_id)) {
        $output['errors'][] = 'MISSING VIDEO TITLE';
    }
    if (empty($youtube_video_id)) {
        $output['errors'][] = 'MISSING VIDEO ID';
    }
    if (empty($description)) {
        $output['errors'][] = "MISSING VIDEO DESCRIPTION";
    }
    if (empty($published_at)) {
        $output['errors'][] = "PUBLISHED DATE MISSING";
    }
    $stmt = $conn->prepare("INSERT INTO `videos` SET 
    `video_title` = ?,
    `channel_id` = ?,
    `youtube_video_id` = ?, 
    `description` = ?,
    `published_at` = ?
    `last_updated`=?");
    $stmt->bind_param("ssssss",$video_title,$channel_id,$youtube_video_id,$description,$published_at,$last_updated);
    $stmt->execute();
    if(empty($stmt)){
        $output['errors'][] = "INVALID QUERY";
    }else{
        if(mysqli_affected_rows($conn)>0){
            $output['success'] = true;
            $output['id'] = mysqli_insert_id($conn);
        }else{
            $output['errors'][] = 'unable to insert video';
        }
    }
}
?>

