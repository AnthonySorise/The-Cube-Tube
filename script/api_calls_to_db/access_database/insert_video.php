<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
$video_array = $_POST['videoArray'];
for($i = 0; $i< 2; $i++ ){
    $video_title = $video_array[$i]['video_title'];
    $channel_id = $video_array[$i]['channel_id'];
    $youtube_video_id = $video_array[$i]['youtube_video_id'];
    $description = $video_array[$i]['description'];
    $published_at = $video_array[$i]['published_at'];
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

