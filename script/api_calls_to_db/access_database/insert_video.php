<?php
if(empty($LOCAL_ACCESS)){
    die('insert video, direct access not allowed');
}
$youtube_channel_id = $video_array[0]['youtube_channel_id']; 
$sqli = "SELECT channel_id FROM 
channels WHERE youtube_channel_id = ? ";
$stmt = mysqli_stmt_init($conn);
if(!mysqli_stmt_prepare($stmt,$sqli)){
    echo 'SQL statement failed';
}else {
    mysqli_stmt_bind_param($stmt, 's', $youtube_channel_id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    if (mysqli_num_rows($result)>0) {
        $row = mysqli_fetch_assoc($result);
        define('CHANNEL_ID', $row['channel_id']);
    } else {
        $output['errors'][] = "CHANNEL NOT FOUND";
    }
}
$channel_id = CHANNEL_ID;
$video_array = $_POST['videoArray'];
for($i = 0; $i<count($video_array); $i++ ){
    $video_title = $video_array[$i]['video_title'];
    $youtube_channel_id = $video_array[$i]['youtube_channel_id'];
    $youtube_video_id = $video_array[$i]['youtube_video_id'];
    $description = $video_array[$i]['description'];
    $published_at = $video_array[$i]['published_at'];
    $last_updated = date("Y-m-d H-i-s");
    if(empty($video_title)){
        $output['errors'][] = 'MISSING VIDEO TITLE';
    }
    if (empty($youtube_channel_id)) {
        $output['errors'][] = 'MISSING YOUTUBE CHANNEL ID TITLE';
    }
    //tm87
    // if(!preg_match('/[a-zA-Z0-9\-\_]{24}/'),$youtube_channel_id){
    //     $output['errors'][] = 'INVALID YOUTUBE CHANNEL ID TITLE';
    //     output_and_exit($output);
    // }
    if (empty($youtube_video_id)) {
        $output['errors'][] = 'YOUTUBE MISSING VIDEO ID';
    }
    //tm87
    // if(!preg_match('[a-zA-Z0-9\-\_]{11}/',$youtube_video_id)){
    //     $output['errors'][] = 'INVALID YOUTUBE VIDEO ID';
    //     output_and_exit($output);
    // }
    if (empty($description)) {
        $output['errors'][] = 'MISSING VIDEO DESCRIPTION';
    }
    if (empty($published_at)) {
        $output['errors'][] = 'PUBLISHED DATE MISSING';
    }
    $stmt = $conn->prepare("INSERT INTO videos SET 
    video_title=?,
    youtube_channel_id=?,
    youtube_video_id=?, 
    description=?,
    published_at=?,
    last_updated=?,
    channel_id=?");
    $stmt->bind_param('ssssssi',$video_title,$youtube_channel_id,$youtube_video_id,
    $description,$published_at,$last_updated,$channel_id);
    $stmt->execute();
    if(empty($stmt)){
        $output['errors'][] = 'INVALID QUERY';
    }else{
        if(mysqli_affected_rows($conn)>0){
            $output['success'] = true;
        }else{
            $output['errors'][] = 'unable to insert video';
        }
    }
}
?>

