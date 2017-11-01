<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
if(empty($_POST['table'])){

}
$table = $_POST['table'];
$id = $_POST['id'];
$query = "DELETE FROM '{$table}' WHERE `id`={$id}";
$result = mysqli_query($conn,$query);

if(!empty($result)){
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