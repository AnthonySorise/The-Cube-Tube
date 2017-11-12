<?php
if(empty($LOCAL_ACCESS)){
    die('insert ctu, direct access not allowed');
}
//makes user link if session and get is empty
if(!isset($_SESSION['user_link']) and !isset($_GET['user'])){
    function generateRandomString(){
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < 12; $i++){
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        // $stmt = $conn->prepare("SELECT user_id FROM users WHERE user_link=?");
        // $stmt->bind_param('s',$randomString);
        // echo('im here');
        // $stmt->execute();
        // $results = mysqli_stmt_get_result($stmt);
        // if(!empty($results)){
        //     if(mysqli_num_rows($results)>0){
        //         return generateRandomString();
        //     }else{
        return $randomString;
            // }
    // }
    }
    $_SESSION['user_link'] = generateRandomString();
    include('./insert_user.php');
    //creates random string for user and inserts into database as well as show to front end
    define('USER_LINK',$_SESSION['user_link']);
    $output['user_link'] = USER_LINK;
}
//get user id
//grabbing channel id from db to add to user link
$youtube_channel_id = $_POST['youtube_channel_id'];
$stmt = $conn->prepare("SELECT channel_id FROM channels 
WHERE youtube_channel_id = ?");
$stmt->bind_param('s',$youtube_channel_id);
$stmt->execute();
$result = mysqli_stmt_get_result($stmt);
if(empty($result)){
    $output['errors'][] = 'INVALID QUERY';
}
else{
    if(mysqli_num_rows($result)>0){
        $row = mysqli_fetch_assoc($result);
        define('CHANNEL_ID',$row['channel_id']);
    }else{
        $output['errors'] = 'channel not in database';
        output_and_exit($output);
    }
}
$user_id = USER_ID;
$channel_id = CHANNEL_ID;
if(empty($user_id)){
    $output['errors'][] ='MISSING USER ID';
    output_and_exit($output);
}
if(empty($channel_id)){
    $output['errors'][] = 'MISSING CHANNEL ID';
    output_and_exit($output);
}
//tm87
// if(!preg_match('/[a-zA-Z0-9\-\_]{24}/', $channel_id)){
//     $output['errors'][] = 'INVALID YOUTUBE CHANNEL ID';
//     output_and_exit($output);
// }

$stmt = $conn->prepare("SELECT * FROM channels_to_users WHERE user_id=? AND channel_id=?");
$stmt->bind_param('ii',$user_id,$channel_id);
$stmt->execute();
$results = mysqli_stmt_get_result($stmt);
if(!empty($results)){
    if(mysqli_num_rows($results)>0){
        $output['errors'][] = "DUPLICATE CTU";
        output_and_exit($output);
    }else{
        $sqli = "INSERT INTO channels_to_users SET user_id = ?, channel_id=?";
        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt,$sqli)){
            $output['errors'][] = 'SQL statement failed';
        }else{
            mysqli_stmt_bind_param($stmt,'ii',$user_id,$channel_id);
            mysqli_stmt_execute($stmt);
            if(mysqli_affected_rows($conn)>0){
                $output['success'] = true;
                $output['insert_etu'] = success;
            }
            else{
                $output['errors'] = 'UNABLE TO INSERT INTO CTU';
            }
        }
    }
}else{
    $output['errors'][] = "INVALID QUERY";
    output_and_exit($output);
}
