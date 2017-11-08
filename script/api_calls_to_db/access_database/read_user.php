<?php
if(empty($LOCAL_ACCES)){
    $output['errors'][] = "no direct access allowed";
}
$user_link = user_link;
if(empty($user_link)){
    $output['errors'][] ='MISSING USER ID';
}
$stmt = $conn->prepare("SELECT user_id FROM users WHERE user_link=?");
$stmt->bind_param('s',$user_id);
$stmt->execute();
$results = mysqli_stmt_get_result($stmt);
if(!empty($results)){
    if(mysqli_num_rows($results)>0){
        $output['success']=true;
        $row = mysqli_fetch_assoc($results);
        $output['data'][]=$row;
    }else{
        $output['errors'][] = 'NOTHING TO READ';
    }
}else{
    $output['errors'][] = 'INVALID QUERY';
}
