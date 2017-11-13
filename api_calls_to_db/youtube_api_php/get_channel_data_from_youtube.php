<?php
$youtube_channel_id = $_POST['youtube_channel_id'];
function channelsListById($service, $part, $params) {
    $params = array_filter($params);
    $response = $service->channels->listChannels(
        $part,
        $params
    );
    return $response;
}
$channel_data = channelsListById($service,
    'snippet,contentDetails,statistics', 
    array('id' => "{$youtube_channel_id}"));
$thumbnail = $channel_data.items[0].snippet.thumbnails.medium.url;
$thumbnail = str_replace('https://yt3.ggpht.com/','',$thumbnail);
$thumbnail = str_replace('/photo.jpg','',$thumbnail);
$channel_title = $channel_data['items'][0]['snippet']['title'];
$description = $channel_data['items'][0]['snippet']['description'];
$date_created = date('Y-m-d H:i:s');
$last_channel_pull = date("Y-m-d H:i:s");
print($channel_data);
// $stmt = $conn->prepare("INSERT INTO channels SET 
// channel_title = ?, 
// youtube_channel_id = ?,
// description = ?, 
// thumbnail_file_name = ?, 
// date_created=?,
// last_channel_pull=?");
// $stmt->bind_param('ssssss',$channel_title,$youtube_channel_id,
// $description,$thumbnail,$date_created,$last_channel_pull);
// $stmt->execute();
// if(empty($stmt)){
//     $output['errors'][]='invalid query';
// }else{
//     if(mysqli_affected_rows($conn)>0){
//         $output['success'] = true;
//     }else{
//         $output['errors'][]='UNABLE TO INSERT';
//     }
// }
// output_and_exit();
?>