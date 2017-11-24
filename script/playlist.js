var playlistVideoObjectArray = [

];

function loadNextPlaylistVideo(){
    if(playlistVideoObjectArray.length){






        updateVideoInfoPopover(playlistVideoObjectArray[0].youtube_video_id);
        updateChannelInfoPopover (playlistVideoObjectArray[0].youtube_channel_id);
        playlistVideoObjectArray.splice(0, 1);
    }
}