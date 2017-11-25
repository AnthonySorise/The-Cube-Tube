<?php
if(empty($LOCAL_ACCESS)){
    die('no direct access allowed');
}
$video_title = $_POST['video_title'];
if(empty($video_title)){
    $output['errors'][] = 'missing video title';
    output_and_exit($output);
}
$query = 
    "SELECT 
        youtube_video_id,
        description,
        published_at,
        video_title
    FROM 
        videos
    WHERE 
        video_title LIKE ?";
$stmt = $conn->prepare($query);
if(!$stmt->prepare('s',"%{$video_title}%")){
    $output['errors'][] = 'query failed';
    output_and_exit($output);
};
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