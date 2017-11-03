<?php//will remove this file later, for testing only
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
$output['data'] = [];
$table = $_POST['table'];
$search = $_POST['search'];
if(empty($table)){
    $output['errors'][] ="MISSING TABLE";
}
if(empty($search)){
    $output['errors'][] = "MISSING SEARCH";
}
$stmt = $conn->prepare("SELECT ? FROM ?");
$stmt->bind_param("ss",$search,$table);
$stmt->execute();
if(!empty($stmt)){
    //if($result->num_rows!==0)
    if(mysqli_num_rows($stmt)>0){
        $output['success']=true;
        while($row = mysqli_fetch_assoc($stmt)){
            $output['data'][] = $row;
        }
    }else{
        $output['errors'][] = mysqli_error($conn);
    }
}else{
    $output['errors'][] = 'INVALID QUERY';
}
?>