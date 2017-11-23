var playlistArray = [
    
];

firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady(vidId) {
    console.log("onYouTubeIframeAPIReady CALLED", player);
    player = new YT.Player('mainVideo', {
        videoId: vidId || 'lrzIR8seNXs',
        playerVars: {
            'rel': 0
        },
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
    // onYouTubeIframeAPIReady2();
}

// function onYouTubeIframeAPIReady2() {
//     player2 = new YT.Player('theaterVideo', {
//         videoId: 'lrzIR8seNXs',
//         playerVars: {
//             'rel': 0,
//         },
//         events: {
//             'onStateChange': onPlayerStateChange
//         }
//
//     });
// }

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        $('.playButton').removeClass(play).toggleClass(pause);
        

    } else if (event.data == YT.PlayerState.PAUSED) {
        $('.pauseButton').removeClass(pause).toggleClass(play);
    }

     //Testing to get auto play to reverse order but using autoplay off to test but will implement button later to reverse auto play
     if (event.data == YT.PlayerState.ENDED && !getAutoPlayDirectionValue()) {
        console.log('autoplay is off');
        currentVideoindex = videoObjectsToLoad.findIndex(x => x.youtube_video_id == currentlySelectedVideoID);
        if (videoObjectsToLoad.length <= currentVideoindex - 1) {
            $.when(loadPrevPage()).then(playPrevYTVideo);
            $('.carousel').carousel('prev');
        }
        else if (videoObjectsToLoad.length % 20 === 0 && (currentVideoindex - 1) % 20 === 0) {
            $('.carousel').carousel('prev');
            playPrevYTVideo();
        } else {
            playPrevYTVideo();
        }

    }

   
    if (event.data == YT.PlayerState.ENDED && getAutoPlayDirectionValue()) {
        if(playlistArray.length > 0) {
            var playlistVideoId = playlistArray[0];
            var videoObjArray = videoObjectsToLoad.length;
            player.loadVideoById(playlistVideoId);
           while(videoObjArray--) {
               if(videoObjectsToLoad[videoObjArray].youtube_video_id === playlistVideoId) {
                   console.log('Found channel id');
                   var playlistChannelId = videoObjectsToLoad[videoObjArray].youtube_channel_id;
               }
           }
            //Added Anthony function to get video info to update the video/channel info popover 
            updateVideoInfoPopover(playlistVideoId);
            updateChannelInfoPopover (playlistChannelId)
            playlistArray.splice(0, 1);
            return;
        }
        currentVideoindex = videoObjectsToLoad.findIndex(x => x.youtube_video_id == currentlySelectedVideoID);
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
    var currentVideoIndex = videoObjectsToLoad.findIndex(x => x.youtube_video_id === currentlySelectedVideoID);

    // if(currentVideoIndex === 40 && )

    var nextVideoIdToLoad = videoObjectsToLoad[currentVideoIndex + 1].youtube_video_id;

    updateVideoInfoPopover(nextVideoIdToLoad);
    updateChannelInfoPopover (videoObjectsToLoad[currentVideoIndex+1].youtube_channel_id);

    if (getAutoPlayValue()) {
        player.loadVideoById(nextVideoIdToLoad);
    } else {
        player.cueVideoById(nextVideoIdToLoad);
    }
    // player2.cueVideoById(nextVideoIdToLoad);
    currentlySelectedVideoID = nextVideoIdToLoad;

    $(".tdList").removeClass('selectedTd');
    $('i').removeClass('fa-circle-o-notch fa-spin fa-fw');
    $("[videoid='" + currentlySelectedVideoID + "'] span:first").before('<i>');
    $("[videoid='" + currentlySelectedVideoID + "'] i:first").addClass('fa fa-circle-o-notch fa-spin fa-fw').css({
        "margin-right": '5px',
        'color': 'green'
    });
    $("[videoid='" + currentlySelectedVideoID + "']").addClass('selectedTd');
}

function playPrevYTVideo() {
    var currentVideoIndex = videoObjectsToLoad.findIndex(x => x.youtube_video_id === currentlySelectedVideoID);

    if(currentVideoIndex === 0 && videoObjectsToLoad.length === 40){
        return
    }

    var nextVideoIdToLoad = videoObjectsToLoad[currentVideoIndex - 1].youtube_video_id;

    updateVideoInfoPopover(nextVideoIdToLoad);
    updateChannelInfoPopover (videoObjectsToLoad[currentVideoIndex-1].youtube_channel_id);

    if (getAutoPlayValue()) {
        player.loadVideoById(nextVideoIdToLoad);
    } else {
        player.cueVideoById(nextVideoIdToLoad);
    }
    // player2.cueVideoById(nextVideoIdToLoad);
    currentlySelectedVideoID = nextVideoIdToLoad;

    $(".tdList").removeClass('selectedTd');
    $('i').removeClass('fa-circle-o-notch fa-spin fa-fw');
    $("[videoid='" + currentlySelectedVideoID + "'] span:first").before('<i>');
    $("[videoid='" + currentlySelectedVideoID + "'] i:first").addClass('fa fa-circle-o-notch fa-spin fa-fw').css({
        "margin-right": '5px',
        'color': 'green'
    });
    $("[videoid='" + currentlySelectedVideoID + "']").addClass('selectedTd');
}

function getAutoPlayValue() {
    return $("#autoplayCheckBox").is(":checked")
}

function getAutoPlayDirectionValue(){
    return $("#autoplayOrderCheckBox").is(":checked")
}

// function checkIfPlayerIsMuted() {
//     if (player.isMuted()) {
//         player2.mute();
//     } else {
//         player2.unMute();
//         currentVolumeLevel = player.getVolume();
//         player2.setVolume(currentVolumeLevel);
//     }
// }
//
// function checkIfPlayer2IsMuted() {
//     if (player2.isMuted()) {
//         player.mute();
//     } else {
//         player.unMute();
//         currentVolumeLevel = player2.getVolume();
//         player.setVolume(currentVolumeLevel);
//     }
// }

/*******needed for iframe player*******/
let iframeRight = 0;
$(window).resize(function () {
    iframeRight = $('#mainVideo').position().left + $('#mainVideo').width();
    $('.lightBoxMode').css('left', iframeRight + 'px');
});

function rendertheatreControls() {
    var lastVideoElement = $('<i>', {
        class: "fa fa-backward modalControls lastVideoButton",
        ["data-toggle"]: "tooltip",
        ["data-placement"]: "left",
        ["data-container"]: "body",
        title: "Previous Video"
    });
    var rewindElement = $('<i>', {
        class: "fa fa-undo modalControls rewindButton",
        ["data-toggle"]: "tooltip",
        ["data-placement"]: "bottom",
        ["data-container"]: "body",
        title: "Rewind 15s"
    });
    var playElement = $('<i>', {
        class: "fa fa-play modalControls playButton",
        ["data-toggle"]: "tooltip",
        ["data-placement"]: "bottom",
        ["data-container"]: "body",
        title: "Play"
    });
    var fastForwardElement = $('<i>', {
        class: "fa fa-repeat modalControls fastForwardButton",
        ["data-toggle"]: "tooltip",
        ["data-placement"]: "bottom",
        ["data-container"]: "body",
        title: "Fast Forward 15s"
    });
    var nextVideoElement = $('<i>', {
        class: "fa fa-forward modalControls nextVideoButton",
        ["data-toggle"]: "tooltip",
        ["data-placement"]: "right",
        ["data-container"]: "body",
        title: "Next Video"
    });
    


    var closeButton = $('<button>', {
        class: "btn btn-danger modalClose theatreModalClose",
        text: "close",
        type: "button"
    });
    // $('#lightBoxModalFooter').append(rewindElement, playElement, fastForwardElement, closeButton);
    $('.mediaControls').append(lastVideoElement, rewindElement, playElement, fastForwardElement, nextVideoElement);
    
}


