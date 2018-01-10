<?php
//being called during insert ctu if session link is empty, insert user info into db
if(empty($LOCAL_ACCESS)){
    die('insert user, direct access not allowed');
}
$user_link = $_SESSION['user_link'];
$date = date('Y-m-d H:i:s');
$ip_address_at_sign_up = get_client_ip();
//grab user ip address
function get_client_ip() {
    $ipaddress = '';
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
//prepared statement to insert user info
$sqli = 
    "INSERT INTO
        users
    SET
        user_link = ?,
        date_created = ?,
        ip_address_at_signup = ?";
$stmt = $conn->prepare($sqli);
$stmt->bind_param('sss',$user_link,$date,$ip_address_at_sign_up);
$stmt->execute();
//if successful set user id to variable for use in insert ctu, exit if not
if($conn->affected_rows>0){
    $output['insert_user_success'] = true;
    $user_id = mysqli_insert_id($conn);
}
else{
    $output['errors'][] = 'Unable to insert data';
    output_and_exit($output);
}
?>