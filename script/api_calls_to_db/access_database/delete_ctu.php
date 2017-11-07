<?php
if(empty($LOCAL_ACCESS)){
    die('direct access not allowed');
}
if(empty($_POST['ctu_id'])){
    $output['errors'] = 'MISSING CTU ID';
}
$ctu_id = $_POST['ctu_id'];
$stmt = $conn->prepare("DELETE FROM channels_to_user WHERE ctu_id=?");
$stmt->bind_param("i",$ctu_id);
$stmt ->execute();
if(!empty($stmt)){
    if(mysqli_affected_rows($conn)>0){
        $output['success'] = true;
        $output['id'] = mysqli_insert_id($conn);
    }
    else{
        $output['error'] = 'Unable to delete data';
    }
}else{
    $output['errors'][]= 'invalid query';
}
?>