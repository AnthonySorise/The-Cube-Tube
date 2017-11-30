<?php
if(empty($LOCAL_ACCESS)){
    die('insert ctu, direct access not allowed');
}
if(empty($_POST['youtube_channel_id'])){
    $output['errors'][] ='MISSING YOUTUBE CHANNEL ID';
    output_and_exit($output);
}
$youtube_channel_id = $_POST['youtube_channel_id'];
// tm87
if(!(preg_match('/^[a-zA-Z0-9\-\_]{24}$/', $youtube_channel_id))){
    $output['errors'][] = 'INVALID YOUTUBE CHANNEL ID';
    output_and_exit($output);
}
//makes user link if session and get is empty
if(!isset($_SESSION['user_link']) and !isset($_GET['user'])){
    function generateRandomString($conn){
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i=0; $i<12; $i++){
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        $stmt = $conn->prepare("SELECT user_id FROM users WHERE user_link=?");
        $stmt->bind_param('s',$randomString);
        $stmt->execute();
        $results = $stmt->get_result();
        if(!empty($results)){
            if($results->num_rows>0){
                return generateRandomString($conn);
            }else{
                return $randomString;
            }
        }
    }
    $_SESSION['user_link'] = generateRandomString($conn);
    include('insert_user.php');
    //creates random string for user and inserts into database as well as show to front end
    $output['user_link'] = $_SESSION['user_link'];
}




include('read_channel_id.php');
//check for duplicate link

$sqli = 
    "SELECT
        ctu_id
    FROM
        channels_to_users 
    WHERE
        user_id = ? AND channel_id = ?";
$stmt = $conn->prepare($sqli);
$stmt->bind_param('ii',$user_id,$channel_id);
$stmt->execute();
$results = $stmt->get_result();
if($results->num_rows>0){
    $output['errors'][] = "DUPLICATE CTU";
    output_and_exit($output);
}else{
    $sqli = 
        "INSERT INTO 
            channels_to_users 
        SET
            user_id = ?,
            channel_id =?";
    $stmt = $conn->prepare($sqli);
    $stmt->bind_param('ii',$user_id,$channel_id);
    $stmt->execute();
    if($conn->affected_rows>0){
        $output['success'] = true;
        $output['insert_ctu'] = "success";
    }
    else{
        $output['errors'] = 'UNABLE TO INSERT INTO CTU';
    }
}

