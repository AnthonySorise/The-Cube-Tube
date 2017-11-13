var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];

var videoObjectsToLoad = null;

var clientSelectedChannelObjects = [];
var clientSelectedChannelIds = [];

var clientSubscribedChannelIds = [];
var clientSubscribedChannelObjects = [];

var currentSlideNumber = 1;

var browsingMode = false;

let currentVolumeLevel = null;

firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady(vidId) {
    player = new YT.Player('mainVideo', {
        videoId: vidId || 'lrzIR8seNXs',
        playerVars: {
            'rel': 0
        }
    });
    onYouTubeIframeAPIReady2();
}
function onYouTubeIframeAPIReady2() {
    player2 = new YT.Player('theaterVideo', {
        videoId: 'lrzIR8seNXs',
        playerVars: {
            'rel': 0
        }
    });
}
var player;
var player2;

/*******needed for iframe player*******/
let iframeRight = 0;
$(window).resize(function(){
    let windowWidth = ($(window).width());
    if(windowWidth <= 768){
        displayTableDataOnMobile()
    }else{
        displayTableDataOnDesktop()
    }
    iframeRight = $('#mainVideo').position().left + $('#mainVideo').width();
    $('.lightBoxMode').css('left', iframeRight+'px');
})


$(document).ready(function () {
    $("#text-carousel").hide()
    $(".videoHeader").hide()

    displayCurrentPageNumber();
    /**
     function for preventing page refresh with search button;
     only did it because page refresh was annoying
     **/
    $('#midNav-option form button').click(function (event) {
        event.preventDefault();
    });

    tooltipFunctions();


    clickHandler();

    $('#text-carousel').on('slide.bs.carousel', function (ev) {
        console.log(ev)
        if(ev.direction=='left'){
            currentSlideNumber++
            loadNextPage();
        }else{
            currentSlideNumber--
            loadPreviousPage();
        }
        displayCurrentPageNumber()
    });
    clearVideoList();   //hides list rows until they are needed
    setTimeout(()=>{
        iframeRight = $('#mainVideo').position().left + $('#mainVideo').width();
        $('.lightBoxMode').css('left', iframeRight+'px');
    },200);

    setTimeout(()=>{
        initiateUser();
    }, 2000)
});


function tooltipFunctions() {
    $('[data-toggle="tooltip"]').tooltip(); //needed for tooltip
    $('[data-toggle="popover"]').popover();
    $('.browseChannelButton').mouseenter(function () {
        setTimeout(function () {
            $('.browseChannelButton').tooltip('hide');
        }, 1000);
    });
    $('.lightBoxMode').mouseenter(function () {
        setTimeout(function () {
            $('.lightBoxMode').tooltip('hide');
        }, 1000);
    });
    $('.channelSearchButton').mouseenter(function () {
        setTimeout(function () {
            $('.channelSearchButton').tooltip('hide');
        }, 1000);
    });
    $('.videoSearchButton').mouseenter(function () {
        setTimeout(function () {
            $('.videoSearchButton').tooltip('hide');
        }, 1000);
    });
    $('#videoStats .fa-bar-chart').mouseenter(function(){
        setTimeout(function(){
            $('#videoStats .fa-bar-chart').tooltip('hide');
        }, 1000);
    });
    $('#channelInfo .fa-list-alt').mouseenter(function(){
        setTimeout(function(){
            $('#channelInfo .fa-list-alt').tooltip('hide');
        }, 1000);
    });
}

//Click handler to console log search results
function clickHandler() {
    //Search Button
    $('.channelSearchForm').on('click','.channelSearchButton',(e)=>{
        e.preventDefault();
        $('.channelSearchForm').submit();
    });
    $(".channelSearchForm").submit(function (event) {
        event.preventDefault();
        let inputStr = '';
        if($(event.target).find('input').val()===""){
            return;     //prevent empty input
        }else{
            inputStr=$(event.target).find('input').val();
        }
        $(".navbar-collapse").collapse('hide');       
        searchChannelsByName(inputStr).then(worked, failed);
        // $(".contentPlaceholder").hide();
        $('.contentPlaceholderWrapper').fadeOut(1000, function(){
            $('#text-carousel, .videoHeader').slideDown(1100);
        });
        // $("#text-carousel").show()
        // $(".videoHeader").show()
    });
    //Browse Button
    $('.browseChannelButton').on("click", handleBrowseButton);
    $('.addChannelButton').on("click", handleAddButton);

    //Table List Rows that are unselected
    $(".tdTitle, .tdChannel, .tdUpDate").on("click", function () {


        if(!$(this).parent().hasClass('selectedTd')) {
            $(".tdTitle, .tdChannel").unbind("mouseup");
            //Table List Row Title that is selected
            $(".tdTitle").mouseup(function (){
                if($(this).parent().hasClass('selectedTd')) {
                    // $("#videoStats").focus().click()
                    $("#videoStats").trigger('focus')
                }
            });

            //Table List Row Channel that is selected
            $(".tdChannel").mouseup(function (){
                if($(this).parent().hasClass('selectedTd')) {
                    // $("#channelInfo").focus().click()
                    $("#channelInfo").trigger('focus')
                }
            });

            var videoID = $(this).parent().attr('videoId');
            var channelID = $(this).parent().attr('channelID');

            var selectedVideoId = $(this).parent().attr('videoId');
            // $('.fa-play-circle-o').remove();
            $('.fa-circle-o-notch').remove();
            var playSymbol = $('<i>')
            // .addClass("fa fa-play-circle-o")
                .addClass('fa fa-circle-o-notch fa-spin fa-fw')
                .css({
                    "margin-right": '5px',
                    'color': 'green'
                });
            $(this).parent().find(".tdTitle>span").prepend(playSymbol);
            $('.tdList').removeClass('selectedTd');
            $(this).parent().addClass("selectedTd");
            if (getAutoPlayValue()) {
                player.loadVideoById(selectedVideoId);
            } else {
                player.cueVideoById(selectedVideoId);
            }
            player2.cueVideoById(selectedVideoId);

            //update video stats popover
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

                    let videoURL = 'https://i.ytimg.com/vi/' + selectedVideoId + '/mqdefault.jpg';
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
            //update channel stats popover
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
    });

    //Theater mode
    $('.lightBoxMode').on('click', function () {

        player.pauseVideo();
        if (player.getPlayerState() === 2) {
            checkIfPlayerIsMuted();
            player.pauseVideo();
            player2.seekTo(player.getCurrentTime());
            player2.pauseVideo();
            $('#lightBoxModal').modal('show');
        } else if (player.getPlayerState() === 1) {
            checkIfPlayerIsMuted();
            player.pauseVideo();
            player2.seekTo(player.getCurrentTime());
            $('#lightBoxModal').modal('show');
            player2.playVideo();
        } else if (player.getPlayerState() === 5) {
            $('#lightBoxModal').modal('show');
        }
    });
    $('.theatreModalClose').on('click', function () {
        if (player2.getPlayerState() === 2) {
            checkIfPlayer2IsMuted();
            player2.pauseVideo();
            player.seekTo(player2.getCurrentTime());
            player.pauseVideo();
            $('#lightBoxModal').modal('show');
        } else if (player2.getPlayerState() === 1) {
            checkIfPlayer2IsMuted();
            player2.pauseVideo();
            player.seekTo(player2.getCurrentTime());
            $('#lightBoxModal').modal('show');
            player.playVideo();
        } else if (player2.getPlayerState() === 5) {
            $('#lightBoxModal').modal('show');
        }
    });
}

function initiateUser(){
    // access_database.read_channels_by_user_id()
    var numSubscribedChannels = null;
    $.ajax({
        url: './script/api_calls_to_db/access_database/access.php ',
        method: 'POST',
        dataType: 'JSON',
        data: {
            action: 'read_channels_by_user_id',
        },
        success: function (data) {
            if (data.success){
                console.log('read success', data.data[0].youtube_channel_id);
                $('.contentPlaceholderWrapper').fadeOut(1000, function(){
                    $('#text-carousel, .videoHeader').slideDown(1100);
                });
                for(var i = 0; i<data.data.length; i++){
                    numSubscribedChannels = data.data.length;
                    clientSubscribedChannelIds.push(data.data[i].youtube_channel_id);
                    clientSelectedChannelIds.push(data.data[i].youtube_channel_id);

                    $.ajax({
                        url:'./script/api_calls_to_db/access_database/access.php',
                        method:'post',
                        dataType:'JSON',
                        data:{
                            youtube_channel_id:data.data[i].youtube_channel_id,
                            action:'read_channels_by_youtube_id'
                        },
                        success:function(data){
                            if(data.success){
                                console.log('read data success', data.data);
                                clientSubscribedChannelObjects.push(data.data[0]);
                                clientSubscribedChannelObjects.push(data.data[0]);

                                if (numSubscribedChannels === clientSelectedChannelIds.length) {
                                    loadSelectedChannels();
                                }
                            }else{
                                console.log(data);
                            }
                        },
                        errors:function(data){
                            console.log(data['errors'], data);
                        }
                    });
                }
                // collectVideosToLoad();
            }else{
                console.log(data);
            }
        },
        errors: function (data) {
            console.log('read error', data);
        }
    });

    // function collectVideosToLoad(){
    //     if (numSubscribedChannels !== clientSelectedChannelIds.length) {
    //         console.log(numSubscribedChannels !== clientSubscribedChannelIds.length)
    //         setTimeout(collectVideosToLoad, 50);
    //         return
    //     }
    //     loadSelectedChannels();
    //
    // }
}



//Channel Search by Name
function searchChannelsByName(inputStr) {
    $(".addChannelButton").removeClass("disabled").text("Add");
    let string = inputStr;
    // if($('.channelSearchInput:odd').val()!==""){
    //     string = $('.channelSearchInput:odd').val();
    // }else if($('.channelSearchInput:even').val()!==""){
    //     string = $('.channelSearchInput:even').val();
    // }else{
    //     string='';
    // }
    $('.channelSearchInput').val('');
    // var string = $('.channelSearchInput').val();
    var promise = {
        then: function (resolve, reject) {
            this.resolve = resolve;
            this.reject = reject;
        }
    };
    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/search',
        dataType: 'json',
        method: 'get',
        data: {
            key: "AIzaSyAOr3VvEDRdI5u9KGTrsJ7usMsG5FWcl6s",
            q: string,
            type: 'channel',
            part: 'snippet',
            maxResults: 10
        },
        success: function (data) {
            console.log('searchChannelsByName success', data);
            $('#channelSearchModal').modal('show');
            clearChannelResults();
            for (var i = 0; i < data.items.length; i++) {
                let channelListData = "#chSearch-" + (i + 1);
                let chName = channelListData + " .chName";
                let img = channelListData + " img";
                $(channelListData).show();
                $(channelListData).attr("channelId", data.items[i].snippet.channelId);
                $(chName).text(data.items[i].snippet.channelTitle);
                $(img).attr("src", data.items[i].snippet.thumbnails.medium.url);

                if(clientSubscribedChannelIds.includes(data.items[i].snippet.channelId)){
                    $(channelListData + " .addChannelButton").addClass("disabled").text("Added");
                }
            }
            promise.resolve(data);
        },
        error: function (data) {
            console.log('something went wrong with YT', data);
            promise.reject('oops');
        }
    });
    return promise;
}

function worked() {
    for (var i = 0; i < 10; i++) {
        renderChannelSearchStats(i)
    }
}

function failed(message) {
    console.log('nope', message);
}

function renderChannelSearchStats(i) {
    if($("#chSearch-"+(i+1)+">h4>span").text() !== "") {
        const channelListData = "#chSearch-" + (i + 1);
        const chSub = "#chSearch-" + (i + 1) + " .chSub";
        const chDesc = "#chSearch-" + (i + 1) + " .chInfoButton";
        $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/channels',
            dataType: 'json',
            method: 'get',
            data: {
                key: "AIzaSyAOr3VvEDRdI5u9KGTrsJ7usMsG5FWcl6s",
                id: $(channelListData).attr("channelId"),
                part: 'snippet, statistics'
            },
            success: function (data) {
                console.log('renderChannelSearchStats success', data);
                const subNumber = parseInt(data.items[0].statistics.subscriberCount);
                const numWithCommas = subNumber.toLocaleString("en-us");
                $(chSub).text(numWithCommas);
                $(chDesc).attr({
                    "data-original-title": data.items[0].snippet.title,
                    "data-content": data.items[0].snippet.description
                });
            },
            error: function (data) {
                console.log('something went wrong with YT', data);
            }
        });
    }
}

function clearChannelResults() {
    for (var i = 0; i < 10; i++) {
        let channelListData = "#chSearch-" + (i + 1);
        let chName = channelListData + " .chName";
        let img = channelListData + " img";
        let chSub = "#chSearch-" + (i + 1) + " .chSub";
        let chDesc = "#chSearch-" + (i + 1) + " .chInfoButton";
        $(channelListData).attr("channelId", "");
        $(chName).text("");
        $(img).attr("src", "");
        $(chSub).text("");
        $(chDesc).attr({
            "data-original-title": "",
            "data-content": ""
        });

        $(channelListData).css("display", 'none')
    }
}

function clearVideoList(){
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

function renderChannelSelectionDropdown(){
    var sorted = false;

    while (!sorted){
        sorted = true;
        var previousValue = "";
        for(var i = 0; i< clientSubscribedChannelObjects; i++){

            if(i>0 && clientSubscribedChannelObjects.channel_title<previousValue){
                sorted = false;
                var previousObj = clientSubscribedChannelObjects[i-1];
                clientSubscribedChannelObjects[i-1] = clientSubscribedChannelObjects[i]
                clientSubscribedChannelObjects[i] = previousObj;
            }


            previousValue = clientSubscribedChannelObjects.channel_title;
        }


    }


    for(var i = 0; i< clientSubscribedChannelObjects; i++){
        var channelLi = $('<li>');
        var channel = $('<input>').attr({
            'type' : 'checkbox',
            'name' : clientSubscribedChannelObjects.channel_title,
            'value' : clientSubscribedChannelObjects.channel_id,
            'text' : clientSubscribedChannelObjects.channel_title,
        });
        channelLi.append(channel);

        $('#channelCategoryUl').append(channelLi)
    }




}

function compileSelectedChannelsFromDropdown(){



}


function loadSelectedChannels(){
    $.ajax({    //RETRIEVE VIDEOS FROM DB
        url: './script/api_calls_to_db/access_database/access.php',
        method: 'POST',
        dataType: 'JSON',
        data: {
            action:'read_videos_by_channel_array',
            channel_id_array:clientSelectedChannelIds,
            offset:0
        },
        success: function (data) {
            if (data.success) {
                // promise.resolve(data);
                console.log('Videos Found', data);
                videoObjectsToLoad = [];
                videoObjectsToLoad = data.data;

                // loadClientVideoObjectArray();//TODO Conditional Run on BROWSE, only run on SEARCH when no channels pre-selected
                renderVideoList(videoObjectsToLoad);
            }
            else{
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

    for (let i = 0; i < videoArray.length; i++) {
        if(videoArray[i] === undefined){
            return
        }

        let row = "#tdList-" + (i + 1);
        let title = row + " .tdTitle>span";
        let channel = row + " .tdChannel";
        let upDate = row + " .tdUpDate";

        let dateString = videoArray[i].published_at;

        if(checkIfAppleDevice()){
            // let date = "2017-11-03 09:34:14" //testing only - sample data
            let newDate = dateString.split(" ");
            let removeTime = newDate[0].split("-")
            let newDateString = removeTime[1]+ '/' + removeTime[2]+ '/'+removeTime[0]
            dateString = newDateString
        }else{
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

function addChannelModal(userLink){
    if(userLink){
        $('.userLinkBody').text("Save this link!  www.TheCubeTube.com/?user="+userLink)
    }
    else{
        $('.userLinkBody').text("Channel added to your subscriptions!")
    }
    $('#userLinkModal').modal('show');
}

function ytChannelApiToDb(channelId, isAdding = false) {
    var channelDbObject = {};
    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/channels',
        dataType: 'json',
        method: 'get',
        data: {
            key: "AIzaSyAOr3VvEDRdI5u9KGTrsJ7usMsG5FWcl6s",
            id: channelId,
            part: 'snippet, statistics'
        },
        success: function (data) {
            console.log('Youtube success', data);
            channelDbObject.youtube_channel_id = channelId;
            channelDbObject.channel_title = data.items[0].snippet.title;
            channelDbObject.description = data.items[0].snippet.description;

            var thumbnail = data.items[0].snippet.thumbnails.medium.url;
            thumbnail = thumbnail.replace('https://yt3.ggpht.com/', '');
            thumbnail = thumbnail.replace('/photo.jpg', '');
            channelDbObject.thumbnail = thumbnail;

            // access_database.insert_channel(channelDbObject);
            $.ajax({
                url:'./script/api_calls_to_db/access_database/access.php',
                method:'post',
                dataType:'JSON',
                data:{
                    action:'insert_channel',
                    youtube_channel_id:channelDbObject.youtube_channel_id,
                    channel_title:channelDbObject.channel_title,
                    description:channelDbObject.description,
                    thumbnail:channelDbObject.thumbnail
                },
                success:function(data){
                    if(data.success){
                        console.log('insert channel success', data);

                        if(!isAdding){
                            clientSelectedChannelObjects = [];
                        }
                        else{
                            var isDup = false;
                            for(var i = 0; i < clientSubscribedChannelObjects.length; i++){
                                if(clientSubscribedChannelObjects[i].youtube_channel_id === channelDbObject.youtube_channel_id){
                                    isDup = true
                                }
                            }
                            if(!isDup){
                                clientSubscribedChannelObjects.push(channelDbObject);
                            }

                            $.ajax({
                                url:'./script/api_calls_to_db/access_database/access.php',
                                method:'post',
                                dataType:'JSON',
                                data:{
                                    action:'insert_ctu',
                                    youtube_channel_id:channelId
                                },
                                success: function (data) {
                                    if (data.success) {
                                        console.log('insert success', data);
                                        addChannelModal(data.user_link)
                                    }
                                },
                                errors: function (data) {
                                    console.log('insert error', data);
                                }
                            })
                        }
                        clientSelectedChannelObjects.push(channelDbObject);
                    }
                },
                errors:function(data){
                    console.log('insert error');
                }
            })
        },
        error: function (data) {
            console.log('something went wrong with YT', data);
        }
    });
}

function ytVideoApiToDb(channelId, pageToken = "", firstRun = true, isAdding = false) {
    var packageToSendToDb = [];
    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/search',
        dataType: 'json',
        method: 'get',
        data: {
            key: "AIzaSyAOr3VvEDRdI5u9KGTrsJ7usMsG5FWcl6s",
            channelId: channelId,
            type: 'video',
            order: 'date',
            part: 'snippet',
            maxResults: 50,
            pageToken: pageToken
        },
        success: function (data) {
            console.log('ytVideoApiToDb success', data);
            for (var i = 0; i < data.items.length; i++) {
                var videoObject = {};
                videoObject.channel_id = access_database.channel_id_hold;
                videoObject.video_title = data.items[i].snippet.title;
                videoObject.youtube_video_id = data.items[i].id.videoId;
                videoObject.youtube_channel_id = data.items[i].snippet.channelId;
                videoObject.channel_title = data.items[i].snippet.channelTitle;
                videoObject.description = data.items[i].snippet.description;
                var publishedAt = data.items[i].snippet.publishedAt;
                publishedAt = publishedAt.replace("T", " ");
                publishedAt = publishedAt.replace(".000Z", "");
                videoObject.published_at = publishedAt;

                packageToSendToDb.push(videoObject);

            }

            if(firstRun){
                if(!isAdding) {
                    var clientPackage = [];
                    for (var i = 0; i < 40; i++) {
                        clientPackage.push(packageToSendToDb[i])
                    }
                    videoObjectsToLoad = clientPackage
                    // loadClientVideoObjectArray(videoObjectsToLoad)
                    renderVideoList(videoObjectsToLoad);
                    access_database.insert_video(packageToSendToDb);
                }
                else{
                    loadSelectedChannels();
                }
            }
            else{
                access_database.insert_video(packageToSendToDb);
            }

            if (data.hasOwnProperty('nextPageToken') && data.items.length !== 0) {
                ytVideoApiToDb(channelId, data.nextPageToken, false)
            }
        },
        error: function (data) {
            console.log('something went wrong with YT', data);
        }
    });
}

function manageDatabaseWithChannelId (channelID, isAdding = false){
    videoObjectsToLoad = null;

    if(!isAdding){
        clientSelectedChannelIds = [];
    }
    else{
        var isDup = false;
        for(var i = 0; i<clientSubscribedChannelIds.length; i++){
            if(clientSubscribedChannelIds[i] === channelID){
                isDup = true
            }
        }
        if(!isDup){
            clientSubscribedChannelIds.push(channelID);
        }
    }
    clientSelectedChannelIds.push(channelID);

    $.ajax({    //CHECK TO SEE IF CHANNEL IS ON DB
        url:'./script/api_calls_to_db/access_database/access.php',
        method:'post',
        dataType:'JSON',
        data:{
            youtube_channel_id:channelID,
            action:'read_channels_by_youtube_id'
        },
        success:function(data){

            if(data.success){
                // promise.resolve(data);
                console.log('Channel Found', data);
                data.youtube_channel_id = channelID;

                if(!isAdding){
                    clientSelectedChannelObjects = [];
                }
                else{
                    var isDup = false;
                    for(var i = 0; i < clientSubscribedChannelObjects.length; i++){
                        if(clientSubscribedChannelObjects[i].youtube_channel_id === data.data[0].youtube_channel_id){
                            isDup = true
                        }
                    }
                    if(!isDup){
                        clientSubscribedChannelObjects.push(data.data[0]);
                    }

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
                                console.log('insert success', data);
                                addChannelModal(data.user_link)
                            }
                        },
                        errors: function (data) {
                            console.log('insert error', data);
                        }
                    })
                }

                clientSelectedChannelObjects.push(data.data[0]);

                loadSelectedChannels();

            }
            else{   //RETRIEVE VIDEOS FROM YOUTUBE
                if(data.nothing_to_read){
                    console.log("Retrieve Videos From You Tube", data);
                    ytVideoApiToDb(channelID, "", true, isAdding);
                    ytChannelApiToDb(channelID, isAdding);
                }
            }
        },
        errors:function(data){
            // promise.reject(data);
            console.log(data['read errors'], data);
        }
    })
}

// function loadClientVideoObjectArray() {
//     if (videoObjectsToLoad === null) {
//         console.log(videoObjectsToLoad === null)
//         setTimeout(loadClientVideoObjectArray, 50);
//         return
//     }
//     console.log("LOADING VIDEO LIST")
//     renderVideoList(videoObjectsToLoad);
// }

function handleBrowseButton() {
    browsingMode = true;
    videoObjectsToLoad = [];

    returnToPageOne();
    // clearVideoList();
    // createPlaceholderAnimation();



    let channelID = $(this).parent().attr("channelId");
    manageDatabaseWithChannelId(channelID);
    // toastMsg('loading channel videos',1000);
    $('.fa-play-circle-o').remove();
    $('.tdList').removeClass('selectedTd');
    $('#channelSearchModal').modal('hide')
}

function handleAddButton(){
    //CALL FUNCTION THAT LOOKS SELECTION LIST AND UPDATES clientSelectedChannelIds and and clientSelectedChannelObjects
    videoObjectsToLoad = [];
    if(browsingMode){
        clientSelectedChannelIds = [];
        clientSelectedChannelObjects = [];
    }
    else{
        //FUNCTION THAT LOOPS THROUGH clientSubscribedChannelIds and ClientSubscribedChannelObjects - and
            //compares with what's on the channel selection dropdown
                //populates clientSelectedChannelIds and clientSelectedChannelObjects
    }

    browsingMode = false;

    returnToPageOne();
    // clearVideoList();
    // createPlaceholderAnimation();



    let channelID = $(this).parent().attr("channelId");
    manageDatabaseWithChannelId(channelID, true);
    // toastMsg('loading channel videos',1000);




    $('.fa-play-circle-o').remove();
    $('.tdList').removeClass('selectedTd');
    $('#channelSearchModal').modal('hide')
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

function getAutoPlayValue() {
    return $("#autoplayCheckBox").is(":checked")
}

function toastMsg(msgString, time){
    const msg = $('<div>',{
        text: msgString,
        class:'toast'
    }).css({
        position: 'fixed',
        right: '-150px',
        top: '125px',
        'width': '150px',
        'padding': '7px',
        'background-color': 'rgba(0,0,0,0.7)',
        'color' : 'white',
        'z-index': 1000,
        'border-radius': '15px'
    }).animate({
        right: '+=155px'
    }, 900);
    $('body').append(msg);
    setTimeout(function(){
        $('.toast').remove();
    }, time);
}

//Testing placeholder animation

function createPlaceholderAnimation() {
    $(".tdList").show();

    var outerDiv = $('<div>').addClass("timeline-wrapper");
    var nestedDiv1 = $('<div>').addClass("timeline-item");
    var nestedDiv2 = $('<div>').addClass("animated-background");
    var nestedDiv3 = $ ('<div>').addClass("background-masker");
    var completedWrapper = $(outerDiv).append(nestedDiv1, nestedDiv2, nestedDiv3);
    $('.tdTitle, .tdChannel, .tdUpdate').append(completedWrapper);
}

function removePlaceHolderAnimation(){
    $('.timeline-wrapper').remove()
}


function removeUnusedRows(){
    for(var i = 0; i<40; i++){
        let row = "#tdList-" + (i + 1);
        let title = row + " .tdTitle>span";

        if($(title).text() === ""){
            $(row).hide();
        }
    }
}


function displayTableDataOnMobile(){
    var rightTableData = $(".item").find(".tdListRight").children().clone();
    var newElementArray = []
    for(var j = 0; j<rightTableData.length; j+=10){
        var newImage = rightTableData.slice(j,j+10)
        newElementArray.push(newImage);
    }
    for(var i = 0; i<newElementArray.length; i++){
        var itemDiv = $("<div>").addClass('item mobileSlide');
        var contentDiv = $("<div>").addClass('carousel-content');
        var rowDiv = $("<div>").addClass('row,tdRow,text-center mobileRow');
        rowDiv.append(newElementArray[i]);
        contentDiv.append(rowDiv);
        itemDiv.append(contentDiv);
        $(".carousel-inner").append(itemDiv);
    }
    $(".tdListRight").hide();
    $(".tdListLeft").removeClass('col-md-6');
    // $(".carousel-inner").append(itemDiv);


}

function displayTableDataOnDesktop(){
    $(".tdListRight").show();
    $(".mobileSlide").remove();
    $(".tdListLeft").addClass('col-md-6');
    var mobileSlideItem = $(".carousel-content>.mobileRow");
    // for(var i = 0; i<mobileSlideItem.length; i++){
    //     mobileSlideItem[i].children[i].addClass('tdListLeft')
    // }
}

function checkIfPlayerIsMuted() {
    if(player.isMuted()) {
        player2.mute();
    } else {
        player2.unMute();
        currentVolumeLevel = player.getVolume();
        player2.setVolume(currentVolumeLevel);
    }
}

function checkIfPlayer2IsMuted() {
    if(player2.isMuted()) {
        player.mute();
    } else {
        player.unMute();
        currentVolumeLevel = player2.getVolume();
        player.setVolume(currentVolumeLevel);
    }
}

function fadeToFirstSlideEffect(){
    $(".tdRow").hide();
    $(".tdRow").fadeIn(2000)
}

function returnToPageOne(){
    $(".carousel").removeClass('slide')
    $(".carousel").carousel(0);
    if(currentSlideNumber !== 1){

        currentSlideNumber = 1; //redundant?
        if(videoObjectsToLoad.length !== 0) {
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

// function returnToPageOne(){
//     $(".active").fadeOut();
//     if(currentSlideNumber !== 1){
//         //show backwards animation

//         if(currentSlideNumber % 2 === 0)
//         {
//             currentSlideNumber = 2;
//             $(".carousel").carousel(0);
            
//         }
//         else
//         {
//             // currentSlideNumber = 3;
//             // $(".carousel").carousel('prev');
//             // $(".carousel").carousel(0);
//         }
//         //
//         //find and load data into list
//         currentSlideNumber = 1; //redundant?
//         var videosToLoad = [];
//         for(var i = 0; i < 40; i++){
//             videosToLoad.push(videoObjectsToLoad[i])
//         }
//         console.log("VIDEOS TO LOAD", videosToLoad);    //load list data while carousel is moving
//         setTimeout(function(){
//             clearVideoList();
//             renderVideoList(videosToLoad)
//         }, 250)
//     }
//     $(".active").fadeIn();
//     displayCurrentPageNumber();
// }

// check if device is apple mobile device (used to convert date object)
function checkIfAppleDevice(){
    if(navigator.userAgent.match(/(iPhone|iPod|iPad)/) != null) {
        return true;
    }else{
        return false;
    }
}

//converts date object for apple mobile devices
function convertDateForApple(dateFromAPI){
    if(checkIfAppleDevice()){
        // let date = "2017-11-03 09:34:14" //testing only - sample data
        let newDate = dateFromAPI.split(" ");
        let removeTime = newDate[0].split("-")
        let iosDate = removeTime[1]+ '/' + removeTime[2]+ '/'+removeTime[0]
        return iosDate
    }else{
        return;
    }
}
function resetSelectedTd() {
    //NEEDS TO ALSO HANDLE FA FA SPINNER

    setTimeout(function(){
        $(".tdList").removeClass('selectedTd');
        $('.fa-circle-o-notch').remove();
    }, 100);
    for (let i = 0; i < 40; i++) {
        let row = "#tdList-" + (i + 1);

        if (player.getVideoUrl().indexOf($(row).attr('videoid')) !== -1) {
            setTimeout(function(){
                $(row).addClass("selectedTd")
                var playSymbol = $('<i>')
                    .addClass('fa fa-circle-o-notch fa-spin fa-fw')
                    .css({
                        "margin-right": '5px',
                        'color': 'green'
                    });
                $(row).find(".tdTitle>span").prepend(playSymbol);
            }, 500)
        }
    }
}

function loadNextPage(){
    if (currentSlideNumber % 2){
        var pageToLoad = (currentSlideNumber - 1) / 2;
        var indexToStartOn = (pageToLoad) * 40;
        var videosToLoad = [];
        if(videoObjectsToLoad.length < indexToStartOn+40){
            $.ajax({
                url: './script/api_calls_to_db/access_database/access.php',
                method: 'POST',
                dataType: 'JSON',
                data: {
                    action:'read_videos_by_channel_array',
                    channel_id_array:clientSelectedChannelIds,
                    offset:indexToStartOn
                },
                success: function (data) {
                    if (data.success) {
                        // promise.resolve(data);
                        console.log('read success', data);
                        for(var i = 0; i < data.data.length; i++){
                            videoObjectsToLoad.push(data.data[i])
                        }
                        for(var i = indexToStartOn; i < indexToStartOn+40; i++){
                            videosToLoad.push(videoObjectsToLoad[i])
                        }
                        console.log("VIDEOS TO LOAD", videosToLoad)
                        setTimeout(function(){
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
        else{
            for(var i = indexToStartOn; i < indexToStartOn+40; i++){
                videosToLoad.push(videoObjectsToLoad[i])
            }
            console.log("VIDEOS TO LOAD", videosToLoad)
            setTimeout(function(){
                // clearVideoList();
                renderVideoList(videosToLoad)
                removeUnusedRows();
            }, 250)
        }
    }
}
function loadPreviousPage(){
    if (!(currentSlideNumber % 2)){
        var pageToLoad = (currentSlideNumber/2)-1;
        var indexToStartOn = (pageToLoad) * 40;
        var videosToLoad = [];


        for(var i = indexToStartOn; i < indexToStartOn+40; i++){
            videosToLoad.push(videoObjectsToLoad[i])
        }
        console.log("VIDEOS TO LOAD", videosToLoad);
        setTimeout(function(){
            // clearVideoList();
            renderVideoList(videosToLoad)
        }, 250)
    }
}

// Making media query with javascript to hide saerch button inside hamburger menu and dynamically creat one on header

// if(window.matchMedia("(min-width: 1020px)").matches) {
//     var searchDiv = $('<div>').addClass('form-group');
//     var inputElement = $('<input>', {
//         type: 'text',
//         class: 'form-control',
//         placeholder: 'search channels',
//         name: 'channelSearch',
//         id: 'channelSearchInput'
//     });
//     var buttonElement = $('<button>', {
//         type: 'submit',
//         class: 'btn btn-danger channelSearchButton',
//         dataToggle: 'tooltip',
//         dataPlacement: 'bottom',
//         dataTrigger: 'hover',
//         title: 'search for channels to add',
//         text: 'search'
//     });
//     var searchDivWrapper = $(searchDiv).append(inputElement);
//     var completedSearchDiv = $(searchDivWrapper).append(buttonElement);
//     $('#mainNav').append(completedSearchDiv);
// }

