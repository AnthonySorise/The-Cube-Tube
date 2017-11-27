var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
var videoObjectsToLoad = null;
var clientSelectedChannelObjects = [];
var clientSelectedChannelIds = [];
var clientSubscribedChannelIds = [];
var clientSubscribedChannelObjects = [];
var currentSlideNumber = 1;
var currentVideoindex = null;
var browsingMode = false;
var currentVolumeLevel = null;
const play = "fa fa-play modalControls playButton";
const pause = "fa fa-pause modalControls pauseButton";
var player;
<<<<<<< HEAD
var player2;
var videoID = null;
var nextVideoIdToLoad = null;
//hard coded playlistarray for testing
var playlistArray = [
    "kSgr6tkAFLA",
    "iWOHzUgCtw4",
    "ELMot6xawIs"
]

firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady(vidId) {
    player = new YT.Player('mainVideo', {
        videoId: vidId || 'lrzIR8seNXs',
        playerVars: {
            'rel': 0
        },
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
    onYouTubeIframeAPIReady2();
}


function onYouTubeIframeAPIReady2() {
    player2 = new YT.Player('theaterVideo', {
        videoId: 'lrzIR8seNXs',
        playerVars: {
            'rel': 0,
        },
        events: {
            'onStateChange': onPlayerStateChange
        }

    });
}

function onPlayerStateChange(event) {

    if (event.data == YT.PlayerState.PLAYING) {
        $('.playButton').removeClass(play).toggleClass(pause);

    } else if (event.data == YT.PlayerState.PAUSED) {
        $('.pauseButton').removeClass(pause).toggleClass(play);
    }
    if (event.data == YT.PlayerState.ENDED && getAutoPlayValue()) {
        console.log('video ended');
        //Added check for playlist feature to add certain videos to play instead of playing videos stright from carousel list
        if(playlistArray.length > 0) {
            player.loadVideoById(playlistArray[0]);
            playlistArray.splice(0, 1);
            return;
        }
        
        currentVideoindex = videoObjectsToLoad.findIndex(x => x.youtube_video_id == videoID);
        if (videoObjectsToLoad.length <= currentVideoindex + 1) {
            $.when(loadNextPage()).then(playNextYTVideo);
            $('.carousel').carousel('next');
        }
        else if (videoObjectsToLoad.length % 20 === 0 && (currentVideoindex + 1) % 20 === 0) {
            $('.carousel').carousel('next');
            playNextYTVideo();
        } else {
            playNextYTVideo();
        }
    }
}
//Function to play next video and change spinner icon to current video playing
function playNextYTVideo() {
    currentVideoindex = videoObjectsToLoad.findIndex(x => x.youtube_video_id == videoID);
    nextVideoIdToLoad = videoObjectsToLoad[currentVideoindex + 1].youtube_video_id

    if (getAutoPlayValue()) {
        player.loadVideoById(nextVideoIdToLoad);
    } else {
        player.cueVideoById(nextVideoIdToLoad);
    }
    player2.cueVideoById(nextVideoIdToLoad);
    videoID = nextVideoIdToLoad;
    $(".tdList").removeClass('selectedTd');
    $('i').removeClass('fa-circle-o-notch fa-spin fa-fw');
    $("[videoid='" + videoID + "'] span:first").before('<i>');
    $("[videoid='" + videoID + "'] i:first").addClass('fa fa-circle-o-notch fa-spin fa-fw').css({
        "margin-right": '5px',
        'color': 'green'
    });
    $("[videoid='" + videoID + "']").addClass('selectedTd');

}


/*******needed for iframe player*******/
let iframeRight = 0;
$(window).resize(function () {
    let windowWidth = ($(window).width());
    if (windowWidth <= 768) {
        // displayTableDataOnMobile()
    } else {
        // displayTableDataOnDesktop()
    }
    iframeRight = $('#mainVideo').position().left + $('#mainVideo').width();
    $('.lightBoxMode').css('left', iframeRight + 'px');
})

=======
// var player2;
var currentlySelectedVideoID = null;
// var nextVideoIdToLoad = null;
// var prevVideoIdToLoad = null;
>>>>>>> 2ae18eba4a8d263a556db5e792fdc729311506fd

$(document).ready(function () {
    function initApp(){
        
        $("#text-carousel, .videoHeader, .listDropWrap, .listUpWrap").hide();
        // $(".videoHeader").hide();
        // $('.listDropWrap').hide();

        rendertheatreControls();
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

<<<<<<< HEAD
            //Table List Row Channel that is selected
            $(".tdChannel").mouseup(function () { 
                if ($(this).parent().hasClass('selectedTd')) {
                    // $("#channelInfo").focus().click()
                    $("#channelInfo").trigger('focus')
                }
            });

            videoID = $(this).parent().attr('videoId');
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
=======
        $('#text-carousel').on('slide.bs.carousel', function (ev) {
            console.log(ev)
            if (ev.direction == 'left') {
                currentSlideNumber++
                loadNextPage();
>>>>>>> 2ae18eba4a8d263a556db5e792fdc729311506fd
            } else {
                currentSlideNumber--
                loadPreviousPage();
            }
            displayCurrentPageNumber()
        });
        clearVideoList();   //hides list rows until they are needed
        setTimeout(() => {
            iframeRight = $('#mainVideo').position().left + $('#mainVideo').width();
            $('.lightBoxMode').css('left', iframeRight + 'px');
        }, 500);

        setTimeout(() => {
            initiateUser();
        }, 2000)
    }

    var iFrameLoadTries = 0;
    function waitForIframe(){
        if(iFrameLoadTries > 50){
            console.log("LOAD IFRAME FAILED - TRY AGAIN")
            iFrameLoadTries = 0;
            player = null;
            onYouTubeIframeAPIReady(currentlySelectedVideoID);
            setTimeout(function(){
                waitForIframe();
            }, 50)
        }

        else if(player && player.B){
            console.log("!!IFRAME READY!!", player)
            console.log("player.B", player.B)
            console.log("INIT APP")
            iframeRight = $('#mainVideo').position().left + $('#mainVideo').width();
            $('.lightBoxMode').css('left', iframeRight + 'px');
            initApp();
            return
        }

        else{
            iFrameLoadTries++;
            console.log("IFRAME NOT READY", player)
            setTimeout(function(){
                waitForIframe();
            }, 50)
        }
    }
    waitForIframe();
});

function initiateUser() {
    // access_database.read_channels_by_user_id()
    var numSubscribedChannels = 0;
    var updatedChannels = 0;
    $.ajax({
        url: './script/api_calls_to_db/access_database/access.php ',
        method: 'POST',
        dataType: 'JSON',
        data: {
            action: 'read_channels_by_user_id',
        },
        success: function (data) {
            if (data.success) {
                console.log('USER CTU', data);
                const uLink = 'www.thecubetube.com/?user=' + data.user_link;
                const britEyesOnly = $('<span>',{
                    'class': 'linkGhost',
                    'text': uLink
                }).css({
                    position: 'absolute',
                    display: 'none'
                });
                $('body').append(britEyesOnly);
                $('.contentPlaceholderWrapper').fadeOut(1000, function () {
                    $('#text-carousel, .videoHeader, .listDropWrap').slideDown(1100);
                    toastMsg('Welcome back', 3000);
                });
                numSubscribedChannels = data.data.length;
                for (var i = 0; i < data.data.length; i++) {

                    clientSubscribedChannelIds.push(data.data[i].youtube_channel_id);
                    clientSelectedChannelIds.push(data.data[i].youtube_channel_id);

                    clientSubscribedChannelObjects.push(data.data[i]);
                    clientSelectedChannelObjects.push(data.data[i]);

                    // update Channel
                    $.ajax({
                        url:'./script/api_calls_to_db/access_database/access.php',
                        method:'post',
                        dataType:'JSON',
                        data:{
                            action:'update_video_list',
                            youtube_channel_id: data.data[0].youtube_channel_id,
                            last_channel_pull: data.data[0].last_channel_pull
                        },
                        success: function (data) {
                            console.log("INIT CHANNEL UPDATE", data)
                            updatedChannels ++;
                            if(numSubscribedChannels === updatedChannels){
                                loadSelectedChannels();
                                renderChannelSelectionDropdown();
                            }

                            if (data.success) {
                                console.log('Channel Updated', data);
                            }
                        },
                        errors: function (data) {
                            console.log("ERROR", data);
                        }
                    })
                }
            } else {
                console.log(data);
            }
        },
        errors: function (data) {
            console.log('read error', data);
        }
    });
}