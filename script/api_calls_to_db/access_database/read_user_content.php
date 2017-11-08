<?php
if(empty($LOCAL_ACCESS)){
    die('direct access not allowed');
}
$user_link = user_link;
if(empty($user_link)){
    $output['errors'][] ='MISSING USER_LINK';
}
$user_id = "";
$stmt = $conn->prepare("SELECT user_id FROM users WHERE user_link=?");
$stmt->bind_param('s',$user_link);
$stmt->execute();
$results = mysqli_stmt_get_result($stmt);
if(!empty($results)){
    if(mysqli_num_rows($results)>0){
        $output['read_user_success']=true;
        $row = mysqli_fetch_assoc($results);
        $user_id =$row['user_id'];
        $output['data'][] = $user_id;
    }else{
        $output['errors'][] = 'NOTHING TO READ';
        exit();
    }
}else{
    $output['errors'][] = 'INVALID QUERY';
    exit();
}
if(empty($_POST['offset'])){
    $output['errors'][] = "MISSING OUTPUT";
}
$offset = $_POST['offset'];
$stmt = $conn->prepare("SELECT c.channel_title, 
c.youtube_channel_id,c.description,c.thumbnail_file_name, 
v.video_title, v.description,v.published_at
FROM channels AS c 
JOIN channels_to_users AS ctu
ON c.channel_id = ctu.channel_id 
JOIN videos AS v
ON v.channel_id = c.channel_id
WHERE ctu.user_id = {$user_id}
ORDER BY v.published_at LIMIT 40 OFFSET ?");
$stmt->bind_param('i',$offset);
$stmt->execute();
$result = mysqli_stmt_get_result($stmt);
if(!empty($result)){
    if(mysqli_num_rows($result)>0){
        $output['success']=true;
        while($row = mysqli_fetch_assoc($result)){
            $output['data'][] = $row;
        }
    }else{
        $output['nothing_to_read'] = true;
    }
}else{
    $output['errors'][] = 'INVALID QUERY';
}
?>