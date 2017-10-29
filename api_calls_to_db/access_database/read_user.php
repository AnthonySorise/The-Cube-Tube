<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
$table = $_POST['table'];
$search - $_POST['search'];
$query = "SELECT '{$search}' FROM '{$table}'";
$result = mysqli_query($conn,$query);
$output['data'] = [];
if(!empty($result)){
    //if($result->num_rows!==0)
    if(mysqli_num_rows($result)>0){
        $output['success']=true;
        while($row = mysqli_fetch_assoc($result)){
            $output['data'][] = $row;
        }
    }else{
        $output['errors'][] = mysqli_error($conn);
    }
}
?>