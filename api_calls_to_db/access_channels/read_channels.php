<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
$output['data'] = [];
$query = "SELECT * FROM channels";
$result = mysqli_query($conn,$query);
if(empty($result)){
    $output['errors'][]='no results';
}else{
    if(mysqli_num_rows($result)>0){
        $output['success'] = true;
        while($row = mysqli_fetch_assoc($result)){
            $output['data'][] = $row;
        }
    }else{
        $output['errors'][] = mysqli_error($conn);
    }
}