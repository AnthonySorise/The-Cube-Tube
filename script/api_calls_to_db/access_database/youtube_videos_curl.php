<?php
$youtube_channel_id = $_POST['youtube_channel_id'];
require_once('youtube_api_key.php');
$ch = curl_init("https://www.googleapis.com/youtube/v3/search?type=video/?channelId={$youtube_channel_id}&part=snippet&order=date&maxResults=50&key={$DEVELOPER_KEY}");
// publishedAfter = RFC 3339 formatted date-time value (1970-01-01T00:00:00Z).
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
} else {
      echo('success <br>');
      $entries = json_decode($json, true);
      print_r($entries);
      //Do stuff
}
?>