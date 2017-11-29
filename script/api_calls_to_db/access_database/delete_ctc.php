    <?php
    //included in delete ctu or called directly
    if(empty($LOCAL_ACCESS)){
        die('delete ctu, direct access not allowed');
    }
    if(empty($_POST['youtube_channel_id'])){
        $output['errors'] = 'missing youtube channel id at delete ctc';
        output_and_exit($output);
    }
    $youtube_channel_id = $_POST['youtube_channel_id'];
    $query = 
        "DELETE
            ctc
        FROM
            categories_to_channels cuc
        JOIN
            channels c ON ctc.channel_id = c.channel_id
        WHERE
            c.youtube_channel_id = ? AND ctc.user_id = ?";
    if(!($stmt = $conn->prepare($query))){
        $output['errors'][] = 'delete ctc query fail';
        output_and_exit($output);
    }
    $stmt->bind_param('si',$youtube_channel_id,$user_id);
    $stmt->execute();
    if($conn->affected_rows>0){
        $output['messages'][] = 'deleted ctcs';
        $output['success'] = true;
    }else{
        $output['messages'][] = 'no ctcs to remove';
    }
    
?>