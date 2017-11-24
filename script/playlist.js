var playlistVideoObjectArray = [

];

function handleAddToPlaylist(){
    console.log(this)
    console.log($(this).parent().parent().youtube_video_id)
    console.log($(this).parent().parent().youtube_video_id)


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