<?php
if(empty($LOCAL_ACCESS)){
    die("no direct access allowed");
}
require_once("youtube_api_key");
$youtube_channel_id = $_POST['youtube_channel_id'];
if(empty($youtube_channel_id)){
    $output['errors'][] = "MISSING CHANNEL ID";
    output_and_exit($output);
}
$last_pull_date = date(("Y-m-d H:i:s"));
$sqli = "UPDATE channels SET last_published = ? WHERE youtube_channel_id = ?";
$stmt = 
?>