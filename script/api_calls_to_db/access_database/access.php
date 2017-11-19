<?php
session_start();
$LOCAL_ACCESS = true;
require_once('mysql_connect.php');
$output = [
    'success' => false,
    'errors' => [],
];
if(!empty($_SESSION['user_link'])){
    $user_link = $_SESSION['user_link'];
    $stmt = $conn->prepare("SELECT user_id FROM users WHERE user_link = ?");
    $stmt->bind_param('s',$user_link);
    $stmt->execute();
    $result = mysqli_stmt_get_result($stmt);
    if(!empty($result)){
        if(mysqli_num_rows($result)>0){
            $row = mysqli_fetch_assoc($result);
            define('USER_ID',$row['user_id']);
        }else{
            $output['nothing_to_read'] = true;
        }
    }else{
        $output['errors'][] = 'INVALID QUERY READ USER ID IN ACCESS ';
    }
}
if(empty($_POST['action'])){
    $output['errors'][] = 'No action specified';
    output_and_exit($output);
}
function output_and_exit($output){
    $json_output = json_encode($output);
    print($json_output);
    exit();
}
switch($_POST['action']){
    case 'delete_ctu':
        include('delete_ctu.php');
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
    case 'insert_youtube_channel_curl':
        include('youtube_channel_curl.php');
        break;
    case 'update_video_list':
        include('update_video_list.php');
        break;
    case 'insert_videos_curl':
        include('youtube_videos_curl');
        break;
    default:
        $output['errors'][] = 'invalid action';
}
$json_output = json_encode($output);
print($json_output);
?>