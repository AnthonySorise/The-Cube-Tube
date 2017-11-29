<?php
//runs from access.php will delete a single ctu and all related cucs
if(empty($LOCAL_ACCESS)){
    die('delete ctu, direct access not allowed');
}
if(empty($_POST['youtube_channel_id'])){
    $output['errors'] = 'MISSING YOUTUBE CHANNEL ID';
}
$youtube_channel_id = $_POST['youtube_channel_id'];
$sqli = 
    "DELETE
        ctu
    FROM
        channels_to_users ctu
    JOIN
        channels c ON ctu.channel_id = c.channel_id
    WHERE
        c.youtube_channel_id = ? AND ctu.user_id = ?";
if(!($stmt = $conn->prepare($sqli))){
    $output['errors'][]= 'invalid query';
    output_and_exit($output);
}   
$stmt->bind_param("si",$youtube_channel_id,$user_id);
$stmt->execute();
if($conn->affected_rows>0){
    $output['success'] = true;
    $output['messages'][] = 'delete ctu success';
    include('delete_ctc.php');
}
else{
    $output['error'] = 'Unable to delete ctu';
    error_log();
}
?>