<?php
if(empty($LOCAL_ACCESS)){
    die("no direct access allowed");
}
require('youtube_api_key.php');
if(!empty($_POST['page_token'])){
    $next_page_token = $_POST['page_token'];
    $youtube_channel_id = $_POST['youtube_channel_id'];
}
if(!empty($_POST['last_channel_pull'])){
    $last_channel_pull = $_POST['last_channel_pull'];
    $last_channel_pull = str_replace(' ','T', $last_channel_pull);
    $last_channel_pull .= '.000Z';
}else{
    $last_channel_pull = '';
}

if(empty($channel_id)){
    $sqli = 
        "SELECT 
            channel_id
        FROM 
            channels 
        WHERE 
            youtube_channel_id = ?";
    $stmt = $conn->prepare($sqli);
    $stmt->bind_param('s', $youtube_channel_id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows>0) {
        $row = $result->fetch_assoc();
        $channel_id = $row['channel_id'];
    } else {
        $output['messages'] = "can't read channel";
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
        $last_updated = date('Y-m-d H:i:s');

        // $query = "INSERT INTO videos ('video_title','channel_id','youtube_video_id') ";
        // $bind_str = '';
        // foreach($entries as $key=>$value){
        //       $query.= "(?,?,?),";
        //       $bind_str  .='sis';
        // }
        //"INSERT INTO videos (video_title , channel_id) VALUES ('abc',1), ('xyz',2), ('hgf',4)""
        $sqli = "INSERT INTO videos (video_title, channel_id, youtube_video_id, description, published_at, last_updated) VALUES";
        $refArr = [''];
        $bind_str = '';
        foreach($entries as $key => $value){
            if(!empty($value['id']['videoId'])){
                $sqli .= " (?,?,?,?,?,?),";
                $bind_str .= "sissss";
                $refArr[] = $value['snippet']['title'];
                $refArr[] = $channel_id;
                $refArr[] = $value['id']['videoId'];
                $refArr[] = $value['snippet']['description'];
                $published_at = $value['snippet']['publishedAt'];
                $published_at = str_replace('T',' ',$published_at);
                $published_at = str_replace('.000Z','',$published_at);
                $refArr[] = $published_at;
                $refArr[] = $last_updated;
            }
        }
        // $sqli_statement = "{$sqli}{$query}";
        $sqli_statement = rtrim($sqli_statement,", ");
        $res = $conn->prepare($sqli_statement);
        $refArr[0] = $bind_str;
        print($sqli_statement);
        print_r($refArr);
        $ref = new ReflectionClass('mysqli_stmt'); 
        $method = $ref->getMethod("bind_param"); 
        $method->invokeArgs($res,$refArr); 
        $res->execute(); 
        if(empty($res)){
            $output['errors'][] = 'INVALID QUERY';
            output_and_exit();
        }else{
            if($conn->affected_rows>0){
                $output['success']=true;
                $output['page_token']=$next_page_token;
            }else{
                $output['errors'][] = 'unable to insert video';
            }
        }
        // $output['insert_success'] = 0;
        // $maxCount = count($entries);
        // for($i = 0; $i<$maxCount; $i++){
        //     $youtube_video_id = $entries[$i]['id']['videoId'];
        //     $description = $entries[$i]['snippet']['description'];
        //     $video_title = $entries[$i]['snippet']['title'];
        //     $published_at = $entries[$i]['snippet']['publishedAt'];
        //     $published_at = str_replace('T',' ',$published_at);
        //     $published_at = str_replace('.000Z','',$published_at);
        //     $sqli = 
        //         "INSERT INTO 
        //             videos 
        //         SET 
        //             video_title=?,
        //             channel_id=?,
        //             youtube_video_id=?, 
        //             description=?,
        //             published_at=?,
        //             last_updated=?";
        //     $stmt = $conn->prepare($sqli);
        //     $stmt->bind_param('sissss',$video_title,$channel_id,$youtube_video_id,
        //         $description,$published_at,$last_updated);
        //     $stmt->execute();
        //     if(empty($stmt)){
        //         $output['errors'][] = 'INVALID QUERY';
        //     }else{
        //         if($conn->affected_rows>0){
        //             //if last one is wrong, they will all be wrong
        //             $output['insert_success'] += 1;
        //         }else{
        //             $output['errors'][] = 'unable to insert video';
        //         }
        //     }
        // }//end for
        // if($output['insert_success']>0){
        //     $output['success']=true;
        //     $output['page_token']=$next_page_token;
        // }
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