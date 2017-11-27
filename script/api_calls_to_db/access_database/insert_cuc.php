<?php
if(empty($LOCAL_ACCESS)){
    die('insert cuc, direct access not allowed');
}
//called from access php or insert category
//insert cuc into existing category when called directly
$youtube_channel_id = $_POST['youtube_channel_id'];
$category_name = $_POST['category_name']; 
//check for duplicates
$query = 
    "SELECT
        *
    FROM
        category_to_user_to_channel AS cuc
    JOIN
        channels AS c ON cuc.channel_id = c.channel_id
    JOIN	
        users AS u ON cuc.user_id = u.user_id
    JOIN
        categories AS ct ON ct.category_id = ct.category_id
    WHERE
        u.user_link = ? AND ct.category_name = ? AND c.youtube_channel_id = ?";
if(!($stmt = $conn->prepare($query))){
    $output['errors'][] = 'query failed read cuc';
    output_and_exit($output);
}
$stmt->bind_param('sss',$user_link,$category_name,$youtube_channel_id);
$stmt->execute();
$result = $stmt->get_result();
if($result->num_rows>0){
    $output['messages'][] = 'duplicate found!';
    output_and_exit($output);
}
if(empty($category_id)){
    $query = 
        "SELECT
            cuc.category_id
        FROM
            category_to_user_to_channel AS cuc
        JOIN
            categories AS ct ON cuc.category_id = ct.category_id
        JOIN
            users AS u ON u.user_id = cuc.user_id
        WHERE
            u.user_link = ? AND ct.category_name = ?";
    $getting_category_id = $conn->prepare($query);
    if(!$getting_category_id->bind_param('ss',$user_link,$category_name)){
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
$sqli = 
    "INSERT INTO
        category_to_user_to_channel
            (channel_id,
            user_id,
            category_id)
    SELECT
        c.channel_id,
        u.user_id,
        ?
    FROM
        channels AS c,
        users AS u
    WHERE
        c.youtube_channel_id = ? AND u.user_link = ?";
if(!($stmt = $conn->prepare($sqli))){
    $output['errors'][]= 'invalid query';
    output_and_exit($output);
};
$stmt->bind_param('iss',$category_id, $youtube_channel_id, $user_link);
$stmt->execute();
if($conn->affected_rows>0){
    $output['messages'][] = 'insert cuc success';
    $output['success'] = true;
}else{
    $output['errors'][] = "could not insert cuc";
    output_and_exit($output);
}
?>