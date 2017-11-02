<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
if(empty($offset)){
    $output['errors'][] = "MISSING OFFSET";
}
$offset = $_POST['offset'];

$stmt = $conn->prepare("SELECT ? FROM ?");
$stmt->bind_param("ss",$search,$table);
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

SELECT v.youtube_video_id, v.description, v.published_at FROM videos AS v
JOIN channels_to_users AS c on v.channel_id = c.channel_id
JOIN users AS u ON u.user_id=c.user_id
WHERE u.user_id = ${$user_id}
ORDER BY DESC LIMIT 40 OFFSET ${$offset}
