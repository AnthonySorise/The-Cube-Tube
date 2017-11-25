<?php
if(empty($LOCAL_ACCESS)){
    die('insert cuc, direct access not allowed');
}
//file called by insert categories
//inserting the link between user channel and category
$category_name = $_POST['category_name']; 
$youtube_channel_id = $_POST['youtube_channel_id'];
$sqli = 
    "INSERT INTO
        category_to_user_to_channel
            (channel_id,
            user_id,
            category_id)
    SELECT
        c.channel_id,
        u.user_id,
        ct.category_id
    FROM
        channels AS c,
        users AS u,
        categories AS ct
    WHERE
        c.youtube_channel_id = ? AND u.user_link = ? AND ct.category_name = ?";
$stmt = $conn->prepare($sqli);
$stmt->bind_param('sss',$youtube_channel_id, $user_link, $category_name);
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