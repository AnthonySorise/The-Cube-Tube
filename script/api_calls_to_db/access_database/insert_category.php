<?php
//called by access, insert to categories table then insert into cuc link
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
$category_name = $_POST['category_name']; 
if(empty($category_name)){
    $output['errors'][] = 'MISSING NAME OF CATEGORY';
}
//check for duplicate
$query =  
    "SELECT
        cuc.cuc_id
    FROM
        category_to_user_to_channel AS cuc
    JOIN	
        users AS u ON cuc.user_id = u.user_id
    JOIN
        categories AS ct ON ct.category_id = ct.category_id
    WHERE
        u.user_link = ? AND ct.category_name = ?";
if(!($stmt = $conn->prepare($query))){
    $output['errors'][] = 'query failed';
    output_and_exit($output);
}
$stmt->bind_param('ss',$user_link,$category_name);
$stmt->execute();
$results = $stmt->get_result();
if($results->num_rows>0){
    $output['errors'][] = 'duplcate found';
    output_and_exit($output);
}

$sqli = 
    "INSERT INTO
        categories
    SET
        category_name = ?";
$stmt = $conn->prepare($sqli);
if(!$stmt->bind_param('s',$category_name)){
    $output['errors'][] = 'bind param failed at insert category';
    output_and_exit($output);
};
$stmt->execute();
//if category is inserted, insert the category to user to channel link
if($conn->affected_rows>0){
    $output['messages'][] = 'insert category success';
    $category_id = $conn->insert_id;
    include('insert_cuc.php');
}else{
    $output['errors'][] = 'failed to add category';
}
?>