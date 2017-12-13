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
    include('read_user.php');
}
function output_and_exit($output){
    $json_output = json_encode($output);
    if(!empty($output['errors'])){
        $output['datetime'][] = date('Y-m-s H:i:s');
        $output['defined_vars'][] = get_defined_vars();
        $errors = json_encode($output);
        error_log("{$json_output} \n",3,"../../../../logs/error.log");
    };
    print($json_output);
    exit();
}
switch($_POST['action']){
    case 'change_category_name':
        include('change_category_name.php');
        break;
    case 'delete_category':
        include('delete_category.php');
        break;
    case 'delete_ctu'://ctu is category to user
        include('delete_ctu.php');
        break;
    case 'delete_ctc'://ctc is category to channel
        include('delete_ctc.php');
        break;
    case 'insert_ctu':
        include('insert_ctu.php');
        break;
    case 'read_categories_by_user':
        include('read_categories_by_user.php');
        break;
    case 'read_channels_by_user_id':
        include('read_channels_by_user_id.php');
        break;
    case 'read_channels_by_youtube_id':
        include('read_channels_by_youtube_id.php');
        break;
    case 'read_video'://not implemented on front end
        include('read_video.php');
        break;
    case 'read_videos_by_channel_array':
        include('read_videos_by_channel_array.php');
        break;
    case 'insert_category':
        include('insert_category.php');
        break;
    case 'insert_ctc'://create link between categories and channels
        include('insert_ctc.php');
        break;
    case 'insert_videos_curl'://grab and insert videos from youtube
        include('youtube_videos_curl.php');
        break;
    case 'insert_youtube_channel_curl'://grab and insert channel data from youtube 
        include('youtube_channel_curl.php');
        break;
    case 'update_video_list':
        include('update_video_list.php');
        break;
    case 'update_channels':
        include('update_channels.php');
        break;
    case 'remove_user_query':
        include('remove_query.php');
        break;
    case 'show_user_query':
        include('show_user_query.php');
        break;
    default:
        $output['errors'][] = 'invalid action';
}
output_and_exit($output);
?>