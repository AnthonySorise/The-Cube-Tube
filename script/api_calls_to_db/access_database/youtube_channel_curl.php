<?php
//insert channel info, if it succeeds insert videos for that channel
if(empty($LOCAL_ACCESS)){
    die("no direct access allowed");
}

if(empty($_POST['youtube_channel_id'])){
    $output['errors'][] = "MISSING CHANNEL ID at youtube channel curl";
    output_and_exit($output);
}
$youtube_channel_id = $_POST['youtube_channel_id'];
if(!(preg_match('/^[a-zA-Z0-9\-\_]{24}$/', $youtube_channel_id))){
    $output['errors'][] = 'INVALID YOUTUBE CHANNEL ID';
    output_and_exit($output);
}
require_once('youtube_api_key.php');
$ch = curl_init("https://www.googleapis.com/youtube/v3/channels?id={$youtube_channel_id}&part=snippet&key={$DEVELOPER_KEY}");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$json = curl_exec($ch);
$error_occurred = false;
if ($json === false || curl_errno($ch)) {
      $error_occurred = true;
}else{
    $decoded_json = json_decode($json);
    if ($decoded_json === NULL ) {
          $error_occurred = true;
    }
}
if ($error_occurred ){
      $body = 'Error occurred in ' . __FILE__ . "\n\n" .
                 'curl_errno: ' . curl_errno($ch) . "\n" .
                 'curl_error: ' . curl_error($ch) . "\n" .
                 'strlen($json): ' . strlen($json) . "\n" .
                 'var_export(curl_getinfo($ch), true): ' . var_export(curl_getinfo($ch), true) . "\n\n" .
                 '$json: ' . $json . "\n";
      $error = json_encode($body);
      $output['errors'][] = $error;
      $output['messages'] = 'curl failed at youtube_channel_curl';
      output_and_exit($output);
} else {
      $channel_data = json_decode($json, true)['items'][0]['snippet'];
      $thumbnail = $channel_data['thumbnails']['medium']['url'];
      $thumbnail = str_replace('https://yt3.ggpht.com/','',$thumbnail);
      $thumbnail = str_replace('/photo.jpg','',$thumbnail);
      $channel_title = $channel_data['title'];
      $description = $channel_data['description'];
      $date = date('Y-m-d H:i:s');
      $sqli = 
        "INSERT INTO
            channels
        SET
            channel_title = ?,
            youtube_channel_id = ?,
            description = ?,
            thumbnail_file_name = ?,
            last_channel_pull = ?";
      $stmt = $conn->prepare($sqli);
      $stmt->bind_param('sssss',$channel_title,$youtube_channel_id,
      $description,$thumbnail,$date);
      $stmt->execute();
      if($conn->affected_rows>0){
          $output['messages'][] = "insert channel success";
          $channel_id = $conn->insert_id;
          include("youtube_videos_curl.php");
        }else{
            $output['errors'][]='UNABLE TO INSERT';
        }
}
?>