<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
require_once('mysql_connect.php');
$query = "SELECT * FROM users";
$result = mysqli_query($conn,$query);
//$res = $db->query($query); -> is a method call
$output = [
    'success' => false,
    'error' => [],
    'data' => []
];
if(!empty($result)){
    //if($result->num_rows!==0)
    if(mysqli_num_rows($result)>0){
        $output['success']=true;
        while($row = mysqli_fetch_assoc($result)){
            $output['data'][] = $row;
//            $output['data'][$row]['id'] = $row;
//            $output['data'][urlencode($row[id].$row[$name])];
        }
    }else{
        $output['errors'][] = mysqli_error($conn);
    }
}
?>