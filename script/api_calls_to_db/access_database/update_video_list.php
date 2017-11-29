<?php
//get the most recent videos based on the last time the channel was updated
if(empty($LOCAL_ACCESS)){
    die("no direct access allowed");
}
require_once("youtube_api_key.php");
if(empty($_POST['youtube_channel_id'])){
    $output['errors'][] = 'youtube channel id missing at update video list';
    output_and_exit($output);
}
if(empty($_POST['last_channel_pull'])){
    $output['errors'][] = 'last channel pull missing at update video list';
    output_and_exit($output);
}
$youtube_channel_id = $_POST['youtube_channel_id'];
$last_channel_pull = $_POST['last_channel_pull'];
$current_time = date('Y-m-d H:i:s');
$current_time_for_comparison = strtotime($current_time);
$last_pull_time = strtotime($last_channel_pull);
$diff = round(($current_time_for_comparison-$last_pull_time)/60);
//exit if an update atttempt was within the past 10 minutes
if($diff<10){
    $output['messages'] = 'updated recently';
    output_and_exit($output);
}
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
if($conn->affected_rows>0){
    $output['messages'][] = "channel updated with last channel pull";
    include('youtube_videos_curl.php');
}else{
    $output['errors'][]='UNABLE TO UPDATE';
}

?>