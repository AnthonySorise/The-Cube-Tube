<?php
if(empty($LOCAL_ACCESS)){
    die("direction access not allowed");
}
$youtube_array = $_POST['channel_id_array'];
$channels = "'{$youtube_array[0]}'";
if(count($youtube_array)>1){
    for($i=1; $i<count($youtube_array); $i++){
        $channels = $channels.','."'{$youtube_array[$i]}'";
    }
};
$offset = $_POST['offset'];
if(empty($youtube_array)){
    $output['errors'][] = 'MISSING YOUTUBE ARRAY';
}
if(!isset($offset)){
    $output['errors'][] = 'MISSING OFFSET';
}
$stmt = $conn->prepare("SELECT v.youtube_video_id,v.description,v.published_at, v.video_title, c.channel_title, c.youtube_channel_id
FROM videos AS v JOIN channels AS c ON v.youtube_channel_id = c.youtube_channel_id
WHERE c.youtube_channel_id IN (?)
ORDER BY v.published_at DESC LIMIT 40 OFFSET ?");
if(!$stmt){
    echo "prepared failed:(".$conn->errno . ")".$conn->error;
}
$stmt->bind_param('si',$channels,$offset);
if(!$stmt->execute()){
    echo "Execute failed: (" . $stmt->errno . ")" . $stmt->error;
};
$result = mysqli_stmt_get_result($stmt);
if(!empty($result)) {
    if (mysqli_num_rows($result) > 0) {
        $output['success'] = true;
        while ($row = mysqli_fetch_assoc($result)) {
            $output['data'][] = $row;
        }
    } else {
        $output['errors'][] = 'no results';
    }
}else{
    $output['errors'][] = 'INVALID QUERY';
}
?>