<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
$user_link = $_POST['user_link'];
$date_created = date("Y-m-d H:i:s");
$ip_address_at_sign_up = get_client_ip();
function get_client_ip() {
    if (isset($_SERVER['HTTP_CLIENT_IP']))
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_X_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    else if(isset($_SERVER['REMOTE_ADDR']))
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    else
        $ipaddress = 'UNKNOWN';
    return $ipaddress;
}
if(empty($user_link)){
    $output['errors'] = "MISSING USERLINK";
}

$stmt = $conn->prepare("INSERT INTO `users` SET `user_link` = ?, `date_created` = ?, `ip_address_at_signup` =?");
$stmt->bind_param("sss",$user_link,$date_created,$ip_address_at_sign_up);
$stmt->execute();

if(!empty($stmt)){
    if(mysqli_affected_rows($conn)>0){
        $output['success'] = true;
        $output['id'] = mysqli_insert_id($conn);
    }
    else{
        $output['errors'][] = 'Unable to insert data';
        $output['errors'][] = $stmt;
    }
}else{
    $output['errors'][]= 'invalid query';
}
?>