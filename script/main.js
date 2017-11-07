var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];

var clientVideoObjectArray = null;
var globalChannelObjectArray = null;

var currentSlideNumber = 1;

// var currentChannels = [];
// var currentVideos = [];

firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady(vidId) {
    player = new YT.Player('mainVideo', {
        videoId: vidId || 'lrzIR8seNXs'
    });
    onYouTubeIframeAPIReady2();
}
function onYouTubeIframeAPIReady2() {
    player2 = new YT.Player('theaterVideo', {
        videoId: 'lrzIR8seNXs'
    });
}
var player;
var player2;

/*******needed for iframe player*******/

$(window).resize(function(){
    let windowWidth = ($(window).width());
    if(windowWidth <= 768){
        displayTableDataOnMobile()
    }else{
        displayTableDataOnDesktop()
    }
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
        }else{
            currentSlideNumber--
        }
        displayCurrentPageNumber()
    });
    clearVideoList();   //hides list rows until they are needed

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
    $(".channelSearchForm .channelSearchButton").on('click', function (event) {
        $(".navbar-collapse").collapse('hide');
        event.preventDefault();
        searchChannelsByName().then(worked, failed);
        // $(".contentPlaceholder").hide();
        $('.contentPlaceholderWrapper').fadeOut(1000, function(){
            $('#text-carousel, .videoHeader').slideDown(1100);
        });
        // $("#text-carousel").show()
        // $(".videoHeader").show()
    });
    //Browse Button
    $('.browseChannelButton').on("click", handleBrowseButton);

    //Table List Rows that are unselected
    $(".tdTitle, .tdChannel, .tdUpDate").on("click", function () {
        if(!$(this).parent().hasClass('selectedTd')) {
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
                    }, 250);
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
            //Table List Row Title that is selected
            $(".tdTitle").on("click", function (){
                if($(this).parent().hasClass('selectedTd')) {
                    $("#videoStats").focus().click()
                    // $("#videoStats").popover('toggle')
                }
            });

            //Table List Row Channel that is selected
            $(".tdChannel").on("click", function (){
                if($(this).parent().hasClass('selectedTd')) {
                    $("#channelInfo").focus().click()
                }
            });
        }
    });

    // //click hides popover
    // $('body').on("click",function(){
    //     $("#videoStats").popover('hide');
    //     $("#channelInfo").popover('hide');
    //     console.log("hey now")
    // });

    //Theater mode
    $('.lightBoxMode').on('click', function () {
        let currentVolumeLevel = null;
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

    // //video stats popover    //NOT USED PROBABLY
    // $("#videoStats").on('show.bs.popover', function () {
    //     const videoLink = ($('#mainVideo').attr("src"));
    //     let videoID = videoLink.replace("https://www.youtube.com/embed/", "");
    //     videoID = videoID.substring(0, videoID.indexOf('?'));
    //     $.ajax({
    //         url: 'https://www.googleapis.com/youtube/v3/videos',
    //         dataType: 'json',
    //         method: 'get',
    //         data: {
    //             key: "AIzaSyAOr3VvEDRdI5u9KGTrsJ7usMsG5FWcl6s",
    //             id: videoID,
    //             part: 'snippet, statistics'
    //         },
    //         success: function (data) {
    //             console.log('Youtube success', data);
    //         },
    //         error: function (data) {
    //             console.log('something went wrong with YT', data);
    //         }
    //     })
    // });
    // //channel stats popover

}

//Channel Search by Name
function searchChannelsByName() {
    string = $('#channelSearchInput').val();
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
    $(".tdTitle").popover('destroy');

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

function renderVideoList(videoArray) {
    setTimeout(function () {
        for (let i = 0; i < videoArray.length; i++) {

            let row = "#tdList-" + (i + 1);
            let title = row + " .tdTitle>span";
            let channel = row + " .tdChannel";
            let upDate = row + " .tdUpDate";

            let dateString = videoArray[i].published_at;
            const d = new Date(dateString);
            dateString = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear().toString().substring(2);

            $(row).show();

            $(row).attr("videoID", videoArray[i].youtube_video_id);
            $(row).attr("channelID", videoArray[i].youtube_channel_id);
            $(title).text(videoArray[i].video_title);
            $(channel).text(videoArray[i].channel_title);
            $(upDate).text(dateString);

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
            $(row + " .tdTitle").popover({
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
        // removePlaceholderAnimation();
    }, 250);
}

function ytChannelApiToDb(channelId) {
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

            access_database.insert_channel(channelDbObject);

        },
        error: function (data) {
            console.log('something went wrong with YT', data);
        }
    });
}

function ytVideoApiToDb(channelId, pageToken = "", firstRun = true) {
    var packageToSendToDb = [];
    var clientVideos = [];
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
                clientVideoObjectArray = [];
                var clientPackage = [];
                for(var i = 0; i < 40; i++){
                    clientPackage.push(packageToSendToDb[i])
                }
                clientVideoObjectArray = clientPackage
            }
            access_database.insert_video(packageToSendToDb);

            if (data.hasOwnProperty('nextPageToken') && data.items.length !== 0) {
                ytVideoApiToDb(channelId, data.nextPageToken, false)
            }
        },
        error: function (data) {
            console.log('something went wrong with YT', data);
        }
    });
}

function manageDatabaseWithChannelId (channelID){
    clientVideoObjectArray = null;
    //Check channel database to see if channelID exists in db
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
                console.log("Channel will be pulled from database", data);
                data.youtube_channel_id = channelID;
                globalChannelObjectArray = [];
                globalChannelObjectArray.push(data);
                //get videos
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
                            globalChannelObjectArray = [];
                            globalChannelObjectArray.push(data.data[0]);
                            console.log("CHANNEL ID IS", channelID);
                            $.ajax({    //RETRIEVE VIDEOS FROM DB
                                url: './script/api_calls_to_db/access_database/access.php',
                                method: 'POST',
                                dataType: 'JSON',
                                data: {
                                    action:'read_videos_by_channel',
                                    youtube_channel_id:channelID,
                                    offset:0
                                },
                                success: function (data) {
                                    if (data.success) {
                                        // promise.resolve(data);
                                        console.log('Videos Found', data);
                                        clientVideoObjectArray = data.data;
                                        loadClientVideoObjectArray();//TODO Conditional Run on BROWSE, only run on SEARCH when no channels pre-selected
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
                    },
                    errors:function(data){
                        // promise.reject(data);
                        console.log(data['read errors'], data);
                    }
                })
            }
            else{   //RETRIEVE VIDEOS FROM YOUTUBE
                if(data.nothing_to_read){
                    console.log("Retrieve Videos From You Tube", data);
                    ytVideoApiToDb(channelID);
                    ytChannelApiToDb(channelID);
                    loadClientVideoObjectArray();  //TODO Conditional Run on BROWSE, only run on SEARCH when no channels pre-selected
                }
            }
        },
        errors:function(data){
            console.log(data['read errors'], data);
            // promise.reject(data);
        }
    });
}

function loadClientVideoObjectArray() {


    if (clientVideoObjectArray === null) {
        setTimeout(loadClientVideoObjectArray, 50);
        return
    }
    renderVideoList(clientVideoObjectArray);
}

function handleBrowseButton() {
    clearVideoList();
    // createPlaceholderAnimation();

    let channelID = $(this).parent().attr("channelId");
    manageDatabaseWithChannelId(channelID);
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

// //Testing placeholder animation
// var classes = [
//     "background-masker header-top",
//     "background-masker header-left",
//     "background-masker header-right",
//     "background-masker header-bottom",
//     "background-masker subheader-left",
//     "background-masker subheader-right",
//     "background-masker subheader-bottom",
//     "background-masker content-top",
//     "background-masker content-first-end",
//     "background-masker content-second-line",
//     "background-masker content-second-end",
//     "background-masker content-third-line",
//     "background-masker content-third-end"
// ]

// function createPlaceholderAnimation() {
//     $(".tdList").show();
//
//     var outerDiv = $('<div>').addClass("timeline-wrapper");
//     var nestedDiv1 = $('<div>').addClass("timeline-item");
//     var nestedDiv2 = $('<div>').addClass("animated-background");
//     var completedWrapper = $(outerDiv).append(nestedDiv1, nestedDiv2);
//     for (var i = 0; i < 12; i++) {
//         var childElements = $('<div>').addClass(classes[i]);
//         $(childElements).appendTo(nestedDiv2);
//
//     }
//     $('.tdTitle, .tdChannel, .tdUpdate').append(completedWrapper);
// }
//
// function removePlaceholderAnimation(){
//     for(var i = 0; i<40; i++){
//         let row = "#tdList-" + (i + 1);
//         let title = row + " .tdTitle>span";
//
//         if($(title).text() === ""){
//             $(row).hide();
//         }
//     }
// }


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

function returnToPageOne(){
    $(".carousel").carousel(0);
    currentSlideNumber = 1;
    displayCurrentPageNumber();
}




