<?php
$youtube_channel_id = $_POST['youtube_channel_id'];
require_once('youtube_api_key.php');
$ch = curl_init("https://www.googleapis.com/youtube/v3/channels?id={$youtube_channel_id}&part=snippet&key={$DEVELOPER_KEY}");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$json = curl_exec($ch);
$error_occurred = false;
if ($json === false || curl_errno($ch)) {
      $error_occurred = true;
}
$decoded_json = json_decode($json);
if ($decoded_json === NULL ) {
      $error_occurred = true;
}
if ($error_occurred ){
      echo('i failed');
      $body = 'Error occurred in ' . __FILE__ . "\n\n" .
                 'curl_errno: ' . curl_errno($ch) . "\n" .
                 'curl_error: ' . curl_error($ch) . "\n" .
                 'strlen($json): ' . strlen($json) . "\n" .
                 'var_export(curl_getinfo($ch), true): ' . var_export(curl_getinfo($ch), true) . "\n\n" .
                 '$json: ' . $json . "\n";
      //echo $body;
      //mail('YOUREMAILGOESHERE', 'TheCubeTube.com - YouTube JSON Error', $body);
      $error = json_encode($body);
      print_r($body);
} else {
      $channel_data = json_decode($json, true)['items'][0]['snippet'];
      $output['data'][] = $channel_data;
      $thumbnail = $channel_data['thumbnails']['medium']['url'];
      $thumbnail = str_replace('https://yt3.ggpht.com/','',$thumbnail);
      $thumbnail = str_replace('/photo.jpg','',$thumbnail);
      $channel_title = $channel_data['title'];
      $description = $channel_data['description'];
      $date_created = date('Y-m-d H:i:s');
      $last_channel_pull = date("Y-m-d H:i:s");
      $stmt = $conn->prepare("INSERT INTO channels SET 
      channel_title = ?, 
      youtube_channel_id = ?,
      description = ?, 
      thumbnail_file_name = ?, 
      date_created=?,
      last_channel_pull=?");
      $stmt->bind_param('ssssss',$channel_title,$youtube_channel_id,
      $description,$thumbnail,$date_created,$last_channel_pull);
      $stmt->execute();
      if(empty($stmt)){
          $output['errors'][]='invalid query';
      }else{
          if(mysqli_affected_rows($conn)>0){
              $output['success'] = true;
              $channel_id = mysqli_insert_id($conn);
              echo("channel id : ".$channel_id);
              include("youtube_videos_curl.php");
          }else{
              $output['errors'][]='UNABLE TO INSERT';
          }
      }
}
?>