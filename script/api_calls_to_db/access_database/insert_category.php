<?php
//called by access, insert to categories table then insert into ctc link
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
if(empty($_POST['category_name'])){
    $output['errors'][] = 'MISSING NAME OF CATEGORY';
    output_and_exit($output);
}
$category_name = $_POST['category_name']; 
//check for duplicate
$query =  
    "SELECT
        category_id
    FROM
        categories
    WHERE
        user_id = ? AND category_name = ?";
if(!($stmt = $conn->prepare($query))){
    $output['errors'][] = 'query failed';
    output_and_exit($output);
}
$stmt->bind_param('is',$user_id,$category_name);
$stmt->execute();
$results = $stmt->get_result();
if($results->num_rows>0){
    $row = $result->fetch_assoc();
    $category_id = $row['category_id'];
    include('insert_ctc.php');
    output_and_exit($output);
}
//insert category if no duplicate is found
$sqli = 
    "INSERT INTO
        categories
    SET
        category_name = ?,
        user_id = ?";
$stmt = $conn->prepare($sqli);
if(!($stmt->bind_param('si',$category_name,$user_id))){
    $output['errors'][] = 'bind param failed at insert category';
    output_and_exit($output);
};
$stmt->execute();
//if category is inserted, insert the category to user to channel link
if($conn->affected_rows>0){
    $output['messages'][] = 'insert category success';
    $category_id = $conn->insert_id;
    include('insert_ctc.php');
}else{
    $output['errors'][] = 'failed to add category';
}
?>