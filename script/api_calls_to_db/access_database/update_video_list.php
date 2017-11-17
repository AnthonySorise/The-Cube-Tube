<?php
if(empty($LOCAL_ACCESS)){
    die("no direct access allowed");
}
require_once("youtube_api_key");
$youtube_channel_id = $_POST['youtube_channel_id'];
?>