<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
if(empty($offset)){
    $output['errors'][] = "MISSING OFFSET";
}
$user_id = $_POST['user_id'];
$stmt = $conn->prepare("SELECT `c.channel_title`, 
`c.youtube_channel_id`,`c.description`,`c.thumbnail_file_name` 
FROM `channels` AS `c` 
JOIN `channels_to_users` AS `ctu`
ON `c.channel_id` = `ctu.channel_id` 
WHERE `ctu.user_id` = ? 
ORDER BY `c.channel_title`");
$stmt->bind_param("i",$user_id);
$stmt->execute();
if(!empty($stmt)){
    if(mysqli_num_rows($stmt)>0){
        $output['success']=true;
        while($row = mysqli_fetch_assoc($stmt)){
            $output['data'][] = $row;
        }
    }else{
        $output['nothing_to_read'] = true;
    }
}else{
    $output['errors'][] = 'INVALID QUERY';
}
?>


