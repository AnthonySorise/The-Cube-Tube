<?php
$LOCAL_ACCESS = true;
require('mysql_connect.php');
$output = [
    'success' => false,
    'errors' => []
];
function output_and_exit($output){
    $json_output = json_encode($output);
    print($json_output);
}
if(empty($_POST['action'])){
    $output['errors'][] = 'NO ACTION GIVEN';
    output_and_exit($output);
}
require('youtube_api_main.php');
switch($_POST['action']){
    case 'insert_channel_from_youtube':
        include('insert_channel_data_from_youtube.php');
        break;
    // case 'read_videos_from_youtube':
    //     include('read_videos_from_youtube.php');
    //     break;
    default:
        $output['errors'][] = "INVALID ACTION";
        break;
};
output_and_exit($output);
?>
