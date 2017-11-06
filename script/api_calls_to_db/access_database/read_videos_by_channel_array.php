<?php
if(empty($LOCAL_ACCESS)){
    die("direction access not allowed");
}
$youtube_array = $_POST['channel_id_array'];
$channels = "v.youtube_channel_id = ".$youtube_array[0];
for($i=1; $i<count($youtube_array); $i++){
    $channels += " OR v.youtube_channel_id = ".$youtube_array[i];
}
$offset = $_POST['offset'];
print($channels);
exit();
if(empty($youtube_array)){
    $output['errors'][] = 'MISSING YOUTUBE ARRAY';
}
if(empty($offset)){
    $output['errors'][] = 'MISSING OFFSET';
}
$stmt = $conn->prepare("SELECT v.youtube_video_id,v.description,v.published_at, v.video_title, c.channel_title, c.youtube_channel_id
FROM videos AS v JOIN channels AS c ON v.youtube_channel_id = c.youtube_channel_id
WHERE ?
ORDER BY v.published_at DESC LIMIT 40 OFFSET ?");
$stmt->bind_param('si',$channels,$offset);
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