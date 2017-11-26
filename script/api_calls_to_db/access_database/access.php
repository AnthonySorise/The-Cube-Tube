<?php
session_start();
$LOCAL_ACCESS = true;
require_once('mysql_connect.php');
$output = [
    'success' => false,
    'errors' => [],
];
if(empty($_POST['action'])){
    $output['errors'][] = 'No action specified';
    output_and_exit($output);
}
if(!empty($_SESSION['user_link'])){
    $user_link = $_SESSION['user_link'];
}
function output_and_exit($output){
    $json_output = json_encode($output);
    print($json_output);
    exit();
}
switch($_POST['action']){
    case 'change_category_name':
        include('change_category_name.php');
        break;
    case 'delete_ctu':
        include('delete_ctu.php');
        break;
    case 'delete_cuc':
        include('delete_cuc.php');
        break;
    case 'insert_ctu':
        include('insert_ctu.php');
        break;
    case 'read_channels_by_user_id':
        include('read_channels_by_user_id.php');
        break;
    case 'read_channels_by_youtube_id':
        include('read_channels_by_youtube_id.php');
        break;
    case 'read_video':
        include('read_video.php');
        break;
    case 'read_videos_by_channel_array':
        include('read_videos_by_channel_array.php');
        break;
    case 'insert_category':
        include('insert_category.php');
        break;
    case 'insert_cuc':
        include('insert_category_to_user_to_channel.php');
        break;
    case 'insert_youtube_channel_curl':
        include('youtube_channel_curl.php');
        break;
    case 'update_video_list':
        include('update_video_list.php');
        break;
    case 'insert_videos_curl':
        include('youtube_videos_curl.php');
        break;
    case 'delete_category':
        include('delete_category.php');
        break;
    default:
        $output['errors'][] = 'invalid action';
}
output_and_exit($output);
?>