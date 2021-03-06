<?php
//called from access.php
//grab a list of videos based on a array of channels with a limit of 40 and a offset
if(empty($LOCAL_ACCESS)){
    die("direct access not allowed");
}
//check for missing data, exit and output error if anthing is missing
if(empty($_POST['channel_id_array'])){
    $output['errors'][] = 'MISSING YOUTUBE ARRAY';
    output_and_exit($output);
}
$youtube_array = $_POST['channel_id_array'];
if(!isset($_POST['offset'])||!is_numeric($_POST['offset'])){
    $_POST['offset'] = 0;
}
$offset = $_POST['offset'];
//complete query statement based on length of array
$in_stmt = implode(',', array_fill(0, count($youtube_array), '?'));
//query statement to grab video information for the channels in the array
$stmt = $conn->prepare(
    "SELECT
        v.youtube_video_id,
        v.description,
        v.published_at,
        v.video_title,
        c.channel_title,
        c.youtube_channel_id
    FROM
        videos AS v
    JOIN
        channels AS c ON v.channel_id = c.channel_id
    WHERE
        c.youtube_channel_id IN ($in_stmt)
    ORDER BY
        v.published_at DESC
    LIMIT 40 OFFSET ?");
//complete bind parameters based on length of youtube array
$param_types = implode('', array_fill(0, count($youtube_array), 's')) . 'i';
$stmt->bind_param($param_types, ...array_merge($youtube_array, [$offset]));
$stmt->execute();
$result = $stmt->get_result();
//output data if successful or error message if not
if ($result->num_rows>0) {
    $output['success'] = true;
    while ($row = $result->fetch_assoc()) {
        $output['data'][] = $row;
    }
} else {
    $output['errors'][] = 'no results';
}
?>