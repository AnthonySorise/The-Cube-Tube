<?php
//called from access, will delete category and related channel links
if(empty($LOCAL_ACCESS)){
    die('no direct access allowed');
}
//check for missing data, exit and output error if anthing is missing
if(empty($_POST['category_name'])){
    $output['errors'][] = 'missing category name';
    output_and_exit($output); 
}
//sanitize post data into string
$category_name = filter_var($_POST['category_name'], FILTER_SANITIZE_STRING);
//prepared statement to delete category
$query = 
    "DELETE
        ct,
        ctc
    FROM
        categories AS ct
    JOIN
        categories_to_channels AS ctc ON ctc.category_id = ct.category_id
    WHERE
        ct.category_name = ? AND ct.user_id = ?";
if(!($stmt = $conn->prepare($query))){
    $output['errors'][] = 'delete category statement failed';
    output_and_exit($output);
}
$stmt->bind_param('si',$category_name,$user_id);
$stmt->execute();
//output message for success or fail
if($conn->affected_rows>0){
    $output['success'] = true;
    $output['messages'][] = 'delete successful';
}else{
    $output['errors'][] = 'nothing to delete';
}
?>