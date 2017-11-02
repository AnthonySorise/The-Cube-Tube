<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
if(empty($offset)){
    $output['errors'][] = "MISSING OFFSET";
}
$offset = $_POST['offset'];
$user_id = $_POST['user_id'];
$stmt = $conn->prepare("SELECT v.youtube_video_id, v.description, v.published_at 
FROM videos AS v
JOIN channels_to_users AS c on v.channel_id = c.channel_id
JOIN users AS u ON u.user_id=c.user_id
WHERE u.user_id = ?
ORDER BY published_at DESC LIMIT 40 OFFSET ?");
$stmt->bind_param("ii",$user_id,$offset);
$stmt->execute();
if(!empty($stmt)){
    //if($result->num_rows!==0)
    if(mysqli_num_rows($result)>0){
        $output['success']=true;
        while($row = mysqli_fetch_assoc($result)){
            $output['data'][] = $row;
        }
    }else{
        $output['errors'][] = mysqli_error($conn);
    }
}
?>


