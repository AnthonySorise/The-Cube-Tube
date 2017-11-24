var playlistVideoObjectArray = [

];


function handleAddToPlaylist(){
    var videoToAdd = $(this).parent().parent().attr("videoID")
    playlistVideoObjectArray.push(videoToAdd)
    var row = $(this).parent().parent()

    $(this).find("i").toggleClass('fa-plus-square fa-check-square-o')
    $(this).find(".tdPlaylistNum").text(playlistVideoObjectArray[playlistVideoObjectArray.length-1])
}



function playNextPlaylistVideo(){
    if(playlistVideoObjectArray.length){

        var nextVideoIdToLoad = playlistVideoObjectArray[0].youtube_video_id;

        updateVideoInfoPopover(nextVideoIdToLoad);
        updateChannelInfoPopover (nextVideoIdToLoad);

        if (getAutoPlayValue()) {
            player.loadVideoById(nextVideoIdToLoad);
        } else {
            player.cueVideoById(nextVideoIdToLoad);
        }

        currentlySelectedVideoID = nextVideoIdToLoad;
        $(".tdList").removeClass('selectedTd');
        $('i').removeClass('fa-circle-o-notch fa-spin fa-fw');
        $("[videoid='" + currentlySelectedVideoID + "'] span:first").before('<i>');
        $("[videoid='" + currentlySelectedVideoID + "'] i:first").addClass('fa fa-circle-o-notch fa-spin fa-fw').css({
            "margin-right": '5px',
            'color': 'green'
        });
        $("[videoid='" + currentlySelectedVideoID + "']").addClass('selectedTd');

        playlistVideoObjectArray.splice(0, 1);
    }
}