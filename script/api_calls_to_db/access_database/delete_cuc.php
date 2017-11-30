    <?php
    //included in delete ctu or called directly
    if(empty($LOCAL_ACCESS)){
        die('delete ctu, direct access not allowed');
    }
    $youtube_channel_id = $_POST['youtube_channel_id'];
    if(!(preg_match('/^[a-zA-Z0-9\-\_]{24}$/', $youtube_channel_id))){
        $output['errors'][] = 'INVALID YOUTUBE CHANNEL ID';
        output_and_exit($output);
    }
    $query = 
        "DELETE
            cuc
        FROM
            category_to_user_to_channel cuc
        JOIN
            channels c ON cuc.channel_id = c.channel_id
        JOIN
            users u ON cuc.user_id = u.user_id
        WHERE
            c.youtube_channel_id = ? AND u.user_link = ?";
    if(!($stmt = $conn->prepare($query))){
        $output['errors'][] = 'delete cuc query fail';
        output_and_exit($output);
    }
    $stmt->bind_param('ss',$youtube_channel_id,$user_link);
    $stmt->execute();
    if($conn->affected_rows>0){
        $output['messages'][] = 'deleted cucs';
        $output['success'] = true;
    }else{
        $output['messages'][] = 'no cucs to remove';
    }
    
?>