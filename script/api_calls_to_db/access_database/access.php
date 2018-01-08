<?php
session_start();
//local access is a flag to check that all other files run through this access file
$LOCAL_ACCESS = true;
//connection to database
require_once('mysql_connect.php');
$output = [
    'success' => false,
    'errors' => [],
];
//exit if action is missing
if(empty($_POST['action'])){
    $output['errors'][] = 'No action specified';
    output_and_exit($output);
}
if(!empty($_SESSION['user_link'])){
    include('read_user.php');//grab user id if avaiable
}
//this function exits the file and sends an output in json. Will also create an error log on server
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
//files run depending on the action given in post data
switch($_POST['action']){
    case 'change_category_name':
        include('./categories/change_category_name.php');
        break;
    case 'delete_category':
        include('./categories/delete_category.php');
        break;
    case 'delete_ctu'://delete link from channel to users
        include('./channels_to_users/delete_ctu.php');
        break;
    case 'delete_ctc'://delete category to channel link
        include('./categories_to_channels/delete_ctc.php');
        break;
    case 'insert_ctu'://create channel to user link
        include('./channels_to_users/.insert_ctu.php');
        break;
    case 'read_categories_by_user':
        include('./categories/read_categories_by_user.php');
        break;
    case 'read_channels_by_user_id':
        include('./channels_to_users/read_channels_by_user_id.php');
        break;
    case 'read_channels_by_youtube_id':
        include('./channels/read_channels_by_youtube_id.php');
        break;
    case 'read_video'://not implemented on front end
        include('./videos/read_video.php');
        break;
    case 'read_videos_by_channel_array':
        include('./videos/read_videos_by_channel_array.php');
        break;
    case 'insert_category':
        include('./categories/insert_category.php');
        break;
    case 'insert_ctc'://create link between categories and channels
        include('./categories_to_channels/insert_ctc.php');
        break;
    case 'insert_youtube_channel_curl'://grab and insert channel data from youtube 
        include('./channels/youtube_channel_curl.php');
        break;
    case 'update_video_list':
        include('./videos/update_video_list.php');
        break;
    case 'update_channels'://running on a cronjob to update channel info
        include('./channels/update_channels.php');
        break;
    case 'insert_videos_curl'://grab and insert videos from youtube
        include('./videos/youtube_videos_curl.php');
        break;
    default:
        $output['errors'][] = 'invalid action';
}
output_and_exit($output);
?>