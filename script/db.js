function retrieveInfoFromDB(channelID, isAdding = false) {
    videoObjectsToLoad = 0;

    //Check for duplicate if adding
    if (isAdding) {
        var isDup = false;
        for (var i = 0; i < clientSubscribedChannelIds.length; i++) {
            if (clientSubscribedChannelIds[i] === channelID) {
                isDup = true
            }
        }
        if (isDup) {
            return
        }
    }

    //Check to see if channel is in local array
    var channelObject = null;
    for (var i = 0; i < clientSubscribedChannelObjects.length; i++) {
        if (!channelObject && clientSubscribedChannelObjects[i].youtube_channel_id === channelID) {
            channelObject = deepCopy(clientSubscribedChannelObjects[i])
        }
    }

    if(channelObject) {
        $.ajax({
            url: './script/api_calls_to_db/access_database/access.php',
            method: 'post',
            dataType: 'JSON',
            data: {
                action: 'update_video_list',
                youtube_channel_id: channelID,
                last_channel_pull: channelObject.last_channel_pull
            },
            success: function (data) {
                handleInfoFromDB(channelObject);
            },
            errors: function (data) {
            }
        });
    }
    //if channel isn't in local array
    else {
        //Check to see if channel is on DB
        $.ajax({
            url: './script/api_calls_to_db/access_database/access.php',
            method: 'post',
            dataType: 'JSON',
            data: {
                youtube_channel_id: channelID,
                action: 'read_channels_by_youtube_id'
            },
            success: function (data) {
                //Channel is on DB
                var readResult = data;
                if (data.success) {
                    //update Channel
                    $.ajax({
                        url: './script/api_calls_to_db/access_database/access.php',
                        method: 'post',
                        dataType: 'JSON',
                        data: {
                            action: 'update_video_list',
                            youtube_channel_id: channelID,
                            last_channel_pull: data.data[0].last_channel_pull
                        },
                        success: function (data) {
                            handleInfoFromDB(readResult.data[0]);
                        },
                        errors: function (data) {
                        }
                    })
                }
                //Channel NOT on DB
                else {
                    if (data.nothing_to_read) {
                        $.ajax({
                            url: './script/api_calls_to_db/access_database/access.php',
                            method: 'post',
                            dataType: 'JSON',
                            data: {
                                action: 'insert_youtube_channel_curl',       //NEED TO DO DOUBLE INSERT LATER WITH PAGE TOKEN
                                youtube_channel_id: channelID
                            },
                            success: function (data) {
                                if (data.success) {
                                    $.ajax({
                                        url: './script/api_calls_to_db/access_database/access.php',
                                        method: 'post',
                                        dataType: 'JSON',
                                        data: {
                                            youtube_channel_id: channelID,
                                            action: 'read_channels_by_youtube_id'
                                        },
                                        success: function (data) {
                                            if (data.success) {
                                                handleInfoFromDB(data.data[0]);
                                            }
                                        },
                                        errors: function (data) {
                                        }
                                    });
                                    //update remaining videos
                                    setTimeout(function () {
                                        $.ajax({
                                            url: './script/api_calls_to_db/access_database/access.php',
                                            method: 'post',
                                            dataType: 'JSON',
                                            data: {
                                                action: 'insert_videos_curl',
                                                youtube_channel_id: channelID,
                                                page_token: data.page_token
                                            },
                                            success: function (data) {
                                            },
                                            errors: function (data) {
                                            }
                                        })
                                    }, 2000);

                                }
                            },
                            errors: function (data) {
                            }
                        })
                    }
                }
            },
            errors: function (data) {
            }
        });
    }


    function handleInfoFromDB(channelObj){
        if(!isAdding){//Browsing
            clientSelectedChannelIds = [];
            clientSelectedChannelIds.push(channelID);

            clientSelectedChannelObjects = [];
            clientSelectedChannelObjects.push(channelObj)
        }
        else{//Adding
            clientSelectedChannelIds.push(channelID);
            clientSelectedChannelObjects.push(channelObj);

            clientSubscribedChannelIds.push(channelID);
            clientSubscribedChannelObjects.push(channelObj);

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
                        addChannelModal(data.user_link);
                        renderChannelSelectionDropdown()
                    }
                },
                errors: function (data) {
                }
            })
        }
        loadSelectedChannels();
    }
}
