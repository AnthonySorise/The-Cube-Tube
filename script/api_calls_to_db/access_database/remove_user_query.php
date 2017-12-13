<?php
if(empty($LOCAL_ACCESS)){
    die('no direct access allowed');
}
header('Location: /');
exit();
?>