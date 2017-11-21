<?php
if(empty($LOCAL_ACCESS)){
    die('delete ctu, direct access not allowed');
}
if(empty($_POST['youtube_channel_id'])){
    $output['errors'] = 'MISSING YOUTUBE CHANNEL ID';
}
$youtube_channel_id = $_POST['youtube_channel_id'];
$user_link = $_SESSION['user_link'];
$stmt = $conn->prepare("DELETE ctu FROM channels_to_users ctu 
JOIN channels c ON ctu.channel_id = c.channel_id 
JOIN users u ON ctu.user_id = u.user_id
WHERE youtube_channel_id = ? AND u.user_link = ?");
$stmt->bind_param("ss",$youtube_channel_id,$user_link);
$stmt->execute();
if(!empty($stmt)){
    if($conn->affected_rows>0){
        $output['success'] = true;
        $output['messages'][] = 'delete ctu success';
    }
    else{
        $output['error'] = 'Unable to delete ctu';
    }
}else{
    $output['errors'][]= 'invalid query';
}
?>