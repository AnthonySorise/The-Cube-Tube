<?php
//get the most recent videos based on the last time the channel was updated
if(empty($LOCAL_ACCESS)){
    die("no direct access allowed");
}
//require youtube api key for curl call
require_once("./youtube_api_key.php");
//check for missing data
//exit and output error message if anything is missing
if(empty($_POST['youtube_channel_id'])){
    $output['errors'][] = 'youtube channel id missing at update video list';
    output_and_exit($output);
}
$youtube_channel_id = $_POST['youtube_channel_id'];
//validate all data
//exit if not valid
if(!(preg_match('/^[a-zA-Z0-9\-\_]{24}$/', $youtube_channel_id))){
    $output['errors'][] = 'INVALID YOUTUBE CHANNEL ID';
    output_and_exit($output);
}
$last_channel_pull = $_POST['last_channel_pull'];
if(empty($_POST['last_channel_pull'])){
    $output['errors'][] = 'last channel pull missing at update video list';
    output_and_exit($output);
}
if(!(preg_match('/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/', $last_channel_pull))){
    $output['errors'][] = 'INVALID DATE';
    output_and_exit($output);
}
//find current time and compared it to last updated time
$current_time = date('Y-m-d H:i:s');
$current_time_for_comparison = strtotime($current_time);
$last_pull_time = strtotime($last_channel_pull);
$diff = round(($current_time_for_comparison-$last_pull_time)/60);
//exit if an update atttempt was within the past 10 minutes
if($diff<10){
    $output['messages'] = 'updated recently';
    output_and_exit($output);
}
//update last channel pull in channel table
$sqli = 
    "UPDATE
        channels
    SET
        last_channel_pull = ?
    WHERE
        youtube_channel_id = ?";
$stmt = $conn->prepare($sqli);
$stmt->bind_param("ss",$current_time,$youtube_channel_id);
$stmt->execute();
//if successful include youtube videos curl to grab and insert new videos
if($conn->affected_rows>0){
    $output['messages'][] = "channel updated with last channel pull";
    include('youtube_videos_curl.php');
}else{
    $output['errors'][]='UNABLE TO UPDATE';
}
?>