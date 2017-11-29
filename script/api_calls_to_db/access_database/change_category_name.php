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
        categories AS ct
    JOIN
        category_to_user_to_channel AS cuc ON cuc.category_id = ct.category_id
    SET
        ct.category_name = ?
    WHERE
        ct.category_name = ? AND cuc.user_id = ?";
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