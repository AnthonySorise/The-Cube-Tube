<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
$channelId = $_POST['channelId'];
$videoId = $_POST['videoId'];
$description = $_POST['description'];
$thumbnails = $_POST['thumbnails'];
$dislikeCount = $_POST['dislikeCount'];
$favoriteCount = $_POST['favoriteCount'];
$likeCount = $_POST['likeCount'];
$viewCount = $_POST['viewCount'];
if(empty($channelId)){
    $output['errors'][]='MISSING CHANNEL TITLE';
}
if(empty($videoId)){
    $output['errors'][] = 'MISSING VIDEO ID';
}
if(empty($description)){
    $output['errors'][] = "MISSING CHANNEL DESCRIPTION";
}
if(empty($thumbnails)){
    $output['errors'][] = "MISSING THUMBNAILS";
}
if(empty($dislikeCount)){
    $output['errors'][] = "MISSING DISLIKE COUNT";
}
if(empty($favoriteCount)){
    $output['errors'][] = "MISSING FAVORITE COUNT";
}
if(empty($likeCount)){
    $output['errors'][] = "MISSING LIKECOUNT";
}
if(empty($viewCount)){
    $output['errors'][] = "MISSING VIEW COUNT";
}
$query = "INSERT INTO videos SET 
channelId = '{$channelId}', 
videoId = '{$videoId}', 
description = '{$description}',
thumbnails = '{$thumbnails}',
dislikeCount = '{$dislikeCount}',
favoriteCount = '{$favoriteCount}',
likeCount = '{$likeCount}',
viewCount = '{$viewCount}'";
$result = mysqli_query($conn,$query);
if(empty($result)){
    $output['errors'][] = "INVALID QUERY";
}else{
    if(mysqli_affected_rows($conn)>0){
        $output['success'] = true;
        $output['id'] = mysqli_insert_id($conn);
    }else{
        $output['errors'][] = 'unable to insert video';
    }
}
?>

