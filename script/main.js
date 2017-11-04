var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];

var globalVideoObjectArray = null;

var currentSlideNumber = 1;

var currentChannels = [];
var currentVideos = [];

firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// var player;
function onYouTubeIframeAPIReady(vidId) {
    player = new YT.Player('mainVideo', {

        videoId: vidId || 'ZZ5LpwO-An4'
    });
    // player.attr("id", "mainVideo")
    onYouTubeIframeAPIReady2();
}

function onYouTubeIframeAPIReady2() {
    player2 = new YT.Player('theaterVideo', {
        videoId: 'ZZ5LpwO-An4'
    });
}
var player;
var player2;

/*******needed for iframe player*******/

$(document).ready(function () {
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


});

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
}

//Click handler to console log search results
function clickHandler() {
    //Search Button
    $(".channelSearchForm .channelSearchButton").on('click', function (event) {
        event.preventDefault();
        searchChannelsByName().then(worked, failed);
    });
    //Browse Button
    $('.browseChannelButton').on("click", handleBrowseButton)

    //Table List Rows
    $(".tdTitle, .tdChannel, .tdUpDate").on("click", function () {
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
        console.log($(this).parent().attr('videoId'));
        // $('#mainVideo').attr("src", 'https://www.youtube.com/embed/'+$(this).parent().attr('videoId')+ '?&autoplay=1');
        if (getAutoPlayValue() == true) {
            player.loadVideoById($(this).parent().attr('videoId'));
        } else
            player.cueVideoById($(this).parent().attr('videoId'));

        // // $('#theaterVideo').attr("src", 'https://www.youtube.com/embed/'+$(this).parent().attr('videoId'));
        player2.cueVideoById($(this).parent().attr('videoId'));


        //update stats popover
        var videoID = $(this).parent().attr('videoId');
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
                console.log('Youtube success',data);
                var likes = parseInt(data.items[0].statistics.likeCount);
                var dislikes = parseInt(data.items[0].statistics.dislikeCount);

                var perecentLikes = likes / (likes + dislikes) * 100;
                var percentDislikes = 100 - perecentLikes;

                var videoStatsDiv = $('<div></div>');
                var views = $('<p><strong>Views: </strong>'+parseInt(data.items[0].statistics.viewCount).toLocaleString("en-us")+'</p>');
                var likesTitle = $('<p><strong>Likes and Dislikes:</strong></p>');
                var likesBar = null;
                if(likes > dislikes){
                    likesBar = $('<div class="progress"><div class="progress-bar progress-bar-success" style="width:'+perecentLikes+'%">'+likes.toLocaleString("en-us")+' Likes</div><div class="progress-bar progress-bar-danger" style="width:'+percentDislikes+'%"></div>');
                }
                else{
                    likesBar = $('<div class="progress"><div class="progress-bar progress-bar-success" style="width:'+perecentLikes+'%">'+dislikes.toLocaleString("en-us")+' Dislikes</div><div class="progress-bar progress-bar-danger" style="width:'+percentDislikes+'%"></div>');
                }

                var descriptionTitle = $('<p><strong>Description: </strong></p>');
                var description = $('<p>'+data.items[0].snippet.description+'</p>');

                videoStatsDiv.append(views, likesTitle, likesBar, descriptionTitle, description);

                $("#videoStats").popover('destroy');
                setTimeout(function () {
                    $("#videoStats").popover({
                        html: true,
                        content: videoStatsDiv,
                        placement: 'auto',
                        container: 'body'
                    });
                }, 250);

                $("#videoStats").attr({
                    'data-original-title': data.items[0].snippet.title + " - " + data.items[0].snippet.channelTitle
                });




            },
            error: function (data) {
                console.log('something went wrong with YT', data);
            }
        })

    });

    //Theater mode
    $('.lightBoxMode').on('click', function () {
        player.pauseVideo();
        if (player.getPlayerState() === 2) {
            player.pauseVideo();
            player2.seekTo(player.getCurrentTime());
            player2.pauseVideo();
            $('#lightBoxModal').modal('show');
        } else if (player.getPlayerState() === 1) {
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
            player2.pauseVideo();
            player.seekTo(player2.getCurrentTime());
            player.pauseVideo();
            $('#lightBoxModal').modal('show');
        } else if (player2.getPlayerState() === 1) {
            player2.pauseVideo();
            player.seekTo(player2.getCurrentTime());
            $('#lightBoxModal').modal('show');
            player.playVideo();
        } else if (player2.getPlayerState() === 5) {
            $('#lightBoxModal').modal('show');
        }
    });

    //stats popover
    $("#videoStats").on('show.bs.popover', function () {
        var videoLink = ($('#mainVideo').attr("src"));
        var videoID = videoLink.replace("https://www.youtube.com/embed/", "");
        videoID = videoID.substring(0, videoID.indexOf('?'));
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
            },
            error: function (data) {
                console.log('something went wrong with YT', data);
            }
        })


    });

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
            console.log('Youtube success', data);
            $('#channelSearchModal').modal('show');
            clearChannelResults();
            for (var i = 0; i < data.items.length; i++) {
                var channelListData = "#chSearch-" + (i + 1);
                var chName = channelListData + " .chName";
                var img = channelListData + " img";
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
            console.log('Youtube success', data);
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
    })
}

function clearChannelResults() {
    for (var i = 0; i < 10; i++) {
        var chName = channelListData + " .chName";
        var img = channelListData + " img";
        var chSub = "#chSearch-" + (i + 1) + " .chSub";
        var chDesc = "#chSearch-" + (i + 1) + " .chInfoButton";
        $(channelListData).attr("channelId", "");
        $(chName).text("");
        $(img).attr("src", "");
        $(chSub).text("");
        $(chDesc).attr({
            "data-original-title": "",
            "data-content": ""
        });
        var channelListData = "#chSearch-" + (i + 1);
        $(channelListData).css("display", 'none')
    }
}

function renderVideoList(videoArray) {
    $(".tdTitle").popover('destroy');

    setTimeout(function () {
        for (let i = 0; i < videoArray.length; i++) {

            let row = "#tdList-" + (i + 1);
            let title = row + " .tdTitle>span";
            let channel = row + " .tdChannel";
            let upDate = row + " .tdUpDate";

            let dateString = videoArray[i].published_at;
            const d = new Date(dateString);
            dateString = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear().toString().substring(2);

            $(row).attr("videoID", videoArray[i].youtube_video_id);
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
            });
        }
    }, 250);


}

function convertYTApiChannelDatatoDbData(channelId) {
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
            //
            // Doing API calls for these?
            // channelDbObject.sub_count = data.items[0].statistics.subscriberCount;
            // channelDbObject.video_count = data.items[0].statistics.videoCount;
            // channelDbObject.view_count = data.items[0].statistics.viewCount;
        },
        error: function (data) {
            console.log('something went wrong with YT', data);
        }
    });
    return channelDbObject;
}

function convertYTApiVideoDatatoDbData(channelId, allVideos = [], pageToken = "") {
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
            console.log('Youtube success', data);
            createPlaceholderAnimation();
            for (var i = 0; i < data.items.length; i++) {
                var videoObject = {};
                videoObject.video_title = data.items[i].snippet.title;
                videoObject.youtube_video_id = data.items[i].id.videoId;
                videoObject.channel_id = data.items[i].snippet.channelId;
                videoObject.channel_title = data.items[i].snippet.channelTitle;
                videoObject.description = data.items[i].snippet.description;
                var publishedAt = data.items[i].snippet.publishedAt;
                publishedAt = publishedAt.replace("T", " ");
                publishedAt = publishedAt.replace(".000Z", "");
                videoObject.published_at = publishedAt;
                // var thumbnail = data.items[i].snippet.thumbnails.medium.url;
                // thumbnail = thumbnail.replace('https://i.ytimg.com/vi/', '');
                // thumbnail = thumbnail.replace('/mqdefault.jpg', '');
                // videoObject.thumbnail = thumbnail;

                allVideos.push(videoObject);
                packageToSendToDb.push(videoObject);
            }
            access_database.insert_video(packageToSendToDb);

            if (data.hasOwnProperty('nextPageToken') && data.items.length !== 0) {
                convertYTApiVideoDatatoDbData(channelId, allVideos, data.nextPageToken)
            } else {
                globalVideoObjectArray = allVideos; //set to global variable  Can't return the array for some reason
            }
        },
        error: function (data) {
            console.log('something went wrong with YT', data);
        }
    });
}

function convertVideoArrayToOnePage(videoArray, page = 0) { //Temp - will pull 40 at a time from database
    var returnArray = [];
    for (let i = (page * 40); i < ((page * 40) + 40); i++) {
        returnArray.push(videoArray[i])
    }
    return returnArray
}

function manageDatabaseWithChannelId (channelID){
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
                console.log("CHANNEL IS DATABASE", data);
                //READ VIDEOS FROM DB
                data.youtube_channel_id = channelID;
                currentChannels.push(data);
                //get videos
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
                            // promise.resolve(data);
                            console.log('read data success', data);
                            currentVideos.push(data)
                        }

                    },
                    errors:function(data){
                        // promise.reject(data);
                        console.log(data['read errors'], data);
                    }
                })
            }
            else{
                console.log('data', data)
                console.log('data.nothing_to_read', data.nothing_to_read)
                if(data.nothing_to_read){
                    console.log("NOT ON DATABASE")
                    convertYTApiVideoDatatoDbData(channelID);       //READ AND CHECK if exists on db FIRST!
                    var ytChannelData = convertYTApiChannelDatatoDbData(channelID);
                    access_database.insert_channel(channelID)

                    function handleGlobalVideoObjectArray() {
                        if (globalVideoObjectArray === null) {
                            setTimeout(handleData, 50);
                            return
                        }
                        var videoArrayPage = convertVideoArrayToOnePage(globalVideoObjectArray, page);
                        renderVideoList(videoArrayPage);
                        globalVideoObjectArray = null;
                    }
                    handleGlobalVideoObjectArray(channelID);
                }
            }
        },
        errors:function(data){
            // promise.reject(data);
        }
    });
}


function browseChannel(channelId) {

    manageDatabaseWithChannelId(channelId);

    // toastMsg('loading channel videos',1000);
    $('.fa-play-circle-o').remove();
    $('.tdList').removeClass('selectedTd');
}

function handleBrowseButton() {
    var channelID = $(this).parent().attr("channelId")

    browseChannel(channelID)
    $('#channelSearchModal').modal('hide')
}

function displayCurrentPageNumber() {
    $("#currentSlideNumberArea").text(currentSlideNumber)
    if (currentSlideNumber == 1) {
        $(".leftControl").hide()
    } else {
        $(".leftControl").show()
    }
}



function getAutoPlayValue() {
    return $("#autoplayCheckBox").is(":checked")
}


//Testing placeholder animation
var classes = [
    "background-masker header-top",
    "background-masker header-left",
    "background-masker header-right",
    "background-masker header-bottom",
    "background-masker subheader-left",
    "background-masker subheader-right",
    "background-masker subheader-bottom",
    "background-masker content-top",
    "background-masker content-first-end",
    "background-masker content-second-line",
    "background-masker content-second-end",
    "background-masker content-third-line",
    "background-masker content-third-end"
]

function createPlaceholderAnimation() {
    var outerDiv = $('<div>').addClass("timeline-wrapper");
    var nestedDiv1 = $('<div>').addClass("timeline-item");
    var nestedDiv2 = $('<div>').addClass("animated-background");
    var completedWrapper = $(outerDiv).append(nestedDiv1, nestedDiv2);
    for (var i = 0; i < 12; i++) {
        var childElements = $('<div>').addClass(classes[i]);
        $(childElements).appendTo(nestedDiv2);

    }
    $('.tdTitle, .tdChannel').append(completedWrapper);
}