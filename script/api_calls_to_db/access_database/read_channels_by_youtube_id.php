 <?php
if(empty($LOCAL_ACCESS)){
    die('direct access not allowed');
}
$output['data'] = [];
$youtube_channel_id = $_POST['youtube_channel_id'];
if(empty($youtube_channel_id)){
    $output['errors'][] = 'MISSING ID';
}
//tm87
// if(!preg_match('/[a-zA-Z0-9\-\_]{24}/', $youtube_channel_id)){
//     $output['errors'][] = 'INVALID YOUTUBE CHANNEL ID';
//     output_and_exit($output);
// }

$sqli = "SELECT channel_title, description,thumbnail_file_name, 
youtube_channel_id, last_channel_pull
FROM channels WHERE youtube_channel_id = ? ";
$stmt = mysqli_stmt_init($conn);
if(!mysqli_stmt_prepare($stmt,$sqli)){
    echo 'SQL statement failed';
}else {
    mysqli_stmt_bind_param($stmt, 's', $youtube_channel_id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    if (mysqli_num_rows($result)>0) {
        $output['success'] = true;
        $row = mysqli_fetch_assoc($result);
        $output['data'][] = $row;
    } else {
        $output['errors'][] = mysqli_error($conn);
        $output['nothing_to_read'] = true;
    }
}
?>