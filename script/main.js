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
var ytPlaying = false;
var play = "fa fa-play modalControls playButton";
var pause = "fa fa-pause modalControls pauseButton";
var player;
var player2;
var videoID = null;
var nextVideoIdToLoad = null;

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


$(document).ready(function () {
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
});

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
    $('#videoStats .fa-bar-chart').mouseenter(function () {
        setTimeout(function () {
            $('#videoStats .fa-bar-chart').tooltip('hide');
        }, 1000);
    });
    $('#channelInfo .fa-list-alt').mouseenter(function () {
        setTimeout(function () {
            $('#channelInfo .fa-list-alt').tooltip('hide');
        }, 1000);
    });
}

//Click handler to console log search results
function clickHandler() {
    $('.channelDropDown').on('click touchend', '.dropdownChannelLiLoad', () => {
        browsingMode = false;
        // returnToPageOne();
        compileSelectedChannelsFromDropdown();
        clearVideoList();

        if (window.innerWidth < 500) {
            closeChannelDrop();
        } else {
            $('mainNav-option').removeClass('in')
                .attr('aria-expanded', 'false');
            $('.channelDropDown').removeClass('open');
        }

        var numUpdated = 0;
        for(var i = 0; i<clientSelectedChannelObjects.length; i++){
            $.ajax({
                url:'./script/api_calls_to_db/access_database/access.php',
                method:'post',
                dataType:'JSON',
                data:{
                    action:'update_video_list',
                    youtube_channel_id:clientSelectedChannelObjects[i].youtube_channel_id,
                    last_channel_pull:clientSelectedChannelObjects[i].last_channel_pull
                },
                success: function (data) {
                    console.log("UPDATED", data)
                    numUpdated++;
                    if(numUpdated === clientSelectedChannelObjects.length){
                        console.log("UPDATED DONE");
                        returnToPageOne();
                        loadSelectedChannels();
                    }
                    if (data.success) {
                        console.log('Channel Updated', data);
                    }
                },
                errors: function (data) {
                    console.log('insert error', data);
                }
            })

        }

    });

    $(".dropdownChannelLiAll").on("click", function () {
        browsingMode = false;
        clientSelectedChannelIds = deepCopy(clientSubscribedChannelIds);
        clientSelectedChannelObjects = deepCopy(clientSubscribedChannelObjects);
        // returnToPageOne();
        renderChannelSelectionDropdown();
        clearVideoList();

        if (window.innerWidth < 500) {
            closeChannelDrop();
        } else {
            $('mainNav-option').removeClass('in')
                .attr('aria-expanded', 'false');
            $('.channelDropDown').removeClass('open');
            dropOpened = false;
        }

        var numUpdated = 0;
        for(var i = 0; i<clientSubscribedChannelObjects.length; i++){
            $.ajax({
                url:'./script/api_calls_to_db/access_database/access.php',
                method:'post',
                dataType:'JSON',
                data:{
                    action:'update_video_list',
                    youtube_channel_id:clientSubscribedChannelObjects[i].youtube_channel_id,
                    last_channel_pull:clientSubscribedChannelObjects[i].last_channel_pull
                },
                success: function (data) {
                    console.log("UPDATED", data)
                    numUpdated++;
                    if(numUpdated === clientSubscribedChannelObjects.length){
                        console.log("UPDATED DONE");
                        returnToPageOne();
                        loadSelectedChannels();
                    }
                    if (data.success) {
                        console.log('Channel Updated', data);
                    }
                },
                errors: function (data) {
                    console.log('insert error', data);
                }
            })

        }

    });

    $('#channelCategoryUl').on('click touchend', '.channelLiChannel, .dropdownChannelLi input', (e) => {
        if ($(e.target).is('input')) {
            return;
        } else {
            let input = $(e.target).children('input');
            if (input[0].checked == true) {
                input[0].checked = false;
            } else if (input[0].checked == false) {
                input[0].checked = true;
            }
        }
    });
    $('a.dropdown-toggle').on('click touchend', () => {
        $('.channelDropDown').toggleClass('open');
        if (dropOpened) {
            dropOpened = false;
        } else {
            setTimeout(() => {
                dropOpened = true;
            }, 300);
        }
    });
    //Search Button
    $('.channelSearchForm').on('click touchend', '.channelSearchButton', (e) => {
        e.preventDefault();
        $('.channelSearchForm').submit();
    });

    $(".channelSearchForm").submit(function (event) {
        event.preventDefault();
        let inputStr = '';
        if ($(event.target).find('input').val() === "") {
            return;     //prevent empty input
        } else {
            inputStr = $(event.target).find('input').val();
        }
        $(".navbar-collapse").collapse('hide');
        searchChannelsByName(inputStr).then(worked, failed);
        // $(".contentPlaceholder").hide();
        $('.contentPlaceholderWrapper').fadeOut(1000, function () {
            $('#text-carousel, .videoHeader').slideDown(1100);
        });
        // $("#text-carousel").show()
        // $(".videoHeader").show()
    });
    //Browse Button
    $('.browseChannelButton').on("click touchend", handleBrowseButton);

    //Add Buttons
    $('.addChannelButton').on("click touchend", handleAddButton);

    //Table List Rows that are unselected
    $(".tdTitle, .tdChannel, .tdUpDate").on("click touchend", function () {


        if (!$(this).parent().hasClass('selectedTd')) {
            $(".tdTitle, .tdChannel").unbind("mouseup");
            //Table List Row Title that is selected
            $(".tdTitle").mouseup(function () {
                if ($(this).parent().hasClass('selectedTd')) {
                    // $("#videoStats").focus().click()
                    $("#videoStats").trigger('focus')
                }
            });

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
            } else {
                player.cueVideoById(selectedVideoId);
            }
            player2.cueVideoById(selectedVideoId);

            //update video stats popover
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
                    let videoStatsDiv = $('<div></div>');
                    videoStatsDiv.css("height", '35vh')
                    let videoURL = 'https://i.ytimg.com/vi/' + selectedVideoId + '/mqdefault.jpg';
                    const videoThumbnail = $('<img>').attr('src', videoURL).css({
                        width: '120px',
                        height: '70px',
                    });
                    videoThumbnail.css("position", "relative")
                        .css("left", "50%")
                        .css("transform", "translateX(-50%)")
                        .css("margin-bottom", '15px');

                    const views = $('<p><strong>Views: </strong>' + parseInt(data.items[0].statistics.viewCount).toLocaleString("en-us") + '</p>');

                    const likes = parseInt(data.items[0].statistics.likeCount);
                    const dislikes = parseInt(data.items[0].statistics.dislikeCount);

                    const perecentLikes = likes / (likes + dislikes) * 100;
                    const percentDislikes = 100 - perecentLikes;

                    const likesTitle = $('<p><strong>Likes and Dislikes:</strong></p>');
                    let likesBar = null;

                    if (likes > dislikes) {
                        likesBar = $('<div class="progress"><div class="progress-bar progress-bar-success" style="width:' + perecentLikes + '%">' + likes.toLocaleString("en-us") + ' Likes</div><div class="progress-bar progress-bar-danger" style="width:' + percentDislikes + '%"></div>');
                    }
                    else {
                        likesBar = $('<div class="progress"><div class="progress-bar progress-bar-success" style="width:' + perecentLikes + '%"></div><div class="progress-bar progress-bar-danger" style="width:' + percentDislikes + '%">' + dislikes.toLocaleString("en-us") + ' Dislikes</div>');
                    }

                    const descriptionTitle = $('<p><strong>Description: </strong></p>');

                    const descriptionContainer = $('<div></div>');
                    descriptionContainer.css("height", "13vh");
                    descriptionContainer.css("overflow-y", "auto")
                    const description = $('<p>' + data.items[0].snippet.description + '</p>');
                    descriptionContainer.append(description);
                    videoStatsDiv.append(videoThumbnail, views, likesTitle, likesBar, descriptionTitle, descriptionContainer);
                    $("#videoStats").popover('destroy');
                    setTimeout(function () {
                        $("#videoStats").popover({
                            html: true,
                            content: videoStatsDiv,
                            placement: 'top',
                            container: 'body'
                        });
                    }, 350);
                    $("#videoStats").attr({
                        'data-original-title': data.items[0].snippet.title
                    });
                },
                error: function (data) {
                    console.log('something went wrong with YT', data);
                }
            });
            //update channel stats popover
            $.ajax({
                url: 'https://www.googleapis.com/youtube/v3/channels',
                dataType: 'json',
                method: 'get',
                data: {
                    key: "AIzaSyAOr3VvEDRdI5u9KGTrsJ7usMsG5FWcl6s",
                    id: channelID,
                    part: 'snippet, statistics'
                },
                success: function (data) {
                    console.log('Youtube success', data);
                    let channelInfoDiv = $("<div></div>");

                    const channelThumbnail = $('<img>').attr('src', data.items[0].snippet.thumbnails.medium.url).css({
                        width: '70px',
                        height: '70px',
                    });
                    channelThumbnail.css("position", "relative")
                        .css("left", "50%")
                        .css("transform", "translateX(-50%)")
                        .css("margin-bottom", '15px');

                    var subscriberCount = $('<p><strong>Subscribers: </strong>' + parseInt(data.items[0].statistics.subscriberCount).toLocaleString("en-us") + '</p>');

                    const descriptionTitle = $('<p><strong>Description: </strong></p>');

                    const descriptionContainer = $('<div></div>');
                    descriptionContainer.css("height", "21.75vh");
                    descriptionContainer.css("overflow-y", "auto")
                    const description = $('<p>' + data.items[0].snippet.description + '</p>');
                    descriptionContainer.append(description);


                    channelInfoDiv.append(channelThumbnail, subscriberCount, descriptionTitle, descriptionContainer);

                    $("#channelInfo").popover('destroy');
                    setTimeout(function () {
                        $("#channelInfo").popover({
                            html: true,
                            content: channelInfoDiv,
                            placement: 'top',
                            container: 'body'
                        });
                    }, 250);
                    $("#channelInfo").attr({
                        'data-original-title': data.items[0].snippet.title
                    });


                },
                error: function (data) {
                    console.log('something went wrong with YT', data);
                }
            })

        }
    });

    //Theater mode
    $('.lightBoxMode').on('click', checkHomePageVideoStatus);
    $('.theatreModalClose').on('click', checkTheatreModeStatus);
    $('.fastForwardButton').on('click', fastForwardVideo);
    $('.rewindButton').on('click', rewindVideo);
    $('.playButton').on('click', playYtVideo);
    // $('body').on('click', closeTheatreOnClick);
    $(document).on('keyup', function (event) {
        if (event.keyCode === 27 && $('body').hasClass('modal-open')) {
            console.log('Esc was pressed');
            checkTheatreModeStatus();
        }
    })

    // Lets user click outside of theatre modal to close and save the state of video
    function closeTheatreOnClick(event) {
        event.stopPropagation();
        if($('body').hasClass('modal-open')) {
            //Have to check if modal footer is being clicked to stop from closing modal
            if(event.target.classList[0] == "fa" || event.target.classList == "") {
                return;
            }
            $('.modal-content').modal('hide');
            checkTheatreModeStatus();
        }
    }

    function checkHomePageVideoStatus(event) {
        event.stopPropagation()
        player.pauseVideo();
        if (player.getPlayerState() === 2) {
            checkIfPlayerIsMuted();
            player.pauseVideo();
            player2.seekTo(player.getCurrentTime());
            player2.pauseVideo();
            $('.pauseButton').removeClass().addClass(play);
            $('#lightBoxModal').modal('show');
        } else if (player.getPlayerState() === 1) {
            checkIfPlayerIsMuted();
            player.pauseVideo();
            player2.seekTo(player.getCurrentTime());
            $('.playButton').removeClass().addClass(pause);
            player2.playVideo();
            $('#lightBoxModal').modal('show');
        } else if (player.getPlayerState() === 5) {
            $('#lightBoxModal').modal('show');
        }
    }

    function checkTheatreModeStatus() {
        if (player2.getPlayerState() === 2) {
            checkIfPlayer2IsMuted();
            player2.pauseVideo();
            player.seekTo(player2.getCurrentTime());
            player.pauseVideo();
            $('#lightBoxModal').modal('hide');
        } else if (player2.getPlayerState() === 1) {
            checkIfPlayer2IsMuted();
            player2.pauseVideo();
            player.seekTo(player2.getCurrentTime());
            $('#lightBoxModal').modal('hide');
            player.playVideo();
        } else if (player2.getPlayerState() === 5) {
            $('#lightBoxModal').modal('hide');
        }
    }

    function fastForwardVideo() {
        var fastForward = player2.getCurrentTime();
        var add15Seconds = fastForward + 15;
        var player2State = player2.getPlayerState();
        if (player2State === 2) {
            player2.seekTo(add15Seconds);
            player2.pauseVideo();
            return;
        } else {
            player2.seekTo(add15Seconds);

        }

    }
    function playYtVideo() {
        player2.playVideo();
        if (this.classList.value === play) {
            $('.playButton').removeClass(play).toggleClass(pause);
        } else {
            $('.pauseButton').removeClass(pause).toggleClass(play);
            player2.pauseVideo()

        }
    }
    function rewindVideo() {
        var fastForward = player2.getCurrentTime();
        var minus15Seconds = fastForward - 15;
        var player2State = player2.getPlayerState();
        if (player2State === 2) {
            player2.seekTo(minus15Seconds);
            player2.pauseVideo();
            return;
        } else {
            player2.seekTo(minus15Seconds);
        }

    }
}

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



//Channel Search by Name
function searchChannelsByName(inputStr) {
    $(".addChannelButton").removeClass("disabled").text("Subscribe");
    let string = inputStr;
    // if($('.channelSearchInput:odd').val()!==""){
    //     string = $('.channelSearchInput:odd').val();
    // }else if($('.channelSearchInput:even').val()!==""){
    //     string = $('.channelSearchInput:even').val();
    // }else{
    //     string='';
    // }
    $('.channelSearchInput').val('');
    // var string = $('.channelSearchInput').val();
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
            console.log('searchChannelsByName success', data);
            $('#channelSearchModal').modal('show');
            clearChannelResults();
            for (var i = 0; i < data.items.length; i++) {
                let channelListData = "#chSearch-" + (i + 1);
                let chName = channelListData + " .chName";
                let img = channelListData + " img";
                $(channelListData).show();
                $(channelListData).attr("channelId", data.items[i].snippet.channelId);
                $(chName).text(data.items[i].snippet.channelTitle);
                $(img).attr("src", data.items[i].snippet.thumbnails.medium.url);

                if (clientSubscribedChannelIds.includes(data.items[i].snippet.channelId)) {
                    $(channelListData + " .addChannelButton").addClass("disabled").text("Subscribed");
                }
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
    if ($("#chSearch-" + (i + 1) + ">h4>span").text() !== "") {
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
                console.log('renderChannelSearchStats success', data);
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
        });
    }
}

function clearChannelResults() {
    for (var i = 0; i < 10; i++) {
        let channelListData = "#chSearch-" + (i + 1);
        let chName = channelListData + " .chName";
        let img = channelListData + " img";
        let chSub = "#chSearch-" + (i + 1) + " .chSub";
        let chDesc = "#chSearch-" + (i + 1) + " .chInfoButton";
        $(channelListData).attr("channelId", "");
        $(chName).text("");
        $(img).attr("src", "");
        $(chSub).text("");
        $(chDesc).attr({
            "data-original-title": "",
            "data-content": ""
        });

        $(channelListData).css("display", 'none')
    }
}

function clearVideoList() {
    $(".tdList").popover('destroy');

    $('.tdList').attr("videoID", "");
    $('.tdTitle>span').text("");
    $('.tdChannel').text("");
    $('.tdUpDate').text("");
    $('.tdInfo a').attr({
        'data-content': "",
        'data-original-title': ""
    });
    $('.tdList').hide();
}

function renderChannelSelectionDropdown() {
    $(".dropdownChannelLi").remove();

    //sort by name
    clientSubscribedChannelObjects.sort(function (a, b) {
        if (a.channel_title.toLowerCase() < b.channel_title.toLowerCase()) {
            return -1
        }
        if (a.channel_title.toLowerCase() > b.channel_title.toLowerCase()) {
            return 1
        }

    });

    //render to dropdown
    for (var i = 0; i < clientSubscribedChannelObjects.length; i++) {

        let channelLi = $('<li>', {
            'class': 'dropdownChannelLi row'
        });

        //let channelSettings = $("<div style='display: inline-block'><a class='btn hidden-xs' role='button' data-trigger='focus' data-container='body' data-toggle='popover'><i class='fa fa-cog fa-lg'></i></a></div>")
        const cog = $('<i>', {
            class: 'fa fa-cog'
        });

        // var settingsContent = $('<div channelId='+clientSubscribedChannelObjects[i].youtube_channel_id+'>');
        var settingsContent = $('<div>', {
            'channelId': clientSubscribedChannelObjects[i].youtube_channel_id
        });

        var browseButton = $('<button class="btn-primary">Browse</button>').css("display", "block");
        var removeButton = $('<button class="btn-danger">Unsubscribe</button>').css("display", "block").css("margin-top", "5px");

        browseButton.on("click touchend", handleBrowseButton)


        removeButton.on("click touchend", handleRemoveButton)

        settingsContent.append(browseButton, removeButton);

        let channelSettingsButton = $('<a>').attr({
            'role': 'button',
            'class': 'dropdownSettingsPopover'
        }).css({
            padding: '0',
            'line-height': '180%'
        }).popover({
            html: true,
            'content': settingsContent,
            'placement': 'left',
            'container': 'body',
            'toggle': 'focus'
        }).append(cog);

        const channelSettingsSpan = $('<div>', {
            class: 'channelSettingButton col-xs-2 text-center'
        }).css({
            padding: '0'
        }).append(channelSettingsButton);

        let channelCheckbox = $('<input>').attr({
            'type': 'checkbox',
            'name': clientSubscribedChannelObjects[i].channel_title,
            'channel_id': clientSubscribedChannelObjects[i].youtube_channel_id,
            'class': 'dropdownChannel'
        });
        //check if channel is selected
        if (clientSelectedChannelIds.indexOf(clientSubscribedChannelObjects[i].youtube_channel_id) !== -1) {
            channelCheckbox.attr("checked", "checked")
        }
        let channelLiMain = $('<div>', {
            class: 'channelLiChannel col-xs-10'
        }).css({
            padding: '0',
            'overflow': 'hidden',
            'text-overflow': 'ellipsis',
            'white-space': 'nowrap',
            'line-height': '200%'
        }).text(clientSubscribedChannelObjects[i].channel_title);
        channelLiMain.prepend(channelCheckbox);
        // let channelText = $('<span style="display: inline-block" style="margin-left: 5px">').text(clientSubscribedChannelObjects[i].channel_title);

        channelLi.append(channelLiMain, channelSettingsSpan);

        $('#channelCategoryUl').append(channelLi);


        channelLi.append(channelSettingsSpan, channelLiMain);


        // $('#channelCategoryUl').append(channelLi)
        $('#dropdownChannelUl').append(channelLi);

    }
}

function compileSelectedChannelsFromDropdown() {
    var selectedInputs = $(".dropdownChannel:checked")
    clientSelectedChannelIds = [];
    for (var i = 0; i < selectedInputs.length; i++) {
        clientSelectedChannelIds.push($(selectedInputs[i]).attr("channel_id"))
    }
    clientSelectedChannelObjects = [];
    for (var i = 0; i < clientSubscribedChannelObjects.length; i++) {
        if (clientSelectedChannelIds.indexOf(clientSubscribedChannelObjects[i].youtube_channel_id) !== -1) {
            clientSelectedChannelObjects.push(clientSubscribedChannelObjects[i])
        }
    }
}

function updateMidNavText(){
    if(browsingMode){
        $('.midNavBrowsing').show();
        $('.midNavWatching').hide();
        $(".browsingLabel").text(clientSelectedChannelObjects[0].channel_title)
        $(".midNavChannels>span").attr("channelId", clientSelectedChannelObjects[0].youtube_channel_id)

        if(clientSubscribedChannelIds.indexOf(clientSelectedChannelObjects[0].youtube_channel_id)!== -1){
            $(".midNavAddBtn").hide();
        }
        else{
            $(".midNavAddBtn").show();
        }

    }
    else{
        $('.midNavBrowsing').hide();
        $('.midNavWatching').show();
        var channelsWatching = "";
        for(var i = 0; i < clientSelectedChannelObjects.length; i++){
            channelsWatching += clientSelectedChannelObjects[i].channel_title;
            if(i !== clientSelectedChannelObjects.length-1 && clientSelectedChannelObjects.length !== 1){
                channelsWatching += ", "
            }
        }
        $(".midNavAddBtn").hide();
        $(".watchingLabel").attr("data-original-title", channelsWatching)
    }
}


function loadSelectedChannels() {
    $.ajax({    //RETRIEVE VIDEOS FROM DB
        url: './script/api_calls_to_db/access_database/access.php',
        method: 'POST',
        dataType: 'JSON',
        data: {
            action: 'read_videos_by_channel_array',
            channel_id_array: clientSelectedChannelIds,
            offset: 0
        },
        success: function (data) {
            if (data.success) {
                // promise.resolve(data);
                console.log('Videos Found', data);
                videoObjectsToLoad = [];
                videoObjectsToLoad = data.data;
                // returnToPageOne();
                clearVideoList();
                renderVideoList(videoObjectsToLoad);
                updateMidNavText()
            }
            else {
                console.log('Channel Found Without Videos', data)
            }
        },
        errors: function (data) {
            console.log(data['read errors'], data);
            // promise.reject(data);
        }
    })
}


function renderVideoList(videoArray) {
    if (videoObjectsToLoad === null) {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    }
    console.log("LOADING VIDEO LIST")
    clearVideoList();
    // returnToPageOne();

    for (let i = 0; i < videoArray.length; i++) {
        if (videoArray[i] === undefined) {
            return
        }

        let row = "#tdList-" + (i + 1);
        let title = row + " .tdTitle>span";
        let channel = row + " .tdChannel";
        let upDate = row + " .tdUpDate";

        let dateString = videoArray[i].published_at;

        if (checkIfAppleDevice()) {
            // let date = "2017-11-03 09:34:14" //testing only - sample data
            let newDate = dateString.split(" ");
            let removeTime = newDate[0].split("-")
            let newDateString = removeTime[1] + '/' + removeTime[2] + '/' + removeTime[0]
            dateString = newDateString
        } else {
            const d = new Date(dateString);
            dateString = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear().toString().substring(2);
        }
        // const d = new Date(dateString);
        // dateString = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear().toString().substring(2);

        $(row).show();

        $(row).attr("videoID", videoArray[i].youtube_video_id);
        $(row).attr("channelID", videoArray[i].youtube_channel_id);
        $(title).text(videoArray[i].video_title);
        $(channel).text(videoArray[i].channel_title);
        $(upDate).text(dateString);

    }
    resetSelectedTd();
    //update thumbnail hover popover
    setTimeout(function () {
        for (let i = 0; i < videoArray.length; i++) {
            let row = "#tdList-" + (i + 1);
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
            $(row).popover({
                trigger: "hover",
                html: true,
                content: videoDataImg,
                placement: 'auto',
                container: 'body'
            })
                .attr({
                    'data-original-title': videoArray[i].video_title
                });
        }
    }, 750);
}

function addChannelModal(userLink) {
    if (userLink) {
        $('.userLinkBody').text("Save this link!  www.TheCubeTube.com/?user=" + userLink);

        let button = $('<button>').addClass("btn").text("Copy Link");
        let linkSpan = $("<span>").addClass('glyphicon glyphicon-copy');

        button.append(linkSpan).click(copy_to_clipboard);
        $('.userLinkBody').append(button)
    }
    else {
        $('.userLinkBody').text("Channel added to your subscriptions!")
    }
    $('#userLinkModal').modal('show');
}

function copy_to_clipboard() {
    var textArea = document.createElement("textarea");
    textArea.style.background = 'transparent';
    textArea.value = $('.userLinkBody').text().slice(17,55);
    document.body.appendChild(textArea);
    textArea.select();
    var successful = document.execCommand('copy');
}

// function ytChannelApiToDb(channelId, isAdding = false) {
//     var channelDbObject = {};
//     $.ajax({
//         url: 'https://www.googleapis.com/youtube/v3/channels',
//         dataType: 'json',
//         method: 'get',
//         data: {
//             key: "AIzaSyAOr3VvEDRdI5u9KGTrsJ7usMsG5FWcl6s",
//             id: channelId,
//             part: 'snippet, statistics'
//         },
//         success: function (data) {
//             console.log('Youtube success', data);
//             channelDbObject.youtube_channel_id = channelId;
//             channelDbObject.channel_title = data.items[0].snippet.title;
//             channelDbObject.description = data.items[0].snippet.description;
//
//             var thumbnail = data.items[0].snippet.thumbnails.medium.url;
//             thumbnail = thumbnail.replace('https://yt3.ggpht.com/', '');
//             thumbnail = thumbnail.replace('/photo.jpg', '');
//             channelDbObject.thumbnail = thumbnail;
//
//             // access_database.insert_channel(channelDbObject);
//             $.ajax({
//                 url: './script/api_calls_to_db/access_database/access.php',
//                 method: 'post',
//                 dataType: 'JSON',
//                 data: {
//                     action: 'insert_channel',
//                     youtube_channel_id: channelDbObject.youtube_channel_id,
//                     channel_title: channelDbObject.channel_title,
//                     description: channelDbObject.description,
//                     thumbnail: channelDbObject.thumbnail
//                 },
//                 success: function (data) {
//                     if (data.success) {
//                         console.log('insert channel success', data);
//
//                         if (!isAdding) {
//                             clientSelectedChannelObjects = [];
//                         }
//                         else {
//                             var isDup = false;
//                             for (var i = 0; i < clientSubscribedChannelObjects.length; i++) {
//                                 if (clientSubscribedChannelObjects[i].youtube_channel_id === channelDbObject.youtube_channel_id) {
//                                     isDup = true
//                                 }
//                             }
//                             if (!isDup) {
//                                 clientSubscribedChannelObjects.push(channelDbObject);
//                             }
//
//                             $.ajax({
//                                 url: './script/api_calls_to_db/access_database/access.php',
//                                 method: 'post',
//                                 dataType: 'JSON',
//                                 data: {
//                                     action: 'insert_ctu',
//                                     youtube_channel_id: channelId
//                                 },
//                                 success: function (data) {
//                                     if (data.success) {
//                                         console.log('insert success', data);
//                                         addChannelModal(data.user_link)
//                                         renderChannelSelectionDropdown()
//                                     }
//                                 },
//                                 errors: function (data) {
//                                     console.log('insert error', data);
//                                 }
//                             })
//                         }
//                         clientSelectedChannelObjects.push(channelDbObject);
//                     }
//                 },
//                 errors: function (data) {
//                     console.log('insert error');
//                 }
//             })
//         },
//         error: function (data) {
//             console.log('something went wrong with YT', data);
//         }
//     });
// }
//
// function ytVideoApiToDb(channelId, pageToken = "", firstRun = true, isAdding = false) {
//     var packageToSendToDb = [];
//     $.ajax({
//         url: 'https://www.googleapis.com/youtube/v3/search',
//         dataType: 'json',
//         method: 'get',
//         data: {
//             key: "AIzaSyAOr3VvEDRdI5u9KGTrsJ7usMsG5FWcl6s",
//             channelId: channelId,
//             type: 'video',
//             order: 'date',
//             part: 'snippet',
//             maxResults: 50,
//             pageToken: pageToken
//         },
//         success: function (data) {
//             console.log('ytVideoApiToDb success', data);
//             for (var i = 0; i < data.items.length; i++) {
//                 var videoObject = {};
//                 videoObject.video_title = data.items[i].snippet.title;
//                 videoObject.youtube_video_id = data.items[i].id.videoId;
//                 videoObject.youtube_channel_id = data.items[i].snippet.channelId;
//                 videoObject.channel_title = data.items[i].snippet.channelTitle;
//                 videoObject.description = data.items[i].snippet.description;
//                 var publishedAt = data.items[i].snippet.publishedAt;
//                 publishedAt = publishedAt.replace("T", " ");
//                 publishedAt = publishedAt.replace(".000Z", "");
//                 videoObject.published_at = publishedAt;
//
//                 packageToSendToDb.push(videoObject);
//
//             }
//
//             if (firstRun) {
//                 if (!isAdding) {
//                     var clientPackage = [];
//                     for (var i = 0; i < 40; i++) {
//                         clientPackage.push(packageToSendToDb[i])
//                     }
//                     videoObjectsToLoad = clientPackage
//                     // loadClientVideoObjectArray(videoObjectsToLoad)
//                     renderVideoList(videoObjectsToLoad);
//                     access_database.insert_video(packageToSendToDb);
//                 }
//                 else {
//                     $.ajax({
//                         url: './script/api_calls_to_db/access_database/access.php',
//                         method: 'POST',
//                         dataType: 'JSON',
//                         data: {
//                             action: 'insert_video',
//                             videoArray: packageToSendToDb
//                         },
//                         success: function (data) {
//                             if (data.success) {
//                                 console.log('insert video success', data);
//                                 loadSelectedChannels();
//                             }
//                         },
//                         errors: function (data) {
//                             console.log('insert error', data);
//                         }
//                     })
//
//                 }
//             }
//             else {
//                 access_database.insert_video(packageToSendToDb);
//             }
//
//             if (data.hasOwnProperty('nextPageToken') && data.items.length !== 0) {
//                 ytVideoApiToDb(channelId, data.nextPageToken, false)
//             }
//         },
//         error: function (data) {
//             console.log('something went wrong with YT', data);
//         }
//     });
// }

function retrieveInfoFromDB(channelID, isAdding = false) {
    videoObjectsToLoad = 0;

    // //Check for duplicate
    // var isDup = false;
    // for(var i = 0; i<clientSubscribedChannelIds.length; i++){
    //     if(clientSubscribedChannelIds[i] === channelID){
    //         isDup = true
    //     }
    // }
    // if(isDup){
    //     return
    // }
    //instantiate handleInfoFromDB to be used later
    function handleInfoFromDB(readResult){
        if(!isAdding){//Browsing
            clientSelectedChannelIds = [];
            clientSelectedChannelIds.push(channelID);

            clientSelectedChannelObjects = [];
            clientSelectedChannelObjects.push(readResult.data[0])
        }
        else{//Adding
            clientSelectedChannelIds.push(channelID);
            clientSelectedChannelObjects.push(readResult.data[0]);

            clientSubscribedChannelIds.push(channelID);
            clientSubscribedChannelObjects.push(readResult.data[0]);

            //Add channel to user account
            $.ajax({
                url:'./script/api_calls_to_db/access_database/access.php',
                method:'post',
                dataType:'JSON',
                data:{
                    action:'insert_ctu',
                    youtube_channel_id:channelID
                },
                success: function (data) {
                    if (data.success) {
                        console.log('Channel added to user account', data);
                        addChannelModal(data.user_link);

                        renderChannelSelectionDropdown()
                    }
                },
                errors: function (data) {
                    console.log('ERROR', data);
                }
            })
        }
        loadSelectedChannels();
    }

    //Check to see if channel is on DB
    $.ajax({
        url:'./script/api_calls_to_db/access_database/access.php',
        method:'post',
        dataType:'JSON',
        data:{
            youtube_channel_id:channelID,
            action:'read_channels_by_youtube_id'
        },
        success:function(data){
            //Channel is on DB
            var channelObj = data;
            if(data.success){
                console.log('Channel Found on DB', data);
                console.log("last channel pull: ", data.data[0].last_channel_pull)
                //update Channel
                $.ajax({
                    url:'./script/api_calls_to_db/access_database/access.php',
                    method:'post',
                    dataType:'JSON',
                    data:{
                        action:'update_video_list',
                        youtube_channel_id:channelID,
                        last_channel_pull:data.data[0].last_channel_pull
                    },
                    success: function (data) {
                        if (data.success) {
                            console.log('Channel Updated', data);
                        }
                        console.log(data);
                        handleInfoFromDB(channelObj);
                    },
                    errors: function (data) {
                        console.log('insert error', data);
                    }
                })
            }
            //Channel NOT on DB
            else{
                if(data.nothing_to_read){
                    console.log("Must Retrieve Videos From YouTube", data);
                    $.ajax({
                        url:'./script/api_calls_to_db/access_database/access.php',
                        method:'post',
                        dataType:'JSON',
                        data:{
                            action:'insert_youtube_channel_curl',       //NEED TO DO DOUBLE INSERT LATER WITH PAGE TOKEN
                            youtube_channel_id:channelID
                        },
                        success: function (data) {
                            if (data.success) {
                                console.log('Videos inserted to DB from Youtube', data);
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
                                            console.log('Channel Found on DB', data);
                                            handleInfoFromDB(data);
                                        }else{
                                            console.log("ERROR", data);
                                        }
                                    },
                                    errors:function(data){
                                        console.log("ERROR", data);
                                    }
                                })
                                //update remaining videos
                                setTimeout(function(){
                                    $.ajax({
                                        url:'./script/api_calls_to_db/access_database/access.php',
                                        method:'post',
                                        dataType:'JSON',
                                        data:{
                                            action:'insert_videos_curl',
                                            youtube_channel_id:channelID,
                                            page_token:data.page_token
                                        },
                                        success: function (data) {
                                            if (data.success) {
                                                console.log('All videos inserted to DB from YouTube', data);
                                            }
                                        },
                                        errors: function (data) {
                                            console.log('insert error', data);
                                        }
                                    })
                                }, 2000);

                            }
                        },
                        errors: function (data) {
                            console.log("ERROR", data);
                        }
                    })
                }
            }
        },
        errors:function(data){
            console.log("ERROR", data);
        }
    })
}


function handleBrowseButton() {
    $('.dropdownSettingsPopover').popover('hide');

    browsingMode = true;
    videoObjectsToLoad = [];

    returnToPageOne();
    clearVideoList();
    // createPlaceholderAnimation();

    let channelID = $(this).parent().attr("channelId");
    retrieveInfoFromDB(channelID);
    // toastMsg('loading channel videos',1000);
    $('.fa-play-circle-o').remove();
    $('.tdList').removeClass('selectedTd');
    $('#channelSearchModal').modal('hide')
}

function handleAddButton() {
    //CALL FUNCTION THAT LOOKS SELECTION LIST AND UPDATES clientSelectedChannelIds and and clientSelectedChannelObjects
    videoObjectsToLoad = [];
    if (browsingMode) {
        clientSelectedChannelIds = [];
        clientSelectedChannelObjects = [];
        compileSelectedChannelsFromDropdown()
    }

    browsingMode = false;

    returnToPageOne();
    clearVideoList();
    // createPlaceholderAnimation();



    let channelID = $(this).parent().attr("channelId");
    retrieveInfoFromDB(channelID, true);
    // toastMsg('loading channel videos',1000);




    $('.fa-play-circle-o').remove();
    $('.tdList').removeClass('selectedTd');
    $('#channelSearchModal').modal('hide')
}

function handleRemoveButton() {
    $('.dropdownSettingsPopover').popover('hide');
    let channelId = $(this).parent().attr("channelId");
    console.log("REMOVING " + channelId);
    access_database.delete_ctu(channelId);
    for (var i = 0; i < clientSubscribedChannelObjects.length; i++) {
        if (clientSubscribedChannelObjects[i].youtube_channel_id === channelId) {
            clientSubscribedChannelObjects.splice(i, 1)
        }
        if (clientSubscribedChannelIds[i] === channelId) {
            clientSubscribedChannelIds.splice(i, 1)
        }
        if (clientSelectedChannelObjects[i].youtube_channel_id === channelId) {
            clientSelectedChannelObjects.splice(i, 1)
        }
        if (clientSelectedChannelIds[i] === channelId) {
            clientSelectedChannelIds.splice(i, 1)
        }
    }
    renderChannelSelectionDropdown();
    loadSelectedChannels();
}

function displayCurrentPageNumber() {
    $("#currentSlideNumberArea").text(currentSlideNumber);
    if (currentSlideNumber == 1) {
        $(".leftControl").hide()
        $("#returnCarouselStart").hide();
    } else {
        $(".leftControl").show();
        $("#returnCarouselStart").show();
    }
}

function getAutoPlayValue() {
    return $("#autoplayCheckBox").is(":checked")
}

//Testing placeholder animation

function createPlaceholderAnimation() {
    $(".tdList").show();

    var outerDiv = $('<div>').addClass("timeline-wrapper");
    var nestedDiv1 = $('<div>').addClass("timeline-item");
    var nestedDiv2 = $('<div>').addClass("animated-background");
    var nestedDiv3 = $('<div>').addClass("background-masker");
    var completedWrapper = $(outerDiv).append(nestedDiv1, nestedDiv2, nestedDiv3);
    $('.tdTitle, .tdChannel, .tdUpdate').append(completedWrapper);
}

function removePlaceHolderAnimation() {
    $('.timeline-wrapper').remove()
}


function removeUnusedRows() {
    for (var i = 0; i < 40; i++) {
        let row = "#tdList-" + (i + 1);
        let title = row + " .tdTitle>span";

        if ($(title).text() === "") {
            $(row).hide();
        }
    }
}



// function displayTableDataOnMobile(){
//     var rightTableData = $(".item").find(".tdListRight").children().clone();
//     var newElementArray = []
//     for(var j = 0; j<rightTableData.length; j+=10){
//         var newImage = rightTableData.slice(j,j+10)
//         newElementArray.push(newImage);
//     }
//     debugger
//     $(".tdListRight").hide();
//     $(".pageOne_mobile").addClass('item')
//     for(var i=0; i<newElementArray[0].length; i++){
//         $(".newArea").append(newElementArray[0][i])
//     }
//     // $(".pageTwo_mobile").addClass('item')
//     // $(".pageOne_mobile").addClass('item')
//     // $(".pageTwo_mobile").addClass('item')
//     // for(var i = 0; i<newElementArray[0].length; i++){
//     //     $(".newArea").append(newElementArray[0][i])
//     // }
//     // for(var i = 0; i<newElementArray[1].length; i++){
//     //     $(".newArea2").append(newElementArray[1][i])
//     // }
//     // $(".mobileSlide").show();

//     // $(".carousel-inner").append(itemDiv);
// }


// function displayTableDataOnMobile(){
//     var rightTableData = $(".item").find(".tdListRight").children().clone();
//     var newElementArray = []
//     for(var j = 0; j<rightTableData.length; j+=10){
//         var newImage = rightTableData.slice(j,j+10)
//         newElementArray.push(newImage);
//     }
//     debugger
//     for(var i = 0; i<newElementArray.length; i++){
//         var itemDiv = $(".pageOne_mobile").addClass('item')
//         var contentDiv = $("<div>").addClass('carousel-content');
//         var rowDiv = $("<div>").addClass('row,tdRow,text-center mobileRow');
//         rowDiv.append(newElementArray[i]);
//         contentDiv.append(rowDiv);
//         itemDiv.append(contentDiv);
//         $(".carousel-inner").append(itemDiv);
//     }
//     $(".mobileSlide").show();

//     $(".tdListRight").hide();
//     $(".tdListLeft").removeClass('col-md-6');
//     // $(".carousel-inner").append(itemDiv);
// }


function displayTableDataOnDesktop() {
    $(".tdListRight").show();
    // $(".mobileSlide").remove();
    $(".tdListLeft").addClass('col-md-6');
    var mobileSlideItem = $(".carousel-content>.mobileRow");
    // for(var i = 0; i<mobileSlideItem.length; i++){
    //     mobileSlideItem[i].children[i].addClass('tdListLeft')
    // }
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

function fadeToFirstSlideEffect() {
    $(".tdRow").hide();
    $(".tdRow").fadeIn(2000)
}

function returnToPageOne() {
    $(".carousel").removeClass('slide')
    $(".carousel").carousel(0);
    if (currentSlideNumber !== 1) {
        clearVideoList();
        currentSlideNumber = 1; //redundant?
        if (videoObjectsToLoad.length !== 0) {
            var videosToLoad = [];
            for (var i = 0; i < 40; i++) {
                videosToLoad.push(videoObjectsToLoad[i])
            }
            console.log("VIDEOS TO LOAD", videosToLoad);    //load list data while carousel is moving
            // setTimeout(function(){
            // clearVideoList();
            renderVideoList(videosToLoad)
            // }, 250)
        }
    }
    $(".carousel").addClass('slide')
    fadeToFirstSlideEffect();
    displayCurrentPageNumber();
}

// function returnToPageOne(){
//     $(".active").fadeOut();
//     if(currentSlideNumber !== 1){
//         //show backwards animation

//         if(currentSlideNumber % 2 === 0)
//         {
//             currentSlideNumber = 2;
//             $(".carousel").carousel(0);

//         }
//         else
//         {
//             // currentSlideNumber = 3;
//             // $(".carousel").carousel('prev');
//             // $(".carousel").carousel(0);
//         }
//         //
//         //find and load data into list
//         currentSlideNumber = 1; //redundant?
//         var videosToLoad = [];
//         for(var i = 0; i < 40; i++){
//             videosToLoad.push(videoObjectsToLoad[i])
//         }
//         console.log("VIDEOS TO LOAD", videosToLoad);    //load list data while carousel is moving
//         setTimeout(function(){
//             clearVideoList();
//             renderVideoList(videosToLoad)
//         }, 250)
//     }
//     $(".active").fadeIn();
//     displayCurrentPageNumber();
// }

// check if device is apple mobile device (used to convert date object)
function checkIfAppleDevice() {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad)/) != null) {
        return true;
    } else {
        return false;
    }
}

//converts date object for apple mobile devices
function convertDateForApple(dateFromAPI) {
    if (checkIfAppleDevice()) {
        // let date = "2017-11-03 09:34:14" //testing only - sample data
        let newDate = dateFromAPI.split(" ");
        let removeTime = newDate[0].split("-")
        let iosDate = removeTime[1] + '/' + removeTime[2] + '/' + removeTime[0]
        return iosDate
    } else {
        return;
    }
}
function resetSelectedTd() {
    //NEEDS TO ALSO HANDLE FA FA SPINNER

    // setTimeout(function(){
    $(".tdList").removeClass('selectedTd');
    $('.fa-circle-o-notch').remove();
    // }, 50);
    for (let i = 0; i < 40; i++) {
        let row = "#tdList-" + (i + 1);

        if (player.getVideoUrl().indexOf($(row).attr('videoid')) !== -1) {
            // setTimeout(function(){
            $(row).addClass("selectedTd")
            var playSymbol = $('<i>')
                .addClass('fa fa-circle-o-notch fa-spin fa-fw')
                .css({
                    "margin-right": '5px',
                    'color': 'green'
                });
            $(row).find(".tdTitle>span").prepend(playSymbol);
            // }, 500)
        }
    }
}

function loadNextPage() {
    if (currentSlideNumber % 2) {
        var pageToLoad = (currentSlideNumber - 1) / 2;
        var indexToStartOn = (pageToLoad) * 40;
        var videosToLoad = [];
        if (videoObjectsToLoad.length < indexToStartOn + 40) {
            $.ajax({
                url: './script/api_calls_to_db/access_database/access.php',
                method: 'POST',
                dataType: 'JSON',
                data: {
                    action: 'read_videos_by_channel_array',
                    channel_id_array: clientSelectedChannelIds,
                    offset: indexToStartOn
                },
                success: function (data) {
                    if (data.success) {
                        // promise.resolve(data);
                        console.log('read success', data);
                        for (var i = 0; i < data.data.length; i++) {
                            videoObjectsToLoad.push(data.data[i])
                        }
                        for (var i = indexToStartOn; i < indexToStartOn + 40; i++) {
                            videosToLoad.push(videoObjectsToLoad[i])
                        }
                        console.log("VIDEOS TO LOAD", videosToLoad)
                        setTimeout(function () {
                            // clearVideoList();
                            renderVideoList(videosToLoad)
                            removeUnusedRows();
                        }, 250)

                    }
                },
                errors: function (data) {
                    console.log('read error', data);
                    // promise.reject(data);
                }
            })
        }
        else {
            for (var i = indexToStartOn; i < indexToStartOn + 40; i++) {
                videosToLoad.push(videoObjectsToLoad[i])
            }
            console.log("VIDEOS TO LOAD", videosToLoad)
            setTimeout(function () {
                // clearVideoList();
                renderVideoList(videosToLoad)
                removeUnusedRows();
            }, 250)
        }
    }
}
function loadPreviousPage() {
    if (!(currentSlideNumber % 2)) {
        var pageToLoad = (currentSlideNumber / 2) - 1;
        var indexToStartOn = (pageToLoad) * 40;
        var videosToLoad = [];


        for (var i = indexToStartOn; i < indexToStartOn + 40; i++) {
            videosToLoad.push(videoObjectsToLoad[i])
        }
        console.log("VIDEOS TO LOAD", videosToLoad);
        setTimeout(function () {
            // clearVideoList();
            renderVideoList(videosToLoad)
        }, 250)
    }
}

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