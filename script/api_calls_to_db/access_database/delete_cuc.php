    <?php
    $sqli = 
        "DELETE
            cuc
        FROM 
            categories_to_users_to_channels AS cuc
        JOIN 
            users AS u ON u.user_id = cuc.user_id
        JOIN 
            channels AS c ON c.channel_id = cuc.channel_id
        WHERE 
            u.user_link = ? AND c.youtube_channel_id = ?";
    $stmt = $conn->prepare($sqli);
    $stmt->bind_param('ss',$user_link,$youtube_channel_id);
    $stmt->execute();
    if(empty($stmt)){
        $output['errors'][] = 'delete cuc statement failed after delete ctu';
    }else{
        if($conn->affected_rows>0){
            $output['messages'][] = 'deleted cucs';
        }else{
            $output['messages'][] = 'no cucs to remove';
        }
    }
?>