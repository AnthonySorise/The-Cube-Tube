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
    case 'read':
        include('read.php');
        break;
    case 'insert_user':
        include('insert_user.php');
        break;
    case 'delete':
        include('delete.php');
        break;
    case 'update_user':
        include('update_user.php');
        break;
    case 'insert_channel':
        include('insert_channels.php');
        break;
    case 'update_channel':
        include('update_channels.php');
        break;
    case 'insert_category':
        include('insert_category.php');
        break;
    case 'insert_video':
        include('insert_video.php');
        break;
    default:
        $output['errors'][] = 'invalid action';
}
$json_output = json_encode($output);
print_r($json_output);
?>