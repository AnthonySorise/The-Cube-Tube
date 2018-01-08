<?php
if(empty($LOCAL_ACCESS)){
    die('insert ctc, direct access not allowed');
}
//called from access php or insert category
//when called from insert category, inserts category to channel table into newly created category
//insert a category to channel link into existing category when called directly
if(empty($_POST['youtube_channel_id'])){
    $output['errors'][] = 'missing youtube channel id at insert ctc';
    output_and_exit($output);
}
if(empty($_POST['category_name'])){
    $output['errors'][] = 'missing category name at insert ctc';
    output_and_exit($output);
}
$youtube_channel_id = $_POST['youtube_channel_id'];
if(!(preg_match('/^[a-zA-Z0-9\-\_]{24}$/', $youtube_channel_id))){
    $output['errors'][] = 'INVALID YOUTUBE CHANNEL ID';
    output_and_exit($output);
}
$category_name = $_POST['category_name']; 
//grab channel id
include('../channels/read_channel_id.php');
//grab category id
if(empty($category_id)){
    include('../categories/read_category_id.php');
}
//check for duplicates, will exit if found
$query = 
    "SELECT
        ctc_id
    FROM
        categories_to_channels
    WHERE
        category_id = ? AND channel_id = ?";
if(!($stmt = $conn->prepare($query))){
    $output['errors'][] = 'query failed read cuc';
    output_and_exit($output);
}
$stmt->bind_param('ii',$category_id,$channel_id);
$stmt->execute();
$result = $stmt->get_result();
if($result->num_rows>0){
    $output['messages'][] = 'duplicate found!';
    output_and_exit($output);
}
//insert into categories to channels if no duplicates are found
$sqli = 
    "INSERT INTO
        categories_to_channels
    SET 
        channel_id = ?,
        category_id =?";
if(!($stmt = $conn->prepare($sqli))){
    $output['errors'][]= 'invalid query';
    output_and_exit($output);
};
$stmt->bind_param('ii',$channel_id,$category_id);
$stmt->execute();
if($conn->affected_rows>0){
    $output['messages'][] = 'insert ctc success';
    $output['success'] = true;
}else{
    $output['errors'][] = "could not insert ctc";
    output_and_exit($output);
}
?>