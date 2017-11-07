<?php
if(empty($LOCAL_ACCESS)){
    die('direct access not allowed');
}
$offset = $_POST['offset'];
$user_id = $_POST['user_id'];
if(empty($offset)){
    $output['errors'][] = 'MISSING OFFSET';
}
if(empty($user_id)){
    $output['errors'][] = "MISSING USER ID";
}
$stmt = $conn->prepare("SELECT v.youtube_video_id, v.description, v.published_at 
FROM videos AS v
JOIN channels_to_users AS c on v.channel_id = c.channel_id
JOIN users AS u ON u.user_id=c.user_id
WHERE u.user_id = ?
ORDER BY published_at DESC LIMIT 40 OFFSET ?");
$stmt->bind_param('ii',$user_id,$offset);
$stmt->execute();
$results = mysqli_stmt_get_result($stmt);
if(!empty($stmt)){
    if(mysqli_num_rows($results)>0){
        $output['success']=true;
        while($row = mysqli_fetch_assoc($results)){
            $output['data'][] = $row;
        }
    }else{
        $output['errors'][] = mysqli_error($conn);
    }
}else{
    $output['errors'][] = 'INVALID QUERY';
}
?>


