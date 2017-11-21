<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
$category_name = $_POST['category_name']; 
$youtube_channel_id = $_POST['youtube_channel_id'];
include('read_user');
if(empty($category_name)){
    $output['errors'][] = 'MISSING NAME OF CATEGORY';
}
$sqli = "INSERT INTO categories SET category_name=?";
$stmt = $conn->prepare($sqli);
$stmt->bind_param('s',$category_name);
$result = $stmt->get_result();
if(empty($result)){
    $output['errors'][] = 'invalid query';
}else{
    if($result->num_rows>0){
        $output['messages'][] = 'insert category success';
        $category_id = $conn->insert_id;
        include('insert_cuc.php');
    }else{
        $output['errors'][] = "failed to add category";
    }
}
?>