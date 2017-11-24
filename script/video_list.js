function loadSelectedChannels() {
    $.ajax({    //RETRIEVE VIDEOS FROM DB
        url: './script/api_calls_to_db/access_database/access.php',
        method: 'POST',
        dataType: 'JSON',
        data: {
            action: 'read_videos_by_channel_array',
            channel_id_array: clientSelectedChannelIds,
            offset: 0
        },
        success: function (data) {
            if (data.success) {
                // promise.resolve(data);
                console.log('Videos Found', data);
                videoObjectsToLoad = [];
                videoObjectsToLoad = data.data;
                // returnToPageOne();
                clearVideoList();
                renderVideoList(videoObjectsToLoad);
                updateMidNavText()
            }
            else {
                console.log('Channel Found Without Videos', data)
            }
        },
        errors: function (data) {
            console.log(data['read errors'], data);
            // promise.reject(data);
        }
    })
}

function renderVideoList(videoArray) {
    if (videoObjectsToLoad === null) {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    }
    console.log("LOADING VIDEO LIST")
    clearVideoList();
    // returnToPageOne();

    for (let i = 0; i < videoArray.length; i++) {
        if (videoArray[i] === undefined) {
            return
        }

        let row = "#tdList-" + (i + 1);
        let title = row + " .tdTitle>span";
        let channel = row + " .tdChannel";
        let upDate = row + " .tdUpDate";

        let dateString = videoArray[i].published_at;

        if (checkIfAppleDevice()) {
            // let date = "2017-11-03 09:34:14" //testing only - sample data
            let newDate = dateString.split(" ");
            let removeTime = newDate[0].split("-")
            let newDateString = removeTime[1] + '/' + removeTime[2] + '/' + removeTime[0]
            dateString = newDateString
        } else {
            const d = new Date(dateString);
            dateString = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear().toString().substring(2);
        }
        // const d = new Date(dateString);
        // dateString = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear().toString().substring(2);

        $(row).show();

        $(row).attr("videoID", videoArray[i].youtube_video_id);
        $(row).attr("channelID", videoArray[i].youtube_channel_id);
        $(title).text(videoArray[i].video_title);
        $(channel).text(videoArray[i].channel_title);
        $(upDate).text(dateString);

    }
    resetSelectedTd();
    //update thumbnail hover popover
    setTimeout(function () {
        for (let i = 0; i < videoArray.length; i++) {
            let row = "#tdList-" + (i + 1);
            let videoData = row + " .tdInfo a";
            let videoURL = 'https://i.ytimg.com/vi/' + videoArray[i].youtube_video_id + '/mqdefault.jpg';

            const videoDataImg = $('<img>').attr('src', videoURL).css({
                width: '240px',
                height: '135px',
            });
            // var videoDataImg = "<img src="+videoURL+" />";
            $(videoData).attr({
                'data-content': videoArray[i].description,
                'data-original-title': videoArray[i].video_title
            });
            $(row).popover({
                trigger: "hover",
                html: true,
                content: videoDataImg,
                placement: 'auto',
                container: 'body'
            })
                .attr({
                    'data-original-title': videoArray[i].video_title
                });
        }
    }, 750);
}

function clearVideoList() {
    $(".tdList").popover('destroy');

    $('.tdList').attr("videoID", "");
    $('.tdTitle>span').text("");
    $('.tdChannel').text("");
    $('.tdUpDate').text("");
    $('.tdInfo a').attr({
        'data-content': "",
        'data-original-title': ""
    });
    $('.tdList').hide();
}

function loadNextPage() {
    if (currentSlideNumber % 2) {
        var pageToLoad = (currentSlideNumber - 1) / 2;
        var indexToStartOn = (pageToLoad) * 40;
        var videosToLoad = [];
        if (videoObjectsToLoad.length < indexToStartOn + 40) {
            $.ajax({
                url: './script/api_calls_to_db/access_database/access.php',
                method: 'POST',
                dataType: 'JSON',
                data: {
                    action: 'read_videos_by_channel_array',
                    channel_id_array: clientSelectedChannelIds,
                    offset: indexToStartOn
                },
                success: function (data) {
                    if (data.success) {
                        // promise.resolve(data);
                        console.log('read success', data);
                        for (var i = 0; i < data.data.length; i++) {
                            videoObjectsToLoad.push(data.data[i])
                        }
                        for (var i = indexToStartOn; i < indexToStartOn + 40; i++) {
                            videosToLoad.push(videoObjectsToLoad[i])
                        }
                        console.log("VIDEOS TO LOAD", videosToLoad)
                        setTimeout(function () {
                            // clearVideoList();
                            renderVideoList(videosToLoad)
                            removeUnusedRows();
                        }, 250)

                    }
                },
                errors: function (data) {
                    console.log('read error', data);
                    // promise.reject(data);
                }
            })
        }
        else {
            for (var i = indexToStartOn; i < indexToStartOn + 40; i++) {
                videosToLoad.push(videoObjectsToLoad[i])
            }
            console.log("VIDEOS TO LOAD", videosToLoad)
            setTimeout(function () {
                // clearVideoList();
                renderVideoList(videosToLoad)
                removeUnusedRows();
            }, 250)
        }
    }
}

function loadPreviousPage() {
    if (!(currentSlideNumber % 2)) {
        var pageToLoad = (currentSlideNumber / 2) - 1;
        var indexToStartOn = (pageToLoad) * 40;
        var videosToLoad = [];


        for (var i = indexToStartOn; i < indexToStartOn + 40; i++) {
            videosToLoad.push(videoObjectsToLoad[i])
        }
        console.log("VIDEOS TO LOAD", videosToLoad);
        setTimeout(function () {
            // clearVideoList();
            renderVideoList(videosToLoad)
        }, 250)
    }
}

function fadeToFirstSlideEffect() {
    $(".tdRow").hide();
    $(".tdRow").fadeIn(2000)
}

function returnToPageOne() {
    $(".carousel").removeClass('slide')
    $(".carousel").carousel(0);
    if (currentSlideNumber !== 1) {
        clearVideoList();
        currentSlideNumber = 1; //redundant?
        if (videoObjectsToLoad.length !== 0) {
            var videosToLoad = [];
            for (var i = 0; i < 40; i++) {
                videosToLoad.push(videoObjectsToLoad[i])
            }
            console.log("VIDEOS TO LOAD", videosToLoad);    //load list data while carousel is moving
            // setTimeout(function(){
            // clearVideoList();
            renderVideoList(videosToLoad)
            // }, 250)
        }
    }
    $(".carousel").addClass('slide')
    fadeToFirstSlideEffect();
    displayCurrentPageNumber();
}

function displayCurrentPageNumber() {
    $("#currentSlideNumberArea").text(currentSlideNumber);
    if (currentSlideNumber == 1) {
        $(".leftControl").hide()
        $("#returnCarouselStart").hide();
    } else {
        $(".leftControl").show();
        $("#returnCarouselStart").show();
    }
}

function removeUnusedRows() {
    for (var i = 0; i < 40; i++) {
        let row = "#tdList-" + (i + 1);
        let title = row + " .tdTitle>span";

        if ($(title).text() === "") {
            $(row).hide();
        }
    }
}

function resetSelectedTd() {
    $(".tdList").removeClass('selectedTd');
    $('.fa-circle-o-notch').remove();
    for (let i = 0; i < 40; i++) {
        let row = "#tdList-" + (i + 1);

        if (player.getVideoUrl().indexOf($(row).attr('videoid')) !== -1) {
            $(row).addClass("selectedTd")
            var playSymbol = $('<i>')
                .addClass('fa fa-circle-o-notch fa-spin fa-fw')
                .css({
                    "margin-right": '5px',
                    'color': 'green'
                });
            $(row).find(".tdTitle>span").prepend(playSymbol);
        }
    }
}

function resetPlaylistTd() {
    $(".tdList").removeClass('playlistTd');
    $(".tdList .tdPlaylistButton>i").removeClass('fa-check-square-o').addClass("fa-plus-square ");
    $(".tdList .tdPlaylistNum").text("");

    for (let i = 0; i < 40; i++) {
        let row = "#tdList-" + (i + 1);

        for(var j = 0; j < playlistVideoObjectArray.length; j++){
            if (player.getVideoUrl() === playlistVideoObjectArray[j].youtube_video_id) {
                playlistVideoObjectArray.splice(j, 1)
            }
        }

        for(var j = 0; j < playlistVideoObjectArray.length; j++){
            if (playlistVideoObjectArray[j].youtube_video_id === $(row).attr("videoID")) {
                $(row).addClass(".playlistTd");
                $(row + " .tdPlayList i").removeClass("fa-plus-square").addClass('fa-check-square-o');
                $(row + " .tdPlaylistNum").text(j + 'test')
            }
        }
    }
}

function updateMidNavText(){
    if(browsingMode){
        $('.midNavBrowsing').show();
        $('.midNavWatching').hide();
        $(".browsingLabel").text(clientSelectedChannelObjects[0].channel_title)
        $(".midNavChannels>span").attr("channelId", clientSelectedChannelObjects[0].youtube_channel_id)

        if(clientSubscribedChannelIds.indexOf(clientSelectedChannelObjects[0].youtube_channel_id)!== -1){
            $(".midNavAddBtn").hide();
        }
        else{
            $(".midNavAddBtn").show();
        }

    }
    else{
        $('.midNavBrowsing').hide();
        $('.midNavWatching').show();
        var channelsWatching = "";
        for(var i = 0; i < clientSelectedChannelObjects.length; i++){
            channelsWatching += clientSelectedChannelObjects[i].channel_title;
            if(i !== clientSelectedChannelObjects.length-1 && clientSelectedChannelObjects.length !== 1){
                channelsWatching += ", "
            }
        }
        $(".midNavAddBtn").hide();
        $(".watchingLabel").attr("data-original-title", channelsWatching)
    }
}

function updateVideoInfoPopover(videoID){
    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/videos',
        dataType: 'json',
        method: 'get',
        data: {
            key: "AIzaSyAOr3VvEDRdI5u9KGTrsJ7usMsG5FWcl6s",
            id: videoID,
            part: 'snippet, statistics'
        },
        success: function (data) {
            console.log('Youtube success', data);
            let videoStatsDiv = $('<div></div>');
            videoStatsDiv.css("height", '35vh')
            let videoURL = 'https://i.ytimg.com/vi/' + videoID + '/mqdefault.jpg';
            const videoThumbnail = $('<img>').attr('src', videoURL).css({
                width: '120px',
                height: '70px',
            });
            videoThumbnail.css("position", "relative")
                .css("left", "50%")
                .css("transform", "translateX(-50%)")
                .css("margin-bottom", '15px');

            const views = $('<p><strong>Views: </strong>' + parseInt(data.items[0].statistics.viewCount).toLocaleString("en-us") + '</p>');

            const likes = parseInt(data.items[0].statistics.likeCount);
            const dislikes = parseInt(data.items[0].statistics.dislikeCount);

            const perecentLikes = likes / (likes + dislikes) * 100;
            const percentDislikes = 100 - perecentLikes;

            const likesTitle = $('<p><strong>Likes and Dislikes:</strong></p>');
            let likesBar = null;

            if (likes > dislikes) {
                likesBar = $('<div class="progress"><div class="progress-bar progress-bar-success" style="width:' + perecentLikes + '%">' + likes.toLocaleString("en-us") + ' Likes</div><div class="progress-bar progress-bar-danger" style="width:' + percentDislikes + '%"></div>');
            }
            else {
                likesBar = $('<div class="progress"><div class="progress-bar progress-bar-success" style="width:' + perecentLikes + '%"></div><div class="progress-bar progress-bar-danger" style="width:' + percentDislikes + '%">' + dislikes.toLocaleString("en-us") + ' Dislikes</div>');
            }

            const descriptionTitle = $('<p><strong>Description: </strong></p>');

            const descriptionContainer = $('<div></div>');
            descriptionContainer.css("height", "13vh");
            descriptionContainer.css("overflow-y", "auto")
            const description = $('<p>' + data.items[0].snippet.description + '</p>');
            descriptionContainer.append(description);
            videoStatsDiv.append(videoThumbnail, views, likesTitle, likesBar, descriptionTitle, descriptionContainer);
            $("#videoStats").popover('destroy');
            setTimeout(function () {
                $("#videoStats").popover({
                    html: true,
                    content: videoStatsDiv,
                    placement: 'top',
                    container: 'body'
                });
            }, 350);
            $("#videoStats").attr({
                'data-original-title': data.items[0].snippet.title
            });
        },
        error: function (data) {
            console.log('something went wrong with YT', data);
        }
    });
}

function updateChannelInfoPopover(channelID){
    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/channels',
        dataType: 'json',
        method: 'get',
        data: {
            key: "AIzaSyAOr3VvEDRdI5u9KGTrsJ7usMsG5FWcl6s",
            id: channelID,
            part: 'snippet, statistics'
        },
        success: function (data) {
            console.log('Youtube success', data);
            let channelInfoDiv = $("<div></div>");

            const channelThumbnail = $('<img>').attr('src', data.items[0].snippet.thumbnails.medium.url).css({
                width: '70px',
                height: '70px',
            });
            channelThumbnail.css("position", "relative")
                .css("left", "50%")
                .css("transform", "translateX(-50%)")
                .css("margin-bottom", '15px');

            var subscriberCount = $('<p><strong>Subscribers: </strong>' + parseInt(data.items[0].statistics.subscriberCount).toLocaleString("en-us") + '</p>');
            const descriptionTitle = $('<p><strong>Description: </strong></p>');
            const descriptionContainer = $('<div></div>');
            descriptionContainer.css("height", "21.75vh");

            descriptionContainer.css("overflow-y", "auto")
            const description = $('<p>' + data.items[0].snippet.description + '</p>');
            descriptionContainer.append(description);
            channelInfoDiv.append(channelThumbnail, subscriberCount, descriptionTitle, descriptionContainer);

            $("#channelInfo").popover('destroy');
            setTimeout(function () {
                $("#channelInfo").popover({
                    html: true,
                    content: channelInfoDiv,
                    placement: 'top',
                    container: 'body'
                });
            }, 250);
            $("#channelInfo").attr({
                'data-original-title': data.items[0].snippet.title
            });


        },
        error: function (data) {
            console.log('something went wrong with YT', data);
        }
    })
}