<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
$videoArray = $POST['videoArray'];
for($i = 0; $i<count($videoArray);$i++) {
    $channel_id = $videoArray[$i]['channel_id'];
    $video_id = $videoArray[$i]['video_id'];
    $description = $videoArray[$i]['description'];
    $thumbnail = $videoArray[$i]['thumbnail'];
    $published_at = $videoArray[$i]['published_at'];
    if (empty($channel_id)) {
        $output['errors'][] = 'MISSING VIDEO TITLE';
    }
    if (empty($video_id)) {
        $output['errors'][] = 'MISSING VIDEO ID';
    }
    if (empty($description)) {
        $output['errors'][] = "MISSING VIDEO DESCRIPTION";
    }
    if (empty($thumbnail)) {
        $output['errors'][] = "MISSING THUMBNAILS";
    }
    if (empty($published_at)) {
        $output['errors'][] = "PUBLISHED DATE MISSING";
    }
    $statement =mysqli_prepare($conn,"INSERT INTO videos SET 
    channel_id = ?,
    youtube_video_id = ?, 
    description = ?,
    thumbnail_file_name = ?,
    published_at = ?");
    $result = mysqli_bind_param($statement,"ssssiiiis",$channel_id,$video_id,$description,$thumbnail,$published_at);
    mysqli_execute($result);
    if(empty($result)){
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

