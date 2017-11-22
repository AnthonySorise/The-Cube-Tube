<?php
if(empty($LOCAL_ACCESS)){
    die('direct access not allowed');
}
if(empty($_SESSION['user_link'])){
    $output['user'] = false;
    output_and_exit($output);
}
$user_link = $_SESSION['user_link'];
$stmt = $conn->prepare(
    "SELECT
        c.channel_title,
        c.youtube_channel_id,
        c.description,
        c.thumbnail_file_name,
        c.last_channel_pull,
        u.user_link
    FROM
        channels AS c
    JOIN
        channels_to_users AS ctu ON c.channel_id = ctu.channel_id
    JOIN
        users AS u ON u.user_id = ctu.user_id
    WHERE
        u.user_link = ?
    ORDER BY
        c.channel_title");
$stmt->bind_param('s',$user_link);
$stmt->execute();
$result = $stmt->get_result();
if(!empty($result)){
    if($result->num_rows>0){
        $output['success']=true;
        while($row = $result->fetch_assoc()){
            $output['data'][] = $row;
        }
    }else{
        $output['nothing_to_read'] = true;
    }
}else{
    $output['errors'][] = 'INVALID QUERY';
}
?>