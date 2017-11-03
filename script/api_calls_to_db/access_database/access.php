<?php
require_once('mysql_connect.php');
$LOCAL_ACCESS = true;
$output = [
    'success' => false,
    'errors' => [],
];
if(empty($_POST['action'])){
    $output['errors'][] = 'No action specified';
    print(json_encode($output));
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
    case 'insert_user':
        include('insert_user.php');
        break;
    case 'insert_video':
        include('insert_video.php');
        break;
    case 'read_channels':
        include('read_channels.php');
        break;
    case 'read_ctu':
        include('read_ctu.php');
        break;
    case 'read_database':
        include('read_database.php');
        break;
    case 'read_videos_by_channel':
        include('read_videos_by_channel.php');
        break;
    case 'read_videos':
        include('read_videos.php');
        break;
    case 'update_link'://in progress
        include('update_link.php');
        break;
    case 'update_channel':
        include('update_channels.php');
        break;
    case 'update_video':
        include('update_video.php');
        break;
        //    case 'update_user':
//        include('update_user.php');
//        break;
    default:
        $output['errors'][] = 'invalid action';
}
$json_output = json_encode($output);
print_r($json_output);
?>