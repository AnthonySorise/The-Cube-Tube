    <?php
    //included in delete ctu or called directly
    if(empty($LOCAL_ACCESS)){
        die('delete ctu, direct access not allowed');
    }
    $youtube_channel_id = $_POST['youtube_channel_id'];
    $query = 
        "DELETE
            ctu
        FROM
            channels_to_users ctu
        JOIN
            channels c ON ctu.channel_id = c.channel_id
        JOIN
            users u ON ctu.user_id = u.user_id
        WHERE
            c.youtube_channel_id = ? AND u.user_link = ?";
    if(!($stmt = $conn->prepare($query))){
        $output['errors'][] = 'delete cuc query fail';
        output_and_exit($output);
    }
    $stmt->bind_param('ss',$user_link,$youtube_channel_id);
    $stmt->execute();
    if($conn->affected_rows>0){
        $output['messages'][] = 'deleted cucs';
        $output['success'] = true;
    }else{
        $output['messages'][] = 'no cucs to remove';
    }
    
?>