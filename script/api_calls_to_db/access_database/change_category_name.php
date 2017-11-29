<?php
//called from access, will change category name for specific user
if(empty($LOCAL_ACCESS)){
    die('no direct access allowed');
}
if(empty($_POST['category_name'])){
    $output['errors'][] = 'missing category name';
    output_and_exit($output);
}
if(empty($_POST['new_name'])){
    $output['errors'][] = 'missing category name';
    output_and_exit($output);
}
$category_name = $_POST['category_name'];
$new_name = $_POST['new_name'];
$query = 
    "UPDATE
        categories 
    SET
        category_name = ?
    WHERE
        category_name = ? AND user_id = ?";
if(!($stmt = $conn->prepare($query))){
    $output['errors'][] = 'query failed';
    output_and_exit($output);
}
$stmt->bind_param('ssi',$new_name,$category_name,$user_id);
$stmt->execute();
if($conn->affected_rows>0){
    $output['messages'][] = 'change name success';
    $output['success'] = true; 
}else{
    $output['errors'][] = 'could not change name';
}
?>