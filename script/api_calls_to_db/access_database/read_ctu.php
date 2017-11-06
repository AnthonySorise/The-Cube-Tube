<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
$output['data'] = [];
$user_id = $_POST['user_id'];
if(empty($user_id)){
    $output['errors'][] ='MISSING USER_ID';
}
$stmt = $conn->prepare("SELECT * FROM `channels_to_users` WHERE `user_id`=?");
$stmt->bind_param('i',$user_id);
$stmt->execute();
$results = mysqli_stmt_get_result($stmt);
if(!empty($results)){
    if(mysqli_num_rows($results)>0){
        $output['success']=true;
        while($row = mysqli_fetch_assoc($results)){
            $output['data'][] = $row;
        }
    }else{
        $output['errors'][] = 'NOTHING TO READ';
    }
}else{
    $output['errors'][] = 'INVALID QUERY';
}
?>