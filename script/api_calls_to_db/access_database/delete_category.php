<?php
//called from access, will delete all categories and related channel to category to user links
if(empty($LOCAL_ACCESS)){
    die('no direct access allowed');
}
if(empty($_POST['category_name'])){
    $output['errors'][] = 'missing category name';
    output_and_exit($output); 
}
$category_name = $_POST['category_name'];
$sqli = 
    "DELETE
        ct,
        cuc
    FROM
        categories AS ct
    JOIN
        category_to_user_to_channel AS cuc ON cuc.category_id = ct.category_id
    WHERE
        ct.category_name = ? AND cuc.user_id = ?";
if(!($stmt = $conn->prepare($sqli))){
    $output['errors'][] = 'delete category statement failed';
    output_and_exit($output);
}
$stmt->bind_param('si',$category_name,$user_id);
$stmt->execute();
if($conn->affected_rows>0){
    $output['success'] = true;
    $output['messages'][] = 'delete successful';
}else{
    $output['errors'][] = 'nothing to delete';
}
?>