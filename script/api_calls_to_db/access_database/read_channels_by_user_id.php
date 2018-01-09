<?php
if(empty($LOCAL_ACCESS)){
    die('direct access not allowed');
}
if(empty($_SESSION['user_link'])){
    $output['user'] = false;
    output_and_exit($output);
}
//grab all channels for a given user
$stmt = $conn->prepare(
    "SELECT
        c.channel_title,
        c.youtube_channel_id,
        c.description,
        c.thumbnail_file_name,
        c.last_channel_pull
    FROM
        channels AS c
    JOIN
        channels_to_users AS ctu ON c.channel_id = ctu.channel_id
    JOIN
        users AS u ON u.user_id = ctu.user_id
    WHERE
        u.user_id = ?
    ORDER BY
        c.channel_title");
$stmt->bind_param('i',$user_id);
$stmt->execute();
$result = $stmt->get_result();
if($result->num_rows>0){
    $output['success']=true;
    while($row = $result->fetch_assoc()){
        $output['data'][] = $row;
    }
    //provide user link to front end
    $output['user_link'] = $user_link;
}else{
    $output['nothing_to_read'] = true;
}
?>