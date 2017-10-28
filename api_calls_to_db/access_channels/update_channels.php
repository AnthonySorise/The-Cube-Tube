<?php
include_once('mysql_connect.php');
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}