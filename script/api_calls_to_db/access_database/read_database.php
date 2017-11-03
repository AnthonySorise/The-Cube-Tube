<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
$output['data'] = [];
$search = $_POST['search'];
if(empty($search)){
    $output['errors'][] = "MISSING SEARCH";
}

//print $search;
//print '<br>'.$table;
//
//exit;
$sqli =  "SELECT ? FROM users ";
$stmt = mysqli_stmt_init($conn);
if(!mysqli_stmt_prepare($stmt,$sqli)){
    echo "SQL statement failed";
}else {
    mysqli_stmt_bind_param($stmt, "s", $search);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    if (mysqli_num_rows($result)>0) {
        $output['success'] = true;
        while ($row = mysqli_fetch_assoc($result)) {
            $output['data'][] = $row;
        }
    } else {
        $output['no_results'] = true;
        $output['errors'][] = mysqli_error($conn);
    }
}
?>