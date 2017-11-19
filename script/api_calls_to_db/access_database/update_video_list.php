<?php
if(empty($LOCAL_ACCESS)){
    die("no direct access allowed");
}
require_once("youtube_api_key.php");
$youtube_channel_id = $_POST['youtube_channel_id'];
$last_channel_pull = $_POST['last_channel_pull'];
if(empty($last_channel_pull)){
    $output['errors'][] = "MISSING LAST CHANNEL PULL AT UPDATE";
    output_and_exit($output);
}
if(empty($youtube_channel_id)){
    $output['errors'][] = "MISSING CHANNEL ID AT UPDATE";
    output_and_exit($output);
}
$time = date(('Y-m-d H:i:s'));
$last_pull_time = DateTIME($last_channel_pull);
$diff = $time->diff($last_pull_time);
$minutes = ($diff->format('%a') * 1440) + // total days converted to minutes
           ($diff->format('%h') * 60) +   // hours converted to minutes
            $diff->format('%i'); 
if($mintues<5){
    $output['messages'] = 'updated recently';
    output_and_exit();
}
$sqli = "UPDATE channels SET last_channel_pull = ? WHERE youtube_channel_id = ?";
$stmt = $conn->prepare($sqli);
$stmt->bind_param("ss",$time,$youtube_channel_id);
$stmt->execute();
if(empty($stmt)){
    $output['errors'][]='invalid query';
}else{
    if(mysqli_affected_rows($conn)>0){
        $output['messages'][] = "channel updated with last channel pull";
    }else{
        $output['errors'][]='UNABLE TO UPDATE';
    }
}
include('youtube_videos_curl.php');
?>