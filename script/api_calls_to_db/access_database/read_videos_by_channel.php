<?php
if(empty($LOCAL_ACCESS)){
    die('direction access not allowed');
}
if(empty($offset)){
    $output['errors'][] = "MISSING OFFSET";
}
$user_id = $_POST['user_id'];
$stmt = $conn->prepare();
$stmt->bind_param("s",$search,$table);
$stmt->execute();
if(!empty($stmt)){
    //if($result->num_rows!==0)
    if(mysqli_num_rows($result)>0){
        $output['success']=true;
        while($row = mysqli_fetch_assoc($result)){
            $output['data'][] = $row;
        }
    }else{
        $output['errors'][] = mysqli_error($conn);
    }
}
?>
SELECT c.channel_title, c.youtube_channel_id,c.description,c.sub_count,
c.video_count,c.view_count,c.thumbnail_file_name,
