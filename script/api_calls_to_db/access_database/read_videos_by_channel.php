<?php
if(empty($LOCAL_ACCESS)){
    die("direct access not allowed");
}
$youtube_channel_id = $_POST['youtube_channel_id'];
$offset = $_POST['offset'];
if(empty($youtube_channel_id)){
    $output['errors'][] = 'MISSING YOUTUBE CHANNEL ID';
}
//tm87
if(!preg_match('/[a-zA-Z0-9\-\_]{24}/', $youtube_channel_id){
    $output['errors'][] = 'INVALID YOUTUBE CHANNEL ID';
    out_put_and_exit($output);
}

if(empty($offset)){
    $output['errors'][] = 'MISSING OFFSET';
}
$stmt = $conn->prepare("SELECT v.youtube_video_id,v.description,v.published_at, 
v.video_title, c.channel_title, c.youtube_channel_id
FROM videos AS v JOIN channels AS c ON v.youtube_channel_id = c.youtube_channel_id
WHERE v.youtube_channel_id = ? 
ORDER BY v.published_at DESC LIMIT 40 OFFSET ?");
$stmt->bind_param('si',$youtube_channel_id,$offset);
$stmt->execute();
$result = mysqli_stmt_get_result($stmt);
if(!empty($result)) {
    if (mysqli_num_rows($result) > 0) {
        $output['success'] = true;
        while ($row = mysqli_fetch_assoc($result)) {
            $output['data'][] = $row;
        }
    } else {
        $output['errors'][] = mysqli_error($conn);
    }
}else{
    $output['errors'][] = 'INVALID QUERY';
}
?>