<?php
if(empty($LOCAL_ACCESS)){
    die('insert ctu, direct access not allowed');
}
$user_id = USER_LINK;
//grabbing channel id
$sqli = "SELECT channel_id
FROM channels WHERE youtube_channel_id = ?";
$stmt = $conn->prepare($sqli);
$stmt->bind_param('s', $youtube_channel_id);
$stmt->execute();
$result = $stmt->get_result();
if ($result->num_row>0) {
    $row = $result->fetch_assoc();
    $channel_id = $row['channel_id'];
} else {
    $output['messages'] = "can't read channel";
    output_and_exit($output);
}
//inserting the link between user channel and category
$sqli = "INSERT INTO category_to_user_to_channel 
SET user_id = ?, channel_id = ?, category_id = ?";
$stmt = $conn->prepare($sqli);
$stmt->bind_param('iii',$user_id,$channel_id,$category_id);
$stmt->execute();
if(empty($stmt)){
    $output['errors'][]= 'invalid query';
    output_and_exit($output);
}else{
    if($conn->affected_rows>0){
        $output['success'] = true;
    }else{
        $output['errors'][] = "could not insert cuc";
        output_and_exit($output);
    }
}



?>