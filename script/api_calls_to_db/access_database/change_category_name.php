<?php
if(empty(LOCAL_ACCESS)){
    die('no direct access allowed');
}
$category_name = $_POST['category_name'];
if(empty($category_name)){
    $output['errors'][] = 'missing category name';
    output_and_exit($output);
}
$query = 
    "UPDATE
        ct.category_name
    FROM
        categories AS ct
    JOIN
        category_to_user_to_channel AS cuc ON cuc.category_id = ct.category_id
    JOIN
        users AS u ON cuc.user_id = u.user_id
    WHERE
        u.user_link = ? AND ct.category_name = ?";
$stmt = $conn->prepare($query);
if(!$stmt->bind_param('ss',$user_link,$category_name)){
    $output['errors'][] = 'query failed';
};
$stmt->execute();
if($conn->affected_rows>0){
    $output['messages'][] = 'change name success';
    $output['success'] = true; 
}else{
    $output['errors'][] = 'could not change name';
}
?>