<?php
sesson_start();
$LOCAL_ACCESS = true;
require_once('mysql_connect.php');
$output = [
    'success' => false,
    'errors' => [],
];
if(isset($_SESSION['user_link'])){
    include('read_user.php');
}
if(empty($_POST['action'])){
    $output['errors'][] = 'No action specified';
    output_and_exit();
}
function output_and_exit(){
    global $output;
    $json_output = json_encode($output);
    print_r($json_output);
    exit();
}
switch($_POST['action']){
    case 'delete_ctu':
        include('delete.php');
        break;
    case 'insert_channel':
        include('insert_channels.php');
        break;
    case 'insert_ctu':
        include('insert_ctu.php');
        break;
    case 'insert_video':
        include('insert_video.php');
        break;
    case 'read_channels_by_user_id':
        include('read_channels_by_user_id.php');
        break;
    case 'read_channels_by_youtube_id':
        include('read_channels_by_youtube_id.php');
        break;
    case 'read_videos_by_channel':
        include('read_videos_by_channel.php');
        break;
    case 'read_videos_by_user':
        include('read_videos_by_user.php');
        break;
    case 'read_user_content':
        include('read_user_content.php');
        break;
    case 'update_channel':
        include('update_channels.php');
        break;
    case 'update_video':
        include('update_video.php');
        break;
    case 'read_videos_by_channel_array':
        include('read_videos_by_channel_array.php');
        break;
    default:
        $output['errors'][] = 'invalid action';
}
$json_output = json_encode($output);
print_r($json_output);
?>