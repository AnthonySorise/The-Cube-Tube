<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
$user_id = $_POST['user_id'];
$channel_id = $_POST['channel_id'];
if(empty($user_id)){
    $output['errors'][] ="MISSING USER ID";
}
if(empty($channel_id)){
    $output['errors'][] = "MISSING CHANNEL ID";
}
$stmt = $conn->prepare("INSERT INTO channels_to_users SET user_id=?, channel_id=?");
$stmt->bind_param("ii",$user_id,$channel_id);
$stmt->execute();
if(empty($stmt)) {
    $output['errors'] = "INVALID QUERY";
}else{
    if(mysqli_affected_rows($stmt)>0){
        $output['success'] = true;
        $output['id'] = mysqli_insert_id($conn);
    }
    else{
        $output['errors'] = "UNABLE TO INSERT INTO CTU";
    }
}