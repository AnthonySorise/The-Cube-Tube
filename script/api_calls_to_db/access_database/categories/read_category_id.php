<?php
//get category id to be used for other queries
//category id is based on category name and user id
if(empty($LOCAL_ACCESS)){
    die('no direct access allowed');
}
//prepared statement to grab category id
$query = 
    "SELECT
        category_id
    FROM
        categories 
    WHERE
        user_id = ? AND category_name = ?";
$stmt = $conn->prepare($query);
if(!$stmt->bind_param('is',$user_id,$category_name)){
    $output['errors'][] = 'query failed at get category id';
}
$stmt->execute();
$result = $stmt->get_result();
//set category id to a variable to future use or exit if nothing was found
if($result->num_rows>0){
    $row = $result->fetch_assoc();
    $category_id = $row['category_id'];
}else{
    $output['errors'][] = 'could not find category id';
    output_and_exit($output);
}
?>