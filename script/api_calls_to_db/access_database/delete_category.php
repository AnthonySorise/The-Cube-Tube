<?php
//called from access
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
        categories_to_users_to_channels AS cuc ON cuc.category_id = ct.category_id
    JOIN
        users AS u ON u.user_id = cuc.user_id
    WHERE
        ct.category_name = ? AND u.user_link = ?";
$stmt = $conn->prepare($sqli);
$stmt->bind_param('ss',$category_name,$user_link);
if(!$stmt->execute()){
    $output['errors'] = 'statement failed';
    output_and_exit($output);
}else{
    if($conn->affected_rows>0){
        $output['success'] = true;
        $output['messages'][] = 'delete successful';
    }else{
        $output['errors'][] = 'nothing to delete';
    }
}
?>