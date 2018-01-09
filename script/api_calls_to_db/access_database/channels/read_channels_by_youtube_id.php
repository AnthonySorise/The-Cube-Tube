 <?php
 //called from access.php, will check if channel exist in database if so provide information
if(empty($LOCAL_ACCESS)){
    die('direct access not allowed');
}
//check for missing data, exit and output error if anthing is missing
if(empty($_POST['youtube_channel_id'])){
    $output['errors'][] = 'missing youtube channel id';
    output_and_exit($output);
}
$youtube_channel_id = $_POST['youtube_channel_id'];
if(!(preg_match('/^[a-zA-Z0-9\-\_]{24}$/', $youtube_channel_id))){
    $output['errors'][] = 'INVALID YOUTUBE CHANNEL ID';
    output_and_exit($output);
}
//grab a single channel using youtube channel id
$query = 
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
if(!$stmt=$conn->prepare($query)){
    $output['errors'][] = 'sql failed';
    output_and_exit($output);
};
$stmt->bind_param('s', $youtube_channel_id);
$stmt->execute();
$result = $stmt->get_result();
//output success or fail data 
if($result->num_rows>0){
    $output['success'] = true;
    $row = $result->fetch_assoc();
    $output['data'][] = $row;
}else{
    $output['errors'][] = 'no channel to read';
    $output['nothing_to_read'] = true;
}
?>