<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
$user_id = $_POST['user_id'];
$channel_id = $_POST['channel_id'];
if(empty($user_id)){
    $output['errors'][] ='MISSING USER ID';
}
if(empty($channel_id)){
    $output['errors'][] = 'MISSING CHANNEL ID';
}
$sqli = "INSERT INTO `channels_to_users` SET `user_id` = ?, `channel_id`=?";
$stmt = mysqli_stmt_init($conn);
if(!mysqli_stmt_prepare($stmt,$sqli)){
    $output['errors'][] = "SQL statement failed";
}else{
    mysqli_stmt_bind_param($stmt,"ii",$user_id,$channel_id);
    mysqli_stmt_execute($stmt);
    if(mysqli_affected_rows($conn)>0){
        $output['success'] = true;
        $output['id'] = mysqli_insert_id($conn);
    }
    else{
        $output['errors'] = 'UNABLE TO INSERT INTO CTU';
    }
}
