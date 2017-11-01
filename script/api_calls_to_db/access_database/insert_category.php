<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
$name = $_POST['name'];
if(empty($name)){
    $output['errors'][] = 'MISSING NAME OF CATEGORY';
}
$query = "INSERT INTO categories SET name='{$name}'";
$result = mysqli_query($conn,$query);
if(empty($result)){
    $output['errors'][] = 'invalid query';
}else{
    if(mysqli_affected_rows($result)>0){
        $output['success'][] = true;
        $output['id'] = mysqli_insert_id($conn);
    }else{
        $output['errors'][] = "failed to add category";
    }
}
?>