<?php
if(empty($LOCAL_ACCESS)){
    die('insert ctu, direct access not allowed');
}
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
        u.user_id
    FROM
        channels AS c,
        users AS u
    WHERE
        c.youtube_channel_id = ? AND u.user_link = ? 
    SET
        category_id = ?";
$stmt = $conn->prepare($sqli);
$stmt->bind_param('ssi',$youtube_channel_id, $user_link, $category_id);
$stmt->execute();
if(empty($stmt)){
    $output['errors'][]= 'invalid query';
    output_and_exit($output);
}else{
    if($conn->affected_rows>0){
        $output['messages'][] = 'insert cuc success';
        $output['success'] = true;
    }else{
        $output['errors'][] = "could not insert cuc";
        output_and_exit($output);
    }
}
?>