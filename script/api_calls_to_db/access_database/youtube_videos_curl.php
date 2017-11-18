<?php
if(empty($LOCAL_ACCESS)){
      die("no direct access allowed");
}
// if(empty$_GET['page_token'])
if(!empty($_POST['last_channel_pull'])){
      $last_channel_pull = $_POST['last_channel_pull'];
      $last_channel_pull = str_replace(" ","T", $last_channel_pull);
      $last_channel_pull .= ".000Z";
}else{
      $last_channel_pull = "";
}
function insert_videos($youtube_channel_id,$channel_id,$page_token,$DEVELOPER_KEY,$conn,$last_channel_pull){
      if(!empty($last_channel_pull)){
            $last_channel_pull = "&publishedAfter={$last_channel_pull}";
      }else{
            $last_channel_pull = "";
      }
      if($page_token=='first'){
            $page_query='';
      }else{
            $page_query="&pageToken={$page_token}"; 
      }
      $ch = curl_init("https://www.googleapis.com/youtube/v3/search?key={$DEVELOPER_KEY}{$page_query}{$last_channel_pull}&channelId={$youtube_channel_id}&part=snippet&order=date&maxResults=50");
      curl_setopt($ch,CURLOPT_TIMEOUT,0);
      // $pageToken
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
            $body = 'Error occurred in ' . __FILE__ . "\n\n" .
                  'curl_errno: ' . curl_errno($ch) . "\n" .
                  'curl_error: ' . curl_error($ch) . "\n" .
                  'strlen($json): ' . strlen($json) . "\n" .
                  'var_export(curl_getinfo($ch), true): ' . var_export(curl_getinfo($ch), true) . "\n\n" .
                  '$json: ' . $json . "\n";
      //echo $body;
      } else {
            $video_array = json_decode($json, true);
            print_r($video_array);
            $next_page_token = $video_array['nextPageToken'];
            $output['token'] = $next_page_token;
            $entries = $video_array['items'];
            $last_updated = date("Y-m-d H-i-s");
            for($i = 0; $i<count($entries); $i++){
                  $youtube_video_id = $entries[$i]['id']['videoId'];
                  $description = $entries[$i]['snippet']['description'];
                  $video_title = $entries[$i]['snippet']['title'];
                  $published_at = $entries[$i]['snippet']['publishedAt'];
                  $published_at = str_replace("T"," ",$published_at);
                  $published_at = str_replace(".000Z","",$published_at);
                  $stmt = $conn->prepare("INSERT INTO videos SET 
                  video_title=?,
                  channel_id=?,
                  youtube_video_id=?, 
                  description=?,
                  published_at=?,
                  last_updated=?");
                  $stmt->bind_param('sissss',$video_title,$channel_id,$youtube_video_id,
                  $description,$published_at,$last_updated);
                  $stmt->execute();
                  if(empty($stmt)){
                        $output['errors'][] = 'INVALID QUERY';
                  }else{
                        if(mysqli_affected_rows($conn)>0){
                              $output['success'] = true;
                              $output['messages'][] = "insert video success";
                              if($page_token === "first"){
                                    
                              }
                        }else{
                              $output['errors'][] = 'unable to insert video';
                        }
                  }
            }//end for
            if(!empty($next_page_token)){
                  // curl_setopt($ch,CURLOPT_URL,"https://www.googleapis.com/youtube/v3/search?key={$DEVELOPER_KEY}{$page_query}{$last_channel_pull}&channelId={$youtube_channel_id}&part=snippet&order=date&maxResults=50");
                  insert_videos($youtube_channel_id,$channel_id,$next_page_token,$DEVELOPER_KEY,$conn,$last_channel_pull);
            }
      }
}    
insert_videos($youtube_channel_id,$channel_id,"first",$DEVELOPER_KEY,$conn,$last_channel_pull);
$json_output = json_encode($output);
print($json_output);
?>