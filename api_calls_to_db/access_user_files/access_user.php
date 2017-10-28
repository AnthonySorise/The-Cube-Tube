<?php
require_once('mysql_connect.php');
$LOCAL_ACCESS = true;
$output = [
'success' => false,
'errors' => [],
];
if(empty($_POST['action'])){
$output[errors][] = 'No action specified';
print(json_encode($output));
exit();
}
switch($_POST['action']){
    case 'read':
        include('read_user.php');
        break;
    case 'create':
        include('create.php');
        break;
    case 'delete':
        include('delete_user.php');
        break;
    default:
        $output['errors'][] = 'invalid action';
    }
$json_output = json_encode($output);
print($json_output);
?>