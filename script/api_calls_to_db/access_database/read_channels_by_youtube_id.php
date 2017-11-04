 <?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
$output['data'] = [];
$youtube_channel_id = $_POST['youtube_channel_id'];
if(empty($youtube_channel_id)){
    $output['errors'][] = "MISSING ID";
}
$sqli =  "SELECT  `channel_title`, 
`description`,`thumbnail_file_name` FROM `channels` WHERE youtube_channel_id = ? ";
$stmt = mysqli_stmt_init($conn);
if(!mysqli_stmt_prepare($stmt,$sqli)){
    echo "SQL statement failed";
}else {
    mysqli_stmt_bind_param($stmt, "s", $youtube_channel_id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    if (mysqli_num_rows($result)>0) {
        $output['success'] = true;
        while ($row = mysqli_fetch_assoc($result)) {
            $output['data'][] = $row;
        }
    } else {
        $output['errors'][] = mysqli_error($conn);
    }
}
?>