<?php
//called by access, insert to categories table then insert into cuc link
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
$category_name = $_POST['category_name']; 
$youtube_channel_id = $_POST['youtube_channel_id'];
if(empty($category_name)){
    $output['errors'][] = 'MISSING NAME OF CATEGORY';
}
$sqli = 
    "INSERT INTO
        categories
    SET
        category_name = ?";
$stmt = $conn->prepare($sqli);
if(!$stmt->bind_param('s',$category_name)){
    $output['errors'][] = 'invalid query';
    output_and_exit($output);
};
$stmt->execute();
//if category is inserted, insert the category to user to channel link
if($conn->affected_rows>0){
    $output['messages'][] = 'insert category success';
    $category_id = $conn->insert_id;
    include('insert_cuc_from_insert_ct.php');
}else{
    $output['errors'][] = "failed to add category";
}
?>