<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
$table = $_POST['table'];
$search - $_POST['search'];
$statement = mysqli_prepare($conn,"SELECT ? FROM ?");
$result = mysqli_bind_param($statement,"ss",$table,$search);
mysqli_execute($result);
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