<?php
if(empty($LOCAL_ACCESS)){
    die('direct access not allowed');
}
require_once('youtube_api_key.php');
$query = 
    "SELECT 
        youtube_channel_id 
    FROM 
        channels";
$stmt = $conn->prepare($query);
$stmt->execute();
$results = $stmt->get_result();
if($results->num_rows>0){
    $output['messages'][] = 'channels found';
    while($row = $results->fetch_assoc()){
        $channel_array[] = $row['youtube_channel_array'];
    }
}else{
    $output['messages'][] = 'no channels to read';
}
$query = 
    "UPDATE 
        channels 
    SET 
        thumbnail_file_name = ?, 
        channel_title = ?,
        description = ? 
    WHERE 
        youtube_channel_id = ?";
$channel_data_array = [];
$output['update_success'] = 0;
foreach($channel_array as $youtube_channel_id){
    $ch = curl_init("https://www.googleapis.com/youtube/v3/channels?id={$youtube_channel_id}&part=snippet&key={$DEVELOPER_KEY}");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $json = curl_exec($ch);
    $channel_data= json_decode($json, true)['items'][0]['snippet'];
    $thumbnail = $channel_data['thumbnails']['medium']['url'];
    $thumbnail = str_replace('https://yt3.ggpht.com/','',$thumbnail);
    $thumbnail = str_replace('/photo.jpg','',$thumbnail);
    $channel_title = $channel_data['title'];
    $description = $channel_data['description'];
    if(!($stmt = $conn->prepare($query))){
        $output['errors'][] = 'statement failed';
        output_and_exit($output);
    }
    $stmt->bind_param('ssss',$thumbnail,$channel_title,$description,$youtube_channel_id);
    $stmt->execute();
    if($conn->affected_rows>0){
        $output['update_success'] += 1;
        $output['success'] = true;
    }else{
        $output['errors'][] = "update fail at {$youtube_channel_id}";
    }
    if($output['update_success']>0){
        $output['success'] = true;
    }
}
//TM87
// if(!preg_match('/[a-zA-Z0-9]{6,20}/', $channel_title)){
//     $output['errors'][] = 'INVALID YOUTUBE CHANNEL TITLE';
//     output_and_exit($output);
// }
//tm87
// if(!preg_match('/[a-zA-Z0-9\-\_]{24}/', $channel_id)){
//     $output['errors'][] = 'INVALID YOUTUBE CHANNEL ID';
//     output_and_exit($output);
// }
?>