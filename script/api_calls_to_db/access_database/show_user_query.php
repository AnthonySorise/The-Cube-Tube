<?php
if(empty($LOCAL_ACCESS)){
    die('no direct access allowed');
}
header("Location:www.dev.thecubetube.com/?user={$_SESSION['user_link']}");
?>