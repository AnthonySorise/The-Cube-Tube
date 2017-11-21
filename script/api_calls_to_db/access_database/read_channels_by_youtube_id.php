 <?php
if(empty($LOCAL_ACCESS)){
    die('direct access not allowed');
}
$youtube_channel_id = $_POST['youtube_channel_id'];
if(empty($youtube_channel_id)){
    $output['errors'][] = 'MISSING ID';
}
//tm87
// if(!preg_match('/[a-zA-Z0-9\-\_]{24}/', $youtube_channel_id)){
//     $output['errors'][] = 'INVALID YOUTUBE CHANNEL ID';
//     output_and_exit($output);
// }

$sqli = 
"SELECT
  channel_title,
  description,
  thumbnail_file_name,
  youtube_channel_id,
  last_channel_pull
FROM
  channels
WHERE
  youtube_channel_id = ?";
$stmt=$conn->prepare($sqli);
$stmt->bind_param('s', $youtube_channel_id);
$stmt->execute();
$result = $stmt->get_result();
if(empty($stmt)){
    $output['errors'][] = 'invalid query';
}else{
    if ($result->num_rows>0) {
        $output['success'] = true;
        $row = $result->fetch_assoc();
        $output['data'][] = $row;
    } else {
        $output['errors'][] = 'no channel to read';
        $output['nothing_to_read'] = true;
    }
}
?>