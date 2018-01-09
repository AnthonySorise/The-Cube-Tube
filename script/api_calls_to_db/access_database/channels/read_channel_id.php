<?php
//grab channel id to be used for other queries, included in other files
if(empty($LOCAL_ACCESS)){
    die('no direct access allowed');
}
//prepared statement to grab channel id
$sqli = 
    "SELECT 
        channel_id
    FROM 
        channels 
    WHERE 
        youtube_channel_id = ?";
$stmt = $conn->prepare($sqli);
$stmt->bind_param('s', $youtube_channel_id);
$stmt->execute();
$result = $stmt->get_result();
//set channel id to variable if success, exit if failed
if ($result->num_rows>0){
    $row = $result->fetch_assoc();
    $channel_id = $row['channel_id'];
}else{
    $output['messages'] = "channel not found in db";
    output_and_exit($output);
}
?>