<?php
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

//print $search;
//print '<br>'.$table;
//
//exit;


// $stmt = $conn->prepare('SELECT * FROM `users`');
// $stmt->bind_param('s', $search);
// $stmt->execute();

echo '<pre>';
print_r($stmt->num_rows());
echo '</pre>';


if(!empty($stmt)){
    if(mysqli_num_rows($stmt)>0){
        $output['success']=true;
        while($row = mysqli_fetch_assoc($stmt)){
            $output['data'][] = $row;
        }
    }else{
        $output['no_results']=true;
        $output['errors'][]=mysqli_error($conn);
    }
}else{
    $output['errors'][] = 'INVALID QUERY';
}
?>