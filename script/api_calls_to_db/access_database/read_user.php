<?php
if(empty($LOCAL_ACCESS)){
    die('direct access not allowed');
}
$user_link = $_POST['user_link'];
if(empty($user_link)){
    $output['errors'][] ='MISSING USER_LINK';
}
$stmt = $conn->prepare("SELECT `user_id` FROM `users` WHERE `user_link`=?");
$stmt->bind_param('s',$user_link);
$stmt->execute();
$results = mysqli_stmt_get_result($stmt);
if(!empty($results)){
    if(mysqli_num_rows($results)>0){
        $output['read_user_success']=true;
        $row = mysqli_fetch_assoc($results);
        $user_id=$row['user_id'];
    }else{
        $output['errors'][] = 'NOTHING TO READ';
        exit();
    }
}else{
    $output['errors'][] = 'INVALID QUERY';
    exit();
}
include('read_channels_vids_by_user_link.php');
?>