function retrieveInfoFromDB(channelID, isAdding = false) {
    videoObjectsToLoad = 0;

    //Check for duplicate if adding
    if(isAdding){
        var isDup = false;
        for(var i = 0; i<clientSubscribedChannelIds.length; i++){
            if(clientSubscribedChannelIds[i] === channelID){
                isDup = true
            }
        }
        if(isDup){
            return
        }
    }

    //instantiate handleInfoFromDB to be used later
    function handleInfoFromDB(readResult){
        if(!isAdding){//Browsing
            clientSelectedChannelIds = [];
            clientSelectedChannelIds.push(channelID);

            clientSelectedChannelObjects = [];
            clientSelectedChannelObjects.push(readResult.data[0])
        }
        else{//Adding
            clientSelectedChannelIds.push(channelID);
            clientSelectedChannelObjects.push(readResult.data[0]);

            clientSubscribedChannelIds.push(channelID);
            clientSubscribedChannelObjects.push(readResult.data[0]);

            //Add channel to user account
            $.ajax({
                url:'./script/api_calls_to_db/access_database/access.php',
                method:'post',
                dataType:'JSON',
                data:{
                    action:'insert_ctu',
                    youtube_channel_id:channelID
                },
                success: function (data) {
                    if (data.success) {
                        console.log('Channel added to user account', data);
                        addChannelModal(data.user_link);

                        renderChannelSelectionDropdown()
                    }
                },
                errors: function (data) {
                    console.log('ERROR', data);
                }
            })
        }
        loadSelectedChannels();
    }


    //Check to see if channel is in local array
    for(var i = 0; i<clientSubscribedChannelObjects.length; i++){
        // if(clientSubscribedChannelObjects[i].)
    }

    //Check to see if channel is on DB
    $.ajax({
        url:'./script/api_calls_to_db/access_database/access.php',
        method:'post',
        dataType:'JSON',
        data:{
            youtube_channel_id:channelID,
            action:'read_channels_by_youtube_id'
        },
        success:function(data){
            //Channel is on DB
            var readResult = data;
            if(data.success){
                console.log('Channel Found on DB', data);
                console.log("last channel pull: ", data.data[0].last_channel_pull)
                //update Channel
                $.ajax({
                    url:'./script/api_calls_to_db/access_database/access.php',
                    method:'post',
                    dataType:'JSON',
                    data:{
                        action:'update_video_list',
                        youtube_channel_id:channelID,
                        last_channel_pull:data.data[0].last_channel_pull
                    },
                    success: function (data) {
                        if (data.success) {
                            console.log('Channel Updated', data);
                        }
                        console.log(data);
                        handleInfoFromDB(readResult);
                    },
                    errors: function (data) {
                        console.log('insert error', data);
                    }
                })
            }
            //Channel NOT on DB
            else{
                if(data.nothing_to_read){
                    console.log("Must Retrieve Videos From YouTube", data);
                    $.ajax({
                        url:'./script/api_calls_to_db/access_database/access.php',
                        method:'post',
                        dataType:'JSON',
                        data:{
                            action:'insert_youtube_channel_curl',       //NEED TO DO DOUBLE INSERT LATER WITH PAGE TOKEN
                            youtube_channel_id:channelID
                        },
                        success: function (data) {
                            if (data.success) {
                                console.log('Videos inserted to DB from Youtube', data);
                                $.ajax({
                                    url:'./script/api_calls_to_db/access_database/access.php',
                                    method:'post',
                                    dataType:'JSON',
                                    data:{
                                        youtube_channel_id:channelID,
                                        action:'read_channels_by_youtube_id'
                                    },
                                    success:function(data){
                                        if(data.success){
                                            console.log('Channel Found on DB', data);
                                            handleInfoFromDB(data);
                                        }else{
                                            console.log("ERROR", data);
                                        }
                                    },
                                    errors:function(data){
                                        console.log("ERROR", data);
                                    }
                                })
                                //update remaining videos
                                setTimeout(function(){
                                    $.ajax({
                                        url:'./script/api_calls_to_db/access_database/access.php',
                                        method:'post',
                                        dataType:'JSON',
                                        data:{
                                            action:'insert_videos_curl',
                                            youtube_channel_id:channelID,
                                            page_token:data.page_token
                                        },
                                        success: function (data) {
                                            if (data.success) {
                                                console.log('All videos inserted to DB from YouTube', data);
                                            }
                                        },
                                        errors: function (data) {
                                            console.log('insert error', data);
                                        }
                                    })
                                }, 2000);

                            }
                        },
                        errors: function (data) {
                            console.log("ERROR", data);
                        }
                    })
                }
            }
        },
        errors:function(data){
            console.log("ERROR", data);
        }
    })
}
