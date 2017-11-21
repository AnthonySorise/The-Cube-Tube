<?php
if(empty($LOCAL_ACCESS)){
    die("direct access not allowed");
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
//TM87
// if(!preg_match('/[0-9]+/', $offset)){
//     $output['errors'][] = 'INVALID OFFSET';
//     output_and_exit($output);
// }

$in_stmt = implode(',', array_fill(0, count($youtube_array), '?'));
$stmt = $conn->prepare("SELECT v.youtube_video_id,v.description,v.published_at, 
v.video_title, c.channel_title, c.youtube_channel_id
FROM videos AS v JOIN channels AS c ON v.channel_id = c.channel_id
WHERE c.youtube_channel_id IN ($in_stmt)
ORDER BY v.published_at DESC LIMIT 40 OFFSET ?");
$param_types = implode('', array_fill(0, count($youtube_array), 's')) . 'i';
$stmt->bind_param($param_types, ...array_merge($youtube_array, [$offset]));
$stmt->execute();
$result = $stmt->get_result;
if(!empty($result)) {
    if ($result->num_rows > 0) {
        $output['success'] = true;
        while ($result->fetch_assoc) {
            $output['data'][] = $row;
        }
    } else {
        $output['errors'][] = 'no results';
        $output['channels'] = $channels;
        $output['offset'] = $offset;
    }
}else{
    $output['errors'][] = 'INVALID QUERY';
}
?>