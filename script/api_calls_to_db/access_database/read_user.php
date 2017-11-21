<?php
if(empty($LOCAL_ACCESS)){
    die("no direct access allowed, read user");
}
$user_link = $_SESSION['user_link'];
$stmt = $conn->prepare("SELECT user_id FROM users WHERE user_link = ?");
$stmt->bind_param('s',$user_link);
$stmt->execute();
$result = mysqli_stmt_get_result($stmt);
if(!empty($result)){
    if(mysqli_num_rows($result)>0){
        $row = mysqli_fetch_assoc($result);
        define('USER_ID',$row['user_id']);
    }else{
        $output['nothing_to_read'] = true;
    }
}else{
    $output['errors'][] = 'INVALID QUERY READ USER ID IN ACCESS ';
}

?>