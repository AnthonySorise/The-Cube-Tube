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
//grab channel id if not given
if(empty($channel_id)){
    include('read_channel_id.php');
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
        if(empty($video_array['items'])){
            $output['messages'][] = 'no new videos';
            output_and_exit($output);
        }
        if(!empty($video_array['nextPageToken'])){
            $next_page_token = $video_array['nextPageToken'];
        }
        $entries = $video_array['items'];
        print_r($entries);
        exit();
        $last_updated = date('Y-m-d H:i:s');
        $query = "INSERT INTO videos (video_title, channel_id, youtube_video_id, description, published_at, last_updated) VALUES";
        $data = [];
        $bind_str = '';
        //break the data to insert into database
        foreach($entries as $key => $value){
            if(!empty($value['id']['videoId'])){
                $query .= " (?,?,?,?,?,?),";
                $bind_str .= "sissss";
                $data[] = $value['snippet']['title'];
                $data[] = $channel_id;
                $data[] = $value['id']['videoId'];
                $data[] = $value['snippet']['description'];
                $published_at = $value['snippet']['publishedAt'];
                $published_at = str_replace('T',' ',$published_at);
                $published_at = str_replace('.000Z','',$published_at);
                $data[] = $published_at;
                $data[] = $last_updated;
            }
        }
        $query = rtrim($query,", ");
        $stmt = $conn->prepare($query);
        $stmt->bind_param($bind_str, ...($data));
        $stmt->execute();
        if($conn->affected_rows>0){
            $output['success']=true;
            $output['messages'][] = 'insert video success';
            if(!empty($next_page_token)){
                $output['page_token']=$next_page_token;
            }  
        }else{
            $output['errors'][] = 'unable to insert video';
        }
        //let client know that first 50 has been inserted so they can search
        if($page_token === 'first'){
            output_and_exit($output);
        }
        //recursively call this function till there are no more page tokens
        if(!empty($next_page_token)){
            insert_videos($youtube_channel_id,$channel_id,$next_page_token,$DEVELOPER_KEY,$conn,$last_channel_pull,$output);
        }
    }
}
if(empty($_POST['page_token'])){
    insert_videos($youtube_channel_id,$channel_id,"first",$DEVELOPER_KEY,$conn,$last_channel_pull,$output);
}else{
    insert_videos($youtube_channel_id,$channel_id,$next_page_token,$DEVELOPER_KEY,$conn,$last_channel_pull,$output);
}
?>