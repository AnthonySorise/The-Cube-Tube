<?php
if(empty($LOCAL_ACCESS)){
    die('insert ctu, direct access not allowed');
}
$youtube_channel_id = $_POST['youtube_channel_id'];
//file called by insert categories
//inserting the link between user channel and category
$sqli = 
    "INSERT INTO
        category_to_user_to_channel
            (channel_id,
            user_id,
            category_id)
    SELECT
        c.channel_id,
        u.user_id,
        ?
    FROM
        channels AS c,
        users AS u
    WHERE
        c.youtube_channel_id = ? AND u.user_link = ?";
if(!($stmt = $conn->prepare($sqli))){
    $output['errors'][]= 'invalid query';
    output_and_exit($output);
};
$stmt->bind_param('iss',$category_id, $youtube_channel_id, $user_link);
$stmt->execute();
if($conn->affected_rows>0){
    $output['messages'][] = 'insert cuc success';
    $output['success'] = true;
}else{
    $output['errors'][] = "could not insert cuc";
    output_and_exit($output);
}
?>