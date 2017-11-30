<?php
//called from access.php
if(empty($LOCAL_ACCESS)){
    die('delete ctu, direct access not allowed');
}
if(empty($_POST['youtube_channel_id'])){
    $output['errors'] = 'missing youtube channel id at delete ctc';
    output_and_exit($output);
}
$youtube_channel_id = $_POST['youtube_channel_id'];
if(!(preg_match('/^[a-zA-Z0-9\-\_]{24}$/', $youtube_channel_id))){
    $output['errors'][] = 'INVALID YOUTUBE CHANNEL ID';
    output_and_exit($output);
}
// if(empty($_POST['category_name'])){//add if we can connect channels to multiple categories
//     $output['errors'] = 'missing category name at delete ctc';
//     output_and_exit($output);
// }
// $category_name = $_POST['category_name'];
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
if($conn->affected_rows>0){
    $output['messages'][] = 'deleted ctcs';
    $output['success'] = true;
}else{
    $output['messages'][] = 'no ctcs to remove';
}
?>