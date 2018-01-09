<?php
//read video using keywords and related channels
if(empty($LOCAL_ACCESS)){
    die('no direct access allowed');
}
//check for missing data, exit and output error if anthing is missing
if(empty($_POST['video_title'])){
    $output['errors'][] = 'missing video title';
    output_and_exit($output);
}
if(empty($_POST['youtube_channel_array'])){
    $output['errors'][] = 'missing channel array';
    output_and_exit($output);
}
$youtube_array = $_POST['youtube_channel_array'];
$video_title = $_POST['video_title'];
//use a like sql query search
$like = "%{$video_title}%";
//complete query based on length of channel array
$question_marks = implode(' OR ', array_fill(0, count($youtube_array), 'c.youtube_channel_id = ?'));
$param_types = implode('', array_fill(0, count($youtube_array), 's'));
$query = 
    "SELECT 
        v.youtube_video_id,
        v.description,
        v.published_at,
        v.video_title
    FROM 
        videos v
    JOIN 
        channels c ON c.channel_id = v.channel_id
    WHERE 
        video_title LIKE ? AND ({$question_marks})";
if(!$stmt = $conn->prepare($query)){
    $output['errors'][] = 'find video query failed';
    output_and_exit($output);
}
//complete bind parameters based on length of channel array
$stmt->bind_param("s{$param_types}",...array_merge([$like],$youtube_array));
$stmt->execute();
$results = $stmt->get_result();
if($results->num_rows>0){
    while($row = $results->fetch_assoc()){
        $output['data'][] = $row;
    }
    $output['success'] = true;
}else{
    $output['messages'][] = 'nothing to read';
}
?>