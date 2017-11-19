<?php
if(empty($LOCAL_ACCESS)){
    die("no direct access allowed");
}
if(!empty($_POST['page_token'])){
    require('youtube_api_key.php');
    $next_page_token = $_POST['page_token'];
    $youtube_channel_id = $_POST['youtube_channel_id'];
    $channel_id = $_POST['channel_id'];
    // $sqli = "SELECT channel_id
    // FROM channels WHERE youtube_channel_id = ?";
    // $stmt = mysqli_stmt_init($conn);
    // if(!mysqli_stmt_prepare($stmt,$sqli)){
    //     echo 'SQL statement failed, read channel id';
    // }else {
    //     mysqli_stmt_bind_param($stmt, 's', $youtube_channel_id);
    //     mysqli_stmt_execute($stmt);
    //     $result = mysqli_stmt_get_result($stmt);
    //     if (mysqli_num_rows($result)>0) {
    //         $row = mysqli_fetch_assoc($result);
    //         $channel_id = $row['channel_id'];
    //     } else {
    //         $output['messages'] = "can't read channel";
    //     }
    // }
    $last_channel_pull = '';
}else{
    if(!empty($_POST['last_channel_pull'])){
        $last_channel_pull = $_POST['last_channel_pull'];
        $last_channel_pull = str_replace(' ','T', $last_channel_pull);
        $last_channel_pull .= '.000Z';
    }else{
        $last_channel_pull = '';
    }
}
function insert_videos($youtube_channel_id,$channel_id,$page_token,$DEVELOPER_KEY,$conn,$last_channel_pull,$output){
    if(!empty($last_channel_pull)){
        $last_channel_pull = "&publishedAfter={$last_channel_pull}";
    }
    if($page_token==='first'){
        $page_query='';
    }else{
        $page_query="&pageToken={$page_token}";
    }
    $ch = curl_init("https://www.googleapis.com/youtube/v3/search?key={$DEVELOPER_KEY}{$page_query}{$last_channel_pull}&channelId={$youtube_channel_id}&part=snippet&order=date&maxResults=50");
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
        echo $body;
    } else {
        $video_array = json_decode($json, true);
        $next_page_token = $video_array['nextPageToken'];
        $entries = $video_array['items'];
        $last_updated = date('Y-m-d H-i-s');
        // $query = "INSERT INTO videos ('video_title','channel_id','youtube_video_id') ";
        // $bind_str = '';
        // foreach($entries as $key=>$value){
        //       $query.= "(?,?,?),";
        //       $bind_str  .='sis';
        // }
        //"INSERT INTO videos (video_title , channel_id) VALUES ('abc',1), ('xyz',2), ('hgf',4)""
        $output['insert_success'] = 0;
        $maxCount = count($entries);
        for($i = 0; $i<$maxCount; $i++){
            $youtube_video_id = $entries[$i]['id']['videoId'];
            $description = $entries[$i]['snippet']['description'];
            $video_title = $entries[$i]['snippet']['title'];
            $published_at = $entries[$i]['snippet']['publishedAt'];
            $published_at = str_replace('T',' ',$published_at);
            $published_at = str_replace('.000Z','',$published_at);
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
                    //if last one is wrong, they will all be wrong
                    $output['insert_success'] += 1;
                }else{
                    $output['errors'][] = 'unable to insert video';
                }
            }
        }//end for
        if($output['insert_success']>0){
            $output['success']=true;
            $output['page_token']=$next_page_token;
        }
        if(!empty($next_page_token) && $page_token==='first'){//calls file again if there is a next page token
            curl_setopt($ch,CURLOPT_URL,'access.php');
            // curl_setopt($ch, CURLOPT_POST, 1);
            // $_POST['page_token'] = $next_page_token;
            $post_data = [
                'page_token' => $next_page_token,
                'youtube_channel_id' => $youtube_channel_id,
                'channel_id' => $channel_id,
                'action'=>'insert_videos_curl'
            ];
            curl_setopt($ch,CURLOPT_POSTFIELDS, $post_data);
            curl_setopt($ch,CURLOPT_TIMEOUT,0);
            curl_exec($ch);
        }
        if($page_token === 'first'){
            output_and_exit($output);
        }
        if(!empty($next_page_token)){
            insert_videos($youtube_channel_id,$channel_id,$next_page_token,$DEVELOPER_KEY,$conn,$last_channel_pull,$output);
        }
        return $output;
        //REALLY SHOULD RETURN $output
    }
}
if(empty($_POST['page_token'])){
    insert_videos($youtube_channel_id,$channel_id,"first",$DEVELOPER_KEY,$conn,$last_channel_pull,$output);
}else{
    insert_videos($youtube_channel_id,$channel_id,$next_page_token,$DEVELOPER_KEY,$conn,$last_channel_pull,$output);
}
?>