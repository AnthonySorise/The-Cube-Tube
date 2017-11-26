    <?php
    //included in delete ctu or called directly
    if(empty($LOCAL_ACCESS)){
        die('delete ctu, direct access not allowed');
    }
    $youtube_channel_id = $_POST['youtube_channel_id'];
    $sqli = 
        "DELETE
            cuc
        FROM 
            category_to_user_to_channel AS cuc
        JOIN 
            users u ON u.user_id = cuc.user_id
        JOIN 
            channels c ON c.channel_id = cuc.channel_id
        WHERE 
            u.user_link = ? AND c.youtube_channel_id = ?";
    if(!$stmt = $conn->prepare($sqli)){
        $output['errors'][] = 'delete cuc';
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