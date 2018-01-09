<?php
//get user id for use in other queries, included in access.php
if(empty($LOCAL_ACCESS)){
    die("no direct access allowed, read user");
}
$user_link = $_SESSION['user_link'];
//prepared statement to get user id
$sqli = 
    "SELECT
        user_id
    FROM
        users
    WHERE
        user_link = ?";
$stmt = $conn->prepare($sqli);
$stmt->bind_param('s',$user_link);
$stmt->execute();
$result = $stmt->get_result();
//set user id to variable if successful
if($result->num_rows>0){
    $row = $result->fetch_assoc();
    $user_id = $row['user_id'];
}else{
    $output['nothing_to_read'] = true;
}

?>