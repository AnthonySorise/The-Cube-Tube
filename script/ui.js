let dropOpened = false;
function showChannelDrop(){
	$('#mainNav-option').addClass('in')
		.attr('aria-expanded','true')
		.css('display','block')
		.animate({
			right: '0',
			'width': '95vw',
			// 'height': '+=3px',
			'min-height': '100vh'
		},450,'swing',()=>{
			$('mainNav-option').css('width','95vw !important');
			dropOpened = true;
		});
	$('.channelDropDown').addClass('open');	
}

function closeChannelDrop(){
	$('#mainNav-option').animate({
		'width': '0',
		'min-height': '0',
		'right': '-30px'
	},450,'linear',()=>{
		$('mainNav-option').removeClass('in')
			.attr('aria-expanded','false');
		$('.channelDropDown').removeClass('open');
		dropOpened = false;
        $('.dropdownSettingsPopover').popover('hide');
	});
}

function channelDropClickHandle(){
	$('.closeChannelDropXs').click((event)=>{
		event.stopPropagation();
		closeChannelDrop();
		// $('#mainNav-option').slideDown(1000,()=>{
		// 	$('#mainNav-option').removeClass('in').attr('aria-expanded','false');
		// 	$('.channelDropDown').removeClass('open');
		// });
	});
	$('#channelCategoryHamburger').click((event)=>{
		event.stopPropagation();
		showChannelDrop();
		// $('#mainNav-option').slideDown(1000,()=>{
		// 	$('#mainNav-option').addClass('in').attr('aria-expanded','true');
		// 	$('.channelDropDown').addClass('open');
		// });
	});
}

$(window).on('click',(e)=>{
	if(dropOpened){
		if( !($.contains($('.channelDropDown.open'),e.target)) && !($('#channelCategoryUl').find(e.target).length)) {
			 $('mainNav-option').removeClass('in')
                .attr('aria-expanded','false');
            $('.channelDropDown').removeClass('open');
            dropOpened = false;
            $('.dropdownSettingsPopover').popover('hide');
		}
	}	
});


$(document).ready(function(){
	channelDropClickHandle();

	
});

function toastMsg(msgString, time) {
    const msg = $('<div>', {
        text: msgString,
        class: 'toast'
    }).css({
        position: 'fixed',
        right: '-150px',
        top: '125px',
        'width': '150px',
        'padding': '7px',
        'background-color': 'rgba(0,0,0,0.7)',
        'color': 'white',
        'z-index': 1000,
        'border-radius': '15px'
    }).animate({
        right: '+=155px'
    }, 900);
    $('body').append(msg);
    setTimeout(function () {
        $('.toast').remove();
    }, time);
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
