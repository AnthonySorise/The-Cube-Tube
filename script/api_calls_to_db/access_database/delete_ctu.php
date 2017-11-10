<?php
if(empty($LOCAL_ACCESS)){
    die('direct access not allowed');
}
if(empty($_POST['youtube_channel_id'])){
    $output['errors'] = 'MISSING YOUTUBE CHANNEL ID';
}
$youtube_channel_id = $_POST['youtube_channel_id'];
// $user_link = $_SESSION['user_link'];
$user_id = USER_ID;
$stmt = $conn->prepare("DELETE ctu FROM channels_to_users ctu 
JOIN channels c ON ctu.channel_id = c.channel_id 
WHERE youtube_channel_id = ? AND user_id = ?");
$stmt->bind_param("si",$youtube_channel_id,$user_id);
$stmt->execute();
if(!empty($stmt)){
    if(mysqli_affected_rows($conn)>0){
        $output['success'] = true;
    }
    else{
        $output['error'] = 'Unable to delete data';
    }
}else{
    $output['errors'][]= 'invalid query';
}
?>