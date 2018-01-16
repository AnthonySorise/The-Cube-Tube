<?php
//called from youtube channel curl and update video list
if(empty($LOCAL_ACCESS)){
    die("no direct access allowed");
}
//require youtube api key for curl call
require('./youtube_api_key.php');
//check for missing data, set variables if data exist
if(!empty($_POST['page_token'])){
    $next_page_token = filter_var($_POST['page_token'], FILTER_SANITIZE_STRING);
    $youtube_channel_id = $_POST['youtube_channel_id'];
    if(!(preg_match('/^[a-zA-Z0-9\-\_]{24}$/', $youtube_channel_id))){
        $output['errors'][] = 'INVALID YOUTUBE CHANNEL ID';
        output_and_exit($output);
    }
}
//covert last channel pull time, if given
//to format the youtube api can read
if(!empty($_POST['last_channel_pull'])){//change datetime to youtube standard format
    $last_channel_pull = $_POST['last_channel_pull'];
    if(!validateDate($last_channel_pull)){
        $output['errors'][] = "invalid date at youtube video curl";
        output_and_exit();
    };
    $last_channel_pull = str_replace(' ','T', $last_channel_pull);
    $last_channel_pull .= '.000Z';
}else{
    $last_channel_pull = '';
}
//grab channel id if not given
if(empty($channel_id)){
    include('./channels/read_channel_id.php');
}
//this funciton is recursively called until there are no more page tokens from youtube. 
function insert_videos($youtube_channel_id,$channel_id,$page_token,$DEVELOPER_KEY,$conn,$last_channel_pull,$output){
    //add date to curl if a data was given
    if(!empty($last_channel_pull)){
        $last_channel_pull = "&publishedAfter={$last_channel_pull}";
    }
    //fill curl string with an empty string if no page token was given
    //else include the page token
    if($page_token==='first'){
        $page_query='';
    }else{
        $page_query="&pageToken={$page_token}";
    }
    //make curl call to youtube to grab videos based on channel
    //and any addition information
    $ch = curl_init("https://www.googleapis.com/youtube/v3/search?key={$DEVELOPER_KEY}{$page_query}{$last_channel_pull}&channelId={$youtube_channel_id}&part=snippet&order=date&maxResults=45");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $json = curl_exec($ch);
    $error_occurred = false;
    //check for error on curl call, output error message if needed
    if ($json === false || curl_errno($ch)) {
        $error_occurred = true;
    }
    $decoded_json = json_decode($json);
    if ($decoded_json === NULL ) {
        $error_occurred = true;
    }
    if ($error_occurred){
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
        //decode data from youtube and convert into format
        //to be inserted into the database
        $video_array = json_decode($json, true);
        //exit and output message if nothing was found
        if(empty($video_array['items'])){
            $output['messages'][] = 'no new videos';
            output_and_exit($output);
        }
        //grab a page token if it exist
        if(!empty($video_array['nextPageToken'])){
            $next_page_token = $video_array['nextPageToken'];
        }
        $entries = $video_array['items'];
        $last_updated = date('Y-m-d H:i:s');
        //complete query based on length of videos array
        $query = 
            "INSERT INTO 
                videos 
                    (video_title, 
                    channel_id, 
                    youtube_video_id, 
                    description, 
                    published_at) 
            VALUES";
        $data = [];
        $bind_str = '';
        //break the data to insert into database
        foreach($entries as $key => $value){
            if(!empty($value['id']['videoId'])&&!empty($value['snippet']['title'])&&!empty($value['snippet']['description'])&&!empty($value['snippet']['publishedAt'])){
                //build out query and parameters based on length od data
                $query .= " (?,?,?,?,?),";
                $bind_str .= "sisss";
                //grab relavent data from youtube and put it into an array
                $data[] = filter_var($value['snippet']['title'], FILTER_SANITIZE_STRING);//youtube video title
                $data[] = $channel_id;
                $data[] = filter_var($value['id']['videoId'], FILTER_SANITIZE_STRING);//youtube video id
                $data[] = filter_var($value['snippet']['description'], FILTER_SANITIZE_STRING);//description
                //break datetime given from youtube to datetime that can be entered into database
                $published_at = $value['snippet']['publishedAt'];
                $published_at = str_replace('T',' ',$published_at);
                $published_at = str_replace('.000Z','',$published_at);
                if(validateDate($published_at)){
                    $data[] = $published_at;
                };
            }
        }
        print_r($data);
        output_and_exit();
        //remove last comma
        $query = rtrim($query,", ");
        $stmt = $conn->prepare($query);
        $stmt->bind_param($bind_str, ...($data));
        $stmt->execute();
        //output success or fail message
        if($conn->affected_rows>0){
            $output['success']=true;
            $output['messages'][] = 'insert video success';
            //set output page token if it exist
            if(!empty($next_page_token)){
                $output['page_token']=$next_page_token;
            }  
        }else{
            $output['errors'][] = 'unable to insert video';
        }
        //let client know that first 45 has been inserted so they can search
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