<?php
//runs from access.php
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
    JOIN
        users u ON ctu.user_id = u.user_id
    WHERE
        c.youtube_channel_id = ? AND u.user_link = ?";
if(!$stmt = $conn->prepare($sqli)){
    $output['errors'][]= 'invalid query';
    output_and_exit($output);
}
$stmt->bind_param("ss",$youtube_channel_id,$user_link);
$stmt->execute();
if($conn->affected_rows>0){
    $output['success'] = true;
    $output['messages'][] = 'delete ctu success';
    include('delete_cuc.php');
}
else{
    $output['error'] = 'Unable to delete ctu';
}
?>