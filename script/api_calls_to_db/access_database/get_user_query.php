<?php
session_start();
require_once('mysql_connect.php');
$LOCAL_ACCESS = true;
if(isset($_GET['user'])){
    $sqli = "SELECT
        user_id
    FROM
        users
    WHERE
        user_link = ?";
    $stmt = $conn->prepare($sqli);
    $stmt->bind_param('s',$_GET['user']);
    $stmt->execute();
    $results = $stmt->get_result();
    if($results->num_rows>0){
        $_SESSION['user_link'] = $_GET['user'];
        header('Location: /');
    }else{
        header('Location: /');
        exit();
    }
}
?>