<?php
function insert_videos($youtube_channel_id,$channel_id,$pageToken){
      if($pageToken=="first"){
            $query==="";
      }else{
            $query==="&pageToken={$pageToken}"; 
      }
      $ch = curl_init("https://www.googleapis.com/youtube/v3/search?type=video/?channelId={$youtube_channel_id}&part=snippet{$query}&order=date&maxResults=50&key={$DEVELOPER_KEY}");
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
      echo('i failed');
      $body = 'Error occurred in ' . __FILE__ . "\n\n" .
                  'curl_errno: ' . curl_errno($ch) . "\n" .
                  'curl_error: ' . curl_error($ch) . "\n" .
                  'strlen($json): ' . strlen($json) . "\n" .
                  'var_export(curl_getinfo($ch), true): ' . var_export(curl_getinfo($ch), true) . "\n\n" .
                  '$json: ' . $json . "\n";
      //echo $body;
      } else {
            echo('video query success'."\n");
            $video_array = json_decode($json, true);
            $next_page_token = $video_array['nextPageToken'];
            echo('next page token: '.$next_page_token."\n");
            $entries = $video_array['items'];
            $last_updated = date("Y-m-d H-i-s");
            for($i = 0; $i<count($entries); $i++){
                  $youtube_video_id = $entries[$i]['id']['videoId'];
                  echo("video id : ".$youtube_video_id."\n");
                  $description = $entries[$i]['snippet']['description'];
                  echo('description : '.$description."\n");
                  $video_title = $entries[$i]['snippet']['title'];
                  $published_at = $entries[$i]['snippet']['publishedAt'];
                  $published_at = str_replace("T"," ",$published_at);
                  $published_at = str_replace(".000Z","",$published_at);
                  echo("published at : ".$published_at."\n");
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
                        }else{
                              $output['errors'][] = 'unable to insert video';
                        }
                  }
            }//end for
            if(!empty($next_page_token)){
                  insert_videos($youtube_channel_id,$channel_id,$next_page_token);
            }
      }
}    
insert_videos($youtube_channel_id,$channel_id,"first"); 
?>