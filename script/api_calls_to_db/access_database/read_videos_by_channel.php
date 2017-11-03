<?php
if(empty($LOCAL_ACCESS)){
    die("direction access not allowed");
}
$youtube_channel_id = $_POST['youtube_channel_id'];
$offset = $_POST['offset'];
if(empty($channel_id)){
    $output['errors'][] = "MISSING USER ID";
}
$stmt = $conn->prepare("SELECT v.youtube_video_id,v.description,v.published_at 
FROM videos JOIN channels AS c ON v.youtube_channel_id = c.youtube_channel_id
WHERE v.youtube_channel_id = ? 
ORDER BY v.published_at DESC LIMIT 40 OFFSET ?");
$stmt->bind_param("si",$youtube_channel_id,$offset);
$stmt->execute();
if(!empty($stmt)) {
    if (mysqli_num_rows($stmt) > 0) {
        $output['success'] = true;
        while ($row = mysqli_fetch_assoc($stmt)) {
            $output['data'][] = $row;
        }
    } else {
        $output['errors'][] = mysqli_error($conn);
    }
}else{
    $output['errors'][] = 'INVALID QUERY';
}
?>