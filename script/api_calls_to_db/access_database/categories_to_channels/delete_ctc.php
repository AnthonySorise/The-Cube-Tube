<?php
//called from access.php, removes link between a category and related channel
if(empty($LOCAL_ACCESS)){
    die('delete ctu, direct access not allowed');
}
//check for missing data, exit and output error if anthing is missing
if(empty($_POST['youtube_channel_id'])){
    $output['errors'] = 'missing youtube channel id at delete ctc';
    output_and_exit($output);
}
//validate the youtube channel id
$youtube_channel_id = $_POST['youtube_channel_id'];
if(!(preg_match('/^[a-zA-Z0-9\-\_]{24}$/', $youtube_channel_id))){
    $output['errors'][] = 'INVALID YOUTUBE CHANNEL ID';
    output_and_exit($output);
}
//delete categories to channels entry based on youtube channel and user id
$query = 
    "DELETE
        ctc
    FROM
        categories_to_channels ctc
    JOIN
        channels c ON ctc.channel_id = c.channel_id
    JOIN
        categories ct ON ctc.category_id = ct.category_id
    WHERE
        c.youtube_channel_id = ? AND ct.user_id = ?";
if(!($stmt = $conn->prepare($query))){
    $output['errors'][] = 'delete ctc query fail';
    output_and_exit($output);
}
$stmt->bind_param('si',$youtube_channel_id,$user_id);
$stmt->execute();
//output success or fail messsage
if($conn->affected_rows>0){
    $output['messages'][] = 'deleted ctcs';
    $output['success'] = true;
}else{
    $output['messages'][] = 'no ctcs to remove';
}
?>