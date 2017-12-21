var firstScriptTag = document.getElementsByTagName('script')[0];
var videoObjectsToLoad = null;
var clientSelectedChannelObjects = [];
var clientSelectedChannelIds = [];
var clientSubscribedChannelIds = [];
var clientSubscribedChannelObjects = [];
var currentSlideNumber = 1;
var browsingMode = false;
const playFaClass = "fa fa-play fa-3x modalControls playButton";
const pauseFaClass = "fa fa-pause modalControls pauseButton";
const faSpinCircle = 'fa-circle-o-notch fa-fw fa-spin';
const faPauseIcon = 'fa-pause-circle-o fa-fw';
var reversePlayDirection = false;
var player;
var currentlySelectedVideoID = null;

$(document).ready(function () {
    function initApp(){
        
        pausePlayWithSpacebar(); // instantiates keyboard control of video
        $("#text-carousel, .videoHeader, .listDropWrap, .listUpWrap").hide();

        rendertheatreControls(); // show theatre controls on page load
        displayCurrentPageNumber();
        /**
         function for preventing page refresh with search button;
         only did it because page refresh was annoying
         **/
        $('#midNav-option form button').on('click, tap', function (event) {
            event.preventDefault();
        });

        tooltipFunctions();
        clickHandler();

        $('#text-carousel').on('slide.bs.carousel', function (ev) {
            //Checks if there is not enough videos to fill up to a second page to not turn page
            if($('#tdList-20').attr('videoID') === '') {
                ev.preventDefault();
                return;
            } else if ($('#tdList-40').attr('videoID') === '' && currentSlideNumber % 2 === 0 && ev.direction === 'left') {
                ev.preventDefault();
                return;
            }
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
        initiateUser();
    }

    var iFrameLoadTries = 0;
    function waitForIframe(){
        if(iFrameLoadTries > 50){
            iFrameLoadTries = 0;
            player = null;
            onYouTubeIframeAPIReady(currentlySelectedVideoID);
            setTimeout(function(){
                waitForIframe();
            }, 50)
        }

        else if(player && player.B){
            iframeRight = $('#mainVideo').position().left + $('#mainVideo').width();
            $('.lightBoxMode').css('left', iframeRight + 'px');
            initApp();
            return
        }

        else{
            iFrameLoadTries++;
            setTimeout(function(){
                waitForIframe();
            }, 50)
        }
    }
    waitForIframe();

    const mainContentHeight = window.innerHeight - $('#mainNav').height();
    $('.main-content').css('height', mainContentHeight);
    const listContentHeight = window.innerHeight - ($('#mainNav').height()+$('.videoRowWrapper').height());
    $('#listContentWrap').css('height', listContentHeight);
});
$(window).resize(()=>{
    if(window.innerHeight > 600){
        const mainContentHeight = window.innerHeight - $('#mainNav').height();
        $('.main-content').css('height', mainContentHeight-5);
        const listContentHeight = window.innerHeight - ($('#mainNav').height()+$('.videoRowWrapper').height());
        $('#listContentWrap').css('height', listContentHeight-5);
    }
    
});

function initiateUser() {
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
                const uLink = 'www.thecubetube.com/?user=' + data.user_link;
                const uLinkForCopy = $('<span>',{
                    'class': 'linkGhost',
                    'text': uLink
                }).css({
                    position: 'absolute',
                    display: 'none'
                });
                $('body').append(uLinkForCopy);
                $('.contentPlaceholderWrapper').fadeOut(1000, function () {
                    $('#text-carousel, .videoHeader, .listDropWrap').slideDown(1100);
                    toastMsg('Welcome Back', 2000);
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
                            updatedChannels ++;
                            if(numSubscribedChannels === updatedChannels){
                                //read categories
                                $.ajax({
                                    url: './script/api_calls_to_db/access_database/access.php',
                                    method: 'POST',
                                    dataType: 'JSON',
                                    data: {
                                        action: 'read_categories_by_user',
                                    },
                                    success: function (data) {
                                        if (data.success){
                                            for (var i = 0; i < data.data.length; i++){
                                                var catName = data.data[i].category_name;
                                                if(!clientCategories.hasOwnProperty(catName)){
                                                    clientCategories[catName] = [];
                                                }
                                                clientCategories[catName].push(data.data[i].youtube_channel_id)
                                            }
                                        }else{
                                        }
                                        loadSelectedChannels();
                                        renderChannelSelectionDropdown();
                                    },
                                    errors: function (data) {
                                    }
                                })
                            }
                        },
                        errors: function (data) {
                        }
                    })
                }
            } else {
            }
        },
        errors: function (data) {
        }
    });
}