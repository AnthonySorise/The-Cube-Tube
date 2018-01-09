<?php
//used in a cronjob to update channel data
 if(empty($LOCAL_ACCESS)){
     die('direct access not allowed');
}
//need api key to make curl call
require_once('./youtube_api_key.php');
//grab all youtube channel ids from database
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
    //put all data into the channel array
    while($row = $results->fetch_assoc()){
        $channel_array[] = $row['youtube_channel_id'];
    }
}else{
    $output['messages'][] = 'no channels to read';
}
//update channels with updated information from youtube
$query = 
    "UPDATE 
        channels 
    SET 
        thumbnail_file_name = ?, 
        channel_title = ?,
        description = ? 
    WHERE 
        youtube_channel_id = ?";
$output['update_success'] = 0;
if(!($stmt = $conn->prepare($query))){
    $output['errors'][] = 'statement failed';
    output_and_exit($output);
}
$stmt->bind_param('ssss',$thumbnail,$channel_title,$description,$youtube_channel_id);
//loop through each channel in database and make a curl call to get information
foreach($channel_array as $youtube_channel_id){
    $ch = curl_init("https://www.googleapis.com/youtube/v3/channels?id={$youtube_channel_id}&part=snippet&key={$DEVELOPER_KEY}");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $json = curl_exec($ch);
    $channel_data = json_decode($json, true)['items'][0]['snippet'];
    $thumbnail = $channel_data['thumbnails']['medium']['url'];
    $thumbnail = str_replace('https://yt3.ggpht.com/','',$thumbnail);
    $thumbnail = str_replace('/photo.jpg','',$thumbnail);
    $channel_title = $channel_data['title'];
    $description = $channel_data['description'];
    $stmt->execute();
    //count how many channels were updated
    if($conn->affected_rows>0){
        $output['update_success'] += 1;
        $output['success'] = true;
    }
    //output success or fail message
    if($output['update_success']>0){
        $output['success'] = true;
    }else{
        $output['messages'][] = 'nothing to update';
    }
    output_and_exit($output);
}
?>