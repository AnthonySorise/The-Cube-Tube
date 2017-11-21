<?php
if(empty($LOCAL_ACCESS)){
    die('insert ctu, direct access not allowed');
}
$user_id = USER_LINK;
$sqli = "INSERT INTO category_to_user_to_channel 
SET user_id = ?, channel_id = ?, category_id = ?";
$stmt = $conn->prepare($sqli);
$stmt->bind_param('iii',$user_id,$channel_id,$category_id);
$stmt->execute();
if(empty($stmt)){
    $output['errors'][]= 'invalid query';
    output_and_exit($output);
}else{
    if(mysqli_affected_rows($conn)>0){
        $output['success'] = true;
    }else{
        $output['errors'][] = "could not insert cuc";
    }
}



?>