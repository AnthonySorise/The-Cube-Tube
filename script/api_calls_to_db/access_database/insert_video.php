<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
$video_array = $POST['videoArray'];
for($i = 0; $i<count($video_array);$i++) {
    $channel_id = $video_array[$i]['channel_id'];
    $youtube_video_id = $video_array[$i]['youtube_video_id'];
    $description = $video_array[$i]['description'];
    $published_at = $video_array[$i]['published_at'];
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
    $stmt = $conn -> prepare("INSERT INTO `videos` SET 
    `channel_id` = ?,
    `youtube_video_id` = ?, 
    `description` = ?,
    `published_at` = ?");
    $stmt -> bind_param("sssss",$channel_id,$youtube_video_id,$description,$published_at);
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

