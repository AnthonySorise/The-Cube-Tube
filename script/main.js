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
var player2;
var videoID = null;
var nextVideoIdToLoad = null;

$(document).ready(function () {
    function initApp(){
        $("#text-carousel").hide()
        $(".videoHeader").hide()

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

        $('#text-carousel').on('slide.bs.carousel', function (ev) {
            console.log(ev)
            if (ev.direction == 'left') {
                currentSlideNumber++
                loadNextPage();
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
            onYouTubeIframeAPIReady(videoID);
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
                $('.contentPlaceholderWrapper').fadeOut(1000, function () {
                    $('#text-carousel, .videoHeader').slideDown(1100);
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