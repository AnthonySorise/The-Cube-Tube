<?php
if(empty($LOCAL_ACCESS)){
    die('insert cuc, direct access not allowed');
}
//called from access php or insert category
//insert cuc into existing category when called directly
if(empty($_POST['youtube_channel_id'])){
    $output['errors'][] = 'missing youtube channel id at insert cuc';
    output_and_exit($output);
}
if(empty($_POST['category_name'])){
    $output['errors'][] = 'missing category name at insert cuc';
    output_and_exit($output);
}
$youtube_channel_id = $_POST['youtube_channel_id'];
$category_name = $_POST['category_name']; 
//grab channel id
include('read_channel_id.php');
//grab category id
if(empty($category_id)){
    $query = 
        "SELECT
            cuc.category_id
        FROM
            category_to_user_to_channel AS cuc
        JOIN
            categories AS ct ON cuc.category_id = ct.category_id
        WHERE
            u.user_id = ? AND ct.category_name = ?";
    $getting_category_id = $conn->prepare($query);
    if(!$getting_category_id->bind_param('is',$user_id,$category_name)){
        $output['errors'][] = 'query failed at get category id';
    }
    $getting_category_id->execute();
    $result = $getting_category_id->get_result();
    if($result->num_rows>0){
        $row = $result->fetch_assoc();
        $category_id = $row['category_id'];
    }else{
        $output['errors'][] = 'could not find category id';
        output_and_exit($output);
    }
}
//check for duplicates
$query = 
    "SELECT
        cuc_id
    FROM
        category_to_user_to_channel 
    WHERE
        user_id = ? AND category_id = ? AND channel_id = ?";
if(!($stmt = $conn->prepare($query))){
    $output['errors'][] = 'query failed read cuc';
    output_and_exit($output);
}
$stmt->bind_param('iii',$user_id,$category_id,$channel_id);
$stmt->execute();
$result = $stmt->get_result();
if($result->num_rows>0){
    $output['messages'][] = 'duplicate found!';
    output_and_exit($output);
}
//insert if no dubs are found
$sqli = 
    "INSERT INTO
        category_to_user_to_channel
    SET 
        channel_id = ?,
        category_id =?,
        user_id = ?";
if(!($stmt = $conn->prepare($sqli))){
    $output['errors'][]= 'invalid query';
    output_and_exit($output);
};
$stmt->bind_param('iii',$category_id, $channel_id, $user_id);
$stmt->execute();
if($conn->affected_rows>0){
    $output['messages'][] = 'insert cuc success';
    $output['success'] = true;
}else{
    $output['errors'][] = "could not insert cuc";
    output_and_exit($output);
}
?>