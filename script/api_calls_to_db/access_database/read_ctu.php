<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
$output['data'] = [];
$user_id = $POST['user_id'];
if(empty($user_id)){
    $output['errors'][] ="MISSING USER_ID";
}
$stmt = $conn->prepare("SELECT * FROM `channels_to_users` WHERE `user_id`=?");
$stmt->bind_param("s",$user_id);
$stmt->execute();
if(!empty($stmt)){
    if(mysqli_num_rows($stmt)>0){
        $output['success']=true;
        while($row = mysqli_fetch_assoc($stmt)){
            $output['data'][] = $row;
        }
    }else{
        $output['errors'][] = mysqli_error($conn);
    }
}else{
    $output['errors'][] = 'INVALID QUERY';
}
?>