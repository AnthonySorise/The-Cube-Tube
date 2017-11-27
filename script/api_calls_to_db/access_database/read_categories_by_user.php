<?php
if(empty($LOCAL_ACCESS)){
    die('direct access allowed');
}
if(empty($_SESSION['user_link'])){
    $output['messages'] = 'no user';
    output_and_exit($output);
}
$query = 
    "SELECT
        c.channel_title,
        c.youtube_channel_id,
        ct.category_name
    FROM
        channels AS c
    JOIN
        category_to_user_to_channel AS cuc ON c.channel_id = cuc.channel_id
    JOIN
        users AS u ON u.user_id = cuc.user_id
    JOIN
        categories AS ct ON ct.category_id = cuc.category_id
    WHERE
        u.user_link = ?
    ORDER BY
        ct.category_name";
if(!($stmt = $conn->prepare($query))){
    $output['errors'][] = 'invalid query at read categories';
    output_and_exit($output);
};
$stmt->bind_param('s',$user_link);
$stmt->execute();
$result = $stmt->get_result();
if($result->num_rows>0){
    $output['success']=true;
    while($row = $result->fetch_assoc()){
        $output['data'][] = $row;
    }
}else{
    $output['nothing_to_read'] = true;
}
?>