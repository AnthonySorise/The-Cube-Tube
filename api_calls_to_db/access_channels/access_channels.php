<?php
require_once('mysql_connect.php');
$LOCAL_ACCESS = true;
$output = [
  'success'=>false,
  'errors' => []
];
if(empty($_POST['action'])){
    $output['errors'][] = 'no actions specified';
    print_r(json_encode($output));
    exit();
}
switch($_POST['action']){
    case 'read':
        include('read_channels.php');
        break;
    case 'insert':
        include('insert_channels.php');
        break;
    case 'update':
        include('update_channels.php');
        break;
    case 'delete':
        include('delete_channels.php');
        break;
    default:
        $output['errors'][] = 'INVALID ACTION';
}

$json_output = json_encode($output);
print_r($json_output);
?>
