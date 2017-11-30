<?php
//get user id, currently not in use
if(empty($LOCAL_ACCESS)){
    die("no direct access allowed, read user");
}
$user_link = $_SESSION['user_link'];
$sqli = 
    "SELECT
        user_id
    FROM
        users
    WHERE
        user_link = ?";
$stmt = $conn->prepare($sqli);
$stmt->bind_param('s',$user_link);
$stmt->execute();
$result = $stmt->get_result();
if(!empty($result)){
    if($result->num_rows>0){
        $row = $result->fetch_assoc();
        $user_id = $row['user_id'];
    }else{
        $output['nothing_to_read'] = true;
    }
}else{
    $output['errors'][] = 'INVALID QUERY READ USER ID IN ACCESS ';
}
?>