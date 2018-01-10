<?php
//runs from access.php will delete a single channel to user link and all related channels to categories
if(empty($LOCAL_ACCESS)){
    die('delete ctu, direct access not allowed');
}
//check for missing data, exit and output error if anthing is missing
if(empty($_POST['youtube_channel_id'])){
    $output['errors'] = 'MISSING YOUTUBE CHANNEL ID';
}
//validate youtube channel id
$youtube_channel_id = $_POST['youtube_channel_id'];
if(!(preg_match('/^[a-zA-Z0-9\-\_]{24}$/', $youtube_channel_id))){
    $output['errors'][] = 'INVALID YOUTUBE CHANNEL ID';
    output_and_exit($output);
}
//grab channel id based on youtube's string id
include('./channels/read_channel_id.php');
//delete link from channels to users table
$sqli = 
    "DELETE
        ctu
    FROM
        channels_to_users ctu
    WHERE
        channel_id = ? AND user_id = ?";
if(!($stmt = $conn->prepare($sqli))){
    $output['errors'][]= 'invalid query';
    output_and_exit($output);
}   
$stmt->bind_param("ii",$channel_id,$user_id);
$stmt->execute();
//if deletion is successful delete all related categories to channels links for the user
if($conn->affected_rows>0){
    $output['success'] = true;
    $output['messages'][] = 'delete ctu success';
    $query = 
        "DELETE
            ctc
        FROM
            categories_to_channels ctc
        JOIN 
            categories AS ct ON ctc.category_id = ct.category_id
        WHERE
            ctc.channel_id = ? AND ct.user_id = ?";
    if(!($stmt = $conn->prepare($query))){
        $output['errors'][] = 'delete ctc query fail';
        output_and_exit($output);
    }
    $stmt->bind_param('ii',$youtube_channel_id,$user_id);
    $stmt->execute();
    if($conn->affected_rows>0){
        $output['messages'][] = 'deleted ctcs';
        $output['success'] = true;
    }else{
        $output['messages'][] = 'no ctcs to remove';
    }
}
else{
    $output['error'] = 'Unable to delete ctu';
}
?>