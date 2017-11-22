<?php
//called by access
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
$stmt->bind_param('s',$category_name);
$stmt->execute();
if(empty($stmt)){
    $output['errors'][] = 'invalid query';
}else{
    //if category is inserted, insert the category to user to channel link
    if($result->affected_rows>0){
        $output['messages'][] = 'insert category success';
        $category_id = $conn->insert_id;
        include('insert_category_to_user_to_channel.php');
    }else{
        $output['errors'][] = "failed to add category";
    }
}
?>