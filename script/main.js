var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];

var globalVideoObjectArray = null;

firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// var player;
function onYouTubeIframeAPIReady(vidId) {
    player = new YT.Player('mainVideo', {

        videoId: vidId || 'X2WH8mHJnhM'
    });
    // player.attr("id", "mainVideo")
    onYouTubeIframeAPIReady2();
}

function onYouTubeIframeAPIReady2() {
    player2 = new YT.Player('theaterVideo', {
        videoId: 'X2WH8mHJnhM'
    });
}
var player;
var player2;
/*******needed for iframe player*******/

$(document).ready(function () {

    /**
     function for preventing page refresh with search button;
     only did it because page refresh was annoying
     **/
    $('#midNav-option form button').click(function (event) {
        event.preventDefault();
    });

    /*** button target for opening theater mode ***/
    // $('.lightBoxMode').click(function(){
    //     onYouTubeIframeAPIReady2();
    //     $('#lightBoxModal').modal('show');
    // });
    /*** ***/
    tooltipFunctions();
    // $('.videoStats').click(function(){
    //  $('.videoStats').popover('toggle');
    // });
    // $('#videoStats').popover('hover focus');
    clickHandler();
    // $('.channelSearchForm').click(function(){
    //     $('#channelSearchModal').modal('show'); //this would need to be called at success function of ajax call
    // });

    // //TEMP DUMMY DATA
    // renderVideoList(sampleSubscriptions)
    // //TEMP DUMMY DATA

});

// function renderVideoInfo(videoObject){       //argument is video object - just one specific piece of the subscription object.  Object that is the value of the video id
//     $('#videoInfo').popover({
//         content: function() {
//             var message = videoObject.snippet.description;
//             return message;
//         }
//     });
// }

function tooltipFunctions(){
    $('[data-toggle="tooltip"]').tooltip(); //needed for tooltip
    $('[data-toggle="popover"]').popover();
    $('.browseChannelButton').mouseenter(function(){
        setTimeout(function(){
            $('.browseChannelButton').tooltip('hide');
        },1000);
    });
    $('.lightBoxMode').mouseenter(function(){
        setTimeout(function(){
            $('.lightBoxMode').tooltip('hide');
        },1000);
    });
    $('.channelSearchButton').mouseenter(function(){
        setTimeout(function(){
            $('.channelSearchButton').tooltip('hide');
        },1000);
    });
    $('.videoSearchButton').mouseenter(function(){
        setTimeout(function(){
            $('.videoSearchButton').tooltip('hide');
        },1000);
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
        $('.fa-play-circle-o').remove();
        var playSymbol = $('<i>')
            .addClass("fa fa-play-circle-o")
            .css({
                "margin-right": '5px',
                'color': 'green'
            });
        $(this).parent().find(".tdTitle>span").prepend(playSymbol);
        $('.tdList').removeClass('selectedTd');
        $(this).parent().addClass("selectedTd");
        console.log($(this).parent().attr('videoId'));
        // $('#mainVideo').attr("src", 'https://www.youtube.com/embed/'+$(this).parent().attr('videoId')+ '?&autoplay=1');
        player.loadVideoById($(this).parent().attr('videoId'));

        // // $('#theaterVideo').attr("src", 'https://www.youtube.com/embed/'+$(this).parent().attr('videoId'));
        player2.cueVideoById($(this).parent().attr('videoId'));

    });

    // // Created click handler for add channel modal button to get the result of videos for that channel that was clicked
    // $(".modal-body").on('click', 'li', function () {
    //     var channelId = $(this).attr('channelid');
    //     searchVideoByChannelId(channelId);
    //
    // })

    // Ian's click handlers
    //Chris cleaned up code to save state of video and check if playing or paused that transfer state to theatre mode
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

}

// //Function being called when user clicks on add channel button in modal with all the youtube channel results
// function searchVideoByChannelId(channelId) {
//     var channelId = channelId;
//     console.log('chanel is', channelId);
//     $.ajax({
//         url: 'https://www.googleapis.com/youtube/v3/search',
//         dataType: 'json',
//         method: 'get',
//         data: {
//             key: 'AIzaSyAOr3VvEDRdI5u9KGTrsJ7usMsG5FWcl6s',
//             channelId: channelId,
//             type: 'video',
//             part: 'snippet',
//             order: 'date',
//             maxResults: 10
//         },
//         success: function (data) {
//             console.log('Found video of channel you clicked on', data);
//         },
//         error: function (data) {
//             console.log('Channel video search got an error', data);
//         }
//     })
//
// }

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
            for (var i = 0; i < 10; i++) {
                var channelListData = "#chSearch-" + (i + 1);
                var chName = channelListData + " .chName";
                var img = channelListData + " img";
                var browseButton = channelListData + ".browseChannelButton"
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

            $(row).attr("videoID", videoArray[i].video_id);
            $(title).text(videoArray[i].video_title);
            $(channel).text(videoArray[i].channel_title);
            $(upDate).text(dateString);

            let videoData = row + " .tdInfo a";
            let videoURL = 'https://i.ytimg.com/vi/' + videoArray[i].video_id + '/mqdefault.jpg';
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
            channelDbObject.channel_id = channelId;
            channelDbObject.channel_title = data.items[0].snippet.title;
            channelDbObject.description = data.items[0].snippet.description;

            var thumbnail = data.items[0].snippet.thumbnails.medium.url;
            thumbnail = thumbnail.replace('https://yt3.ggpht.com/', '');
            thumbnail = thumbnail.replace('/photo.jpg', '');
            channelDbObject.thumbnail = thumbnail;

            //Doing API calls for these?
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

function convertYTApiVideoDatatoDbData(channelId, dbVideoObjects = [], pageToken = "") {
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
            for (var i = 0; i < data.items.length; i++) {
                var videoObject = {};
                videoObject.video_title = data.items[i].snippet.title;
                videoObject.video_id = data.items[i].id.videoId;
                videoObject.channel_id = data.items[i].snippet.channelId;
                videoObject.channel_title = data.items[i].snippet.channelTitle;
                videoObject.description = data.items[i].snippet.description;
                videoObject.published_at = data.items[i].snippet.publishedAt;
                // var thumbnail = data.items[i].snippet.thumbnails.medium.url;
                // thumbnail = thumbnail.replace('https://i.ytimg.com/vi/', '');
                // thumbnail = thumbnail.replace('/mqdefault.jpg', '');
                // videoObject.thumbnail = thumbnail;

                dbVideoObjects.push(videoObject);
            }
            if (data.hasOwnProperty('nextPageToken') && data.items.length !== 0) {
                convertYTApiVideoDatatoDbData(channelId, dbVideoObjects, data.nextPageToken)
            } else {
                globalVideoObjectArray = dbVideoObjects; //set to global variable  Can't return the array for some reason
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

function browseChannel(channelId, pageNumber) {
    var page = pageNumber;

    function handleData(pageNumber) {
        if (globalVideoObjectArray === null) {
            setTimeout(handleData, 50);
            return
        }
        var videoArrayPage = convertVideoArrayToOnePage(globalVideoObjectArray, page);
        console.log('PAGE NUMBER', page);
        renderVideoList(videoArrayPage);
        globalVideoObjectArray = null;
    }
    convertYTApiVideoDatatoDbData(channelId);
    handleData(channelId, pageNumber)
    $('.fa-play-circle-o').remove();
    $('.tdList').removeClass('selectedTd');
}

function handleBrowseButton() {
    var channelID = $(this).parent().attr("channelId")
    browseChannel(channelID)
    $('#channelSearchModal').modal('hide')
}