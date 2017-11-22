<?php
if(empty($LOCAL_ACCESS)){
    die('insert ctu, direct access not allowed');
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
    include('./insert_user.php');
    //creates random string for user and inserts into database as well as show to front end
    $output['user_link'] = $_SESSION['user_link'];
}
$youtube_channel_id = $_POST['youtube_channel_id'];
if(empty($youtube_channel_id)){
    $output['errors'][] ='MISSING YOUTUBE CHANNEL ID';
    output_and_exit($output);
}
//tm87
// if(!preg_match('/[a-zA-Z0-9\-\_]{24}/', $channel_id)){
//     $output['errors'][] = 'INVALID YOUTUBE CHANNEL ID';
//     output_and_exit($output);
// }
//check if the ctu already exist, exit if it does, else insert link
$sqli = 
    "SELECT
        ctu.ctu_id
    FROM
        channels_to_users AS ctu
    JOIN
        users AS u ON u.user_id = ctu.user_id
    JOIN
        channels AS c ON c.channel_id = ctu.channel_id
    WHERE
        u.user_link = ? AND c.youtube_channel_id = ?";
$stmt = $conn->prepare($sqli);
$stmt->bind_param('ss',$user_link,$youtube_channel_id);
$stmt->execute();
$results = $stmt->get_result();
if(!empty($results)){
    if($results->num_rows>0){
        $output['errors'][] = "DUPLICATE CTU";
        output_and_exit($output);
    }else{
        $sqli = 
            "INSERT INTO 
                channels_to_users (user_id , channel_id)
            SELECT 
                u.user_id, c.channel_id
            FROM 
                users AS u, channels AS c
            WHERE 
                u.user_link = ? AND c.youtube_channel_id = ?";
        $stmt = $conn->prepare($sqli);
        $stmt->bind_param('ss',$user_link,$youtube_channel_id);
        $stmt->execute();
        if($conn->affected_rows>0){
            $output['success'] = true;
            $output['insert_ctu'] = "success";
        }
        else{
            $output['errors'] = 'UNABLE TO INSERT INTO CTU';
        }
    }
}else{
    $output['errors'][] = "INVALID QUERY READ CTU";
    output_and_exit($output);
}
