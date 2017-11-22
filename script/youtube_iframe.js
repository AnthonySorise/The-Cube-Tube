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

function getAutoPlayValue() {
    return $("#autoplayCheckBox").is(":checked")
}

function checkIfPlayerIsMuted() {
    if (player.isMuted()) {
        player2.mute();
    } else {
        player2.unMute();
        currentVolumeLevel = player.getVolume();
        player2.setVolume(currentVolumeLevel);
    }
}

function checkIfPlayer2IsMuted() {
    if (player2.isMuted()) {
        player.mute();
    } else {
        player.unMute();
        currentVolumeLevel = player2.getVolume();
        player.setVolume(currentVolumeLevel);
    }
}

/*******needed for iframe player*******/
let iframeRight = 0;
$(window).resize(function () {
    iframeRight = $('#mainVideo').position().left + $('#mainVideo').width();
    $('.lightBoxMode').css('left', iframeRight + 'px');
});

function rendertheatreControls() {
    var rewindElement = $('<i>', {
        class: "fa fa-undo modalControls rewindButton",
        ["data-toggle"]: "tooltip",
        ["data-placement"]: "left",
        ["data-container"]: "body",
        title: "Rewind 15s"
    });
    var playElement = $('<i>', {
        class: "fa fa-play modalControls playButton",
    });
    var fastForwardElement = $('<i>', {
        class: "fa fa-repeat modalControls fastForwardButton",
        ["data-toggle"]: "tooltip",
        ["data-placement"]: "right",
        ["data-container"]: "body",
        title: "Fast Forward 15s"
    });
    var closeButton = $('<button>', {
        class: "btn btn-danger modalClose theatreModalClose",
        text: "close",
        type: "button"
    });
    $('#lightBoxModalFooter').append(rewindElement, playElement, fastForwardElement, closeButton);
}