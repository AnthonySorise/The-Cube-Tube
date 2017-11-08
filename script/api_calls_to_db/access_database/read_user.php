<?php
if(empty($LOCAL_ACCES)){
    $output['errors'][] = "no direct access allowed";
}
$user_link = $_SESSION['user_link'];
if(empty($user_link)){
    $output['errors'][] ='MISSING USER LINK';
}
$stmt = $conn->prepare("SELECT user_id FROM users WHERE user_link=?");
$stmt->bind_param('s',$user_link);
$stmt->execute();
$results = mysqli_stmt_get_result($stmt);
if(!empty($results)){
    if(mysqli_num_rows($results)>0){
        $row = mysqli_fetch_assoc($results);
        define('user_id',$row['user_id']);
    }else{
        $output['errors'][] = 'NOTHING TO READ';
    }
}else{
    $output['errors'][] = 'INVALID QUERY';
}
