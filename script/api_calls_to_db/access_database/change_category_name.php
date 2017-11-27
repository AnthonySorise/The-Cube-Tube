<?php
//called from access, will change category name for specific user
if(empty(LOCAL_ACCESS)){
    die('no direct access allowed');
}
$category_name = $_POST['category_name'];
$new_name = $_POST['new_name'];
if(empty($category_name)){
    $output['errors'][] = 'missing category name';
    output_and_exit($output);
}
$query = 
    "UPDATE
        categories AS ct
    JOIN
        category_to_user_to_channel AS cuc ON cuc.category_id = ct.category_id
    JOIN
        users AS u ON cuc.user_id = u.user_id
    SET
        category_name = ?
    WHERE
        category_name = ? AND user_link = ?";
if(!($stmt = $conn->prepare($query))){
    $output['errors'][] = 'query failed';
    output_and_exit($output);
}
$stmt->bind_param('sss',$new_name,$category_name,$user_link);
$stmt->execute();
if($conn->affected_rows>0){
    $output['messages'][] = 'change name success';
    $output['success'] = true; 
}else{
    $output['errors'][] = 'could not change name';
}
?>