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
      echo('i success');
      $channel_data = json_decode($json, true)['items'];
      print_r($channel_data);
      $thumbnail = $channel_data.items[0].snippet.thumbnails.medium.url;
      $thumbnail = str_replace('https://yt3.ggpht.com/','',$thumbnail);
      $thumbnail = str_replace('/photo.jpg','',$thumbnail);
      $channel_title = $channel_data['items'][0]['snippet']['title'];
      $description = $channel_data['items'][0]['snippet']['description'];
      $date_created = date('Y-m-d H:i:s');
      $last_channel_pull = date("Y-m-d H:i:s");
}
?>