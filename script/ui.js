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
		if( !($.contains($('.channelDropDown.open'),e.target)) && !($('#channelCategoryUl').find(e.target).length) &&!($(e.target).attr('id')!=='#channelCategoryUl')) {
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

function videoListDown(){
    $('.listDropWrap').hide();
    $('#text-carousel').slideUp(850);
    $('.thRow').fadeOut(590);
    $('.videoListRowWrapper').fadeOut(590);
    $('.videoRowWrapper').animate({
        // 'height': '93.8%'
        'height':'94.2%'
    }, 600);
    $('#listContentWrap').animate({
        'height': '5.5%'
    }, 600, ()=>{
        $('.listUpWrap').fadeIn();
    });
    $('#mainVideo').animate({
        'width': '152vh',
        'height': '85vh'
    }, 600);
    // $('.listDropWrap').hide();
    // let timeInt = 0;
    // $('.tdList').each((idx,item)=>{
    //     if($(item).attr('videoid')!==''){
    //         setTimeout(()=>{
    //             $(item).toggle('puff');
    //         }, timeInt);
    //         timeInt+=20;
    //     }
    //     if(idx==39){    //39 instead of 40 because of 0 index
    //         setTimeout(()=>{
    //             $('#text-carousel').slideUp(850);
    //             $('.thRow').fadeOut(590);
    //             $('.videoListRowWrapper').fadeOut(590);
    //             $('.videoRowWrapper').animate({
    //                 // 'height': '93.8%'
    //                 'height':'94.2%'
    //             }, 600);
    //             $('#listContentWrap').animate({
    //                 'height': '5.5%'
    //             }, 600, ()=>{
    //                 $('.listUpWrap').fadeIn();
    //                 // $('.tdList').hide();
    //             });
    //             $('#mainVideo').animate({
    //                 'width': '152vh',
    //                 'height': '85vh'
    //             }, 600);
    //         },850);
    //     }
    // });
}

function videoListUp(){
    $('.listUpWrap').hide();
    $('.listDropWrap').slideDown();
    $('.videoRowWrapper').animate({
        'height': '60%'
    }, 600);
    $('#listContentWrap').animate({
        'height': '40%'
    }, 600);
    $('.videoListRowWrapper').fadeIn(500, ()=>{
        $('#text-carousel').slideDown(800);
        $('.thRow').fadeIn(700);
        $('.listDropWrap').slideDown(700);
    });
    $('#mainVideo').animate({
        'width': '98vh',
        'height': '55vh'
    }, 600);
    // $('.listUpWrap').hide();
    // $('.listDropWrap').slideDown();
    // $('.videoRowWrapper').animate({
    //     'height': '60%'
    // }, 600);
    // $('#listContentWrap').animate({
    //     'height': '40%'
    // }, 600);
    // $('.videoListRowWrapper').fadeIn(500, ()=>{
    //     $('#text-carousel').slideDown(800);
    //     $('.thRow').fadeIn(700);
    //     $('.listDropWrap').slideDown(700);
    // });
    // $('#mainVideo').animate({
    //     'width': '98vh',
    //     'height': '55vh'
    // }, 600);
    // let timeInt = 500;
    // $('.tdList').each((idx,item)=>{
    //     if($(item).attr('videoid')!==''){
    //         setTimeout(()=>{
    //             $(item).toggle('scale');
    //         }, timeInt);
    //         timeInt +=50;
    //     }else{
    //         return;
    //     }
    // });
}

//Click handler to console log search results
function clickHandler() {
    $('.listUpButton').on('click tap', ()=>{
        videoListUp();
    });
    $('.listDropButton').on('click tap', ()=>{
        videoListDown();
    });
    $('#myLinkButton').on('click tap',()=>{
        clipBoard('linkGhost');
    });
    $('.channelDropDown').on('click tap', '.dropdownChannelLiLoad', () => {
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

    $(".dropdownChannelLiAll").on("click tap", function () {
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

    $('#channelCategoryUl').on('click tap', '.channelLiChannel, .dropdownChannelLi input', (e) => {
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
    $('a.dropdown-toggle').on('click tap', () => {
        $('.channelDropDown').toggleClass('open');
        if (dropOpened) {
            dropOpened = false;
        } else {
            setTimeout(() => {
                dropOpened = true;
            }, 300);
        }
    });
    //category submit button
    $('.channelCategoryButton').on('click tap', (e)=>{
        e.preventDefault();
        $('.channelCategoryForm').submit();
    });
    $('.channelCategoryForm').submit((e)=>{
        e.preventDefault();
        let categoryStr = '';
        categoryStr = $(e.target).find('input').val().toLowerCase();
        changeCategory(categoryStr);
        $(e.target).find('input').val('');
        $(e.target).closest('.modal').modal('hide').on('hidden.bs.modal',()=>{
            toastMsg('channel added', 1100);
        });
    });
    $('.existingCategoryButton').on('click tap', (e)=>{
        let categoryStr = '';
        categoryStr = $(e.target).closest('.existingCategorySelect').find('select option:selected').val();
        changeCategory(categoryStr);
        $(e.target).closest('.existingCategorySelect').find('select option:selected').prop('selected', false);
        $(e.target).closest('.existingCategorySelect').find('select option:disabled').prop('selected', true);
        $(e.target).closest('.modal').modal('hide').on('hidden.bs.modal',()=>{
            toastMsg('channel added', 1100);
        });
    });
    //Search Button
    $('.channelSearchForm').on('click tap', '.channelSearchButton', (e) => {
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
            $('#text-carousel, .videoHeader, .listDropWrap').slideDown(1100);
        });
        // $("#text-carousel").show()
        // $(".videoHeader").show()
    });
    //Browse Button
    $('.browseChannelButton').on("click tap", handleBrowseButton);

    //Add Buttons
    $('.addChannelButton').on("click tap", handleAddButton);

    $(".tdPlaylistButton").on("click tap", handleAddToPlaylist);

    //Table List Rows that are unselected
    $(".tdTitle, .tdChannel, .tdUpDate").on("click tap", function () {

        $('.tdTitle i.fa').remove();
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
        
            currentlySelectedVideoID = $(this).parent().attr('videoID');
            var channelID = $(this).parent().attr('channelID');

            updateMidNavText();

            // $('.fa-play-circle-o').remove();
            $('.fa-circle-o-notch').remove();
            var playSymbol = $('<i>')
            // .addClass("fa fa-play-circle-o")
                .addClass('fa fa-circle-o-notch fa-spin fa-fw circleSpinner')
                .css({
                    "margin-right": '5px',
                    'color': 'green'
                });
            $(this).parent().find(".tdTitle>span").prepend(playSymbol);
            $('.tdList').removeClass('selectedTd');
            $(this).parent().addClass("selectedTd");
            if (getAutoPlayValue()) {
                player.loadVideoById(currentlySelectedVideoID);
            } else {
                player.cueVideoById(currentlySelectedVideoID);
            }

            //update video stats popover
            updateVideoInfoPopover(currentlySelectedVideoID);

            //update channel stats popover
            updateChannelInfoPopover(channelID);
        }
    });




    //Theater mode
    // $('.lightBoxMode').on('click', checkHomePageVideoStatus);
    // $('.theatreModalClose').on('click', checkTheatreModeStatus);
    $('.fastForwardButton').on('click tap', fastForwardVideo);
    $('.rewindButton').on('click tap', rewindVideo);
    $('.playButton').on('click tap', playYtVideo);
    $('.lastVideoButton').on('click tap',playPrevYTVideo);
    $('.nextVideoButton').on('click tap', playNextYTVideo); 
    // $('body').on('click', closeTheatreOnClick);
    // $(document).on('keyup', function (event) {
    //     if (event.keyCode === 27 && $('body').hasClass('modal-open')) {
    //         console.log('Esc was pressed');
    //         checkTheatreModeStatus();
    //     }
    // });

    // Lets user click outside of theatre modal to close and save the state of video
    // function closeTheatreOnClick(event) {
    //     event.stopPropagation();
    //     if($('body').hasClass('modal-open')) {
    //         //Have to check if modal footer is being clicked to stop from closing modal
    //         if(event.target.classList[0] == "fa" || event.target.classList == "") {
    //             return;
    //         }
    //         $('.modal-content').modal('hide');
    //         checkTheatreModeStatus();
    //     }
    // }
    //
    // function checkHomePageVideoStatus(event) {
    //     event.stopPropagation()
    //     player.pauseVideo();
    //     if (player.getPlayerState() === 2) {
    //         checkIfPlayerIsMuted();
    //         player.pauseVideo();
    //         player2.seekTo(player.getCurrentTime());
    //         player2.pauseVideo();
    //         $('.pauseButton').removeClass().addClass(play);
    //         $('#lightBoxModal').modal('show');
    //     } else if (player.getPlayerState() === 1) {
    //         checkIfPlayerIsMuted();
    //         player.pauseVideo();
    //         player2.seekTo(player.getCurrentTime());
    //         $('.playButton').removeClass().addClass(pause);
    //         player2.playVideo();
    //         $('#lightBoxModal').modal('show');
    //     } else if (player.getPlayerState() === 5) {
    //         $('#lightBoxModal').modal('show');
    //     }
    // }
    //
    // function checkTheatreModeStatus() {
    //     if (player2.getPlayerState() === 2) {
    //         checkIfPlayer2IsMuted();
    //         player2.pauseVideo();
    //         player.seekTo(player2.getCurrentTime());
    //         player.pauseVideo();
    //         $('#lightBoxModal').modal('hide');
    //     } else if (player2.getPlayerState() === 1) {
    //         checkIfPlayer2IsMuted();
    //         player2.pauseVideo();
    //         player.seekTo(player2.getCurrentTime());
    //         $('#lightBoxModal').modal('hide');
    //         player.playVideo();
    //     } else if (player2.getPlayerState() === 5) {
    //         $('#lightBoxModal').modal('hide');
    //     }
    // }


    function fastForwardVideo() {
        var fastForward = player.getCurrentTime();
        var add15Seconds = fastForward + 15;
        // var player2State = player.getPlayerState();
        // if (player2State === 2) {
        //     player.seekTo(add15Seconds);
        //     player.pauseVideo();
        //     return;
        // } else {
            player.seekTo(add15Seconds);
        // }
    }


    function playYtVideo() {
        player.playVideo();
        if (this.classList.value === playFaClass) {
            $('.playButton').tooltip('hide')
            $('.playButton').removeClass(playFaClass).toggleClass(pauseFaClass);
            $(this).attr('data-original-title','Pause')
        } else {
            $('.pauseButton').tooltip('hide');
            $('.pauseButton').removeClass(pauseFaClass).toggleClass(playFaClass);
            $(this).attr('data-original-title','Play')
            player.pauseVideo()
        }
    }


    function rewindVideo() {
        var fastForward = player.getCurrentTime();
        var minus15Seconds = fastForward - 15;
        // var player2State = player.getPlayerState();
        // if (player2State === 2) {
        //     player.seekTo(minus15Seconds);
        //     player.pauseVideo();
        //     return;
        // } else {
            player.seekTo(minus15Seconds);
        // }
    }
}

function tooltipFunctions() {
    $('[data-toggle="tooltip"]').tooltip(); //needed for tooltip
    $('[data-toggle="popover"]').popover();
    $('.tdPlaylistButton').mouseenter(function(){
        setTimeout(function(){
            $('.tdPlaylistButton').tooltip('hide');
        },1000);
    });
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
    $('.listDropButton').mouseenter(function(){
        setTimeout(function(){
            $('.listDropButton').tooltip('hide');
        },1000);
    });
    $('.lastVideoButton').mouseenter(function(){
        setTimeout(function(){
            $('.lastVideoButton').tooltip('hide');
        },1000);
    });
    $('.rewindButton').mouseenter(function(){
        setTimeout(function(){
            $('.rewindButton').tooltip('hide');
        },1000);
    });
    $('.fastForwardButton').mouseenter(function(){
        setTimeout(function(){
            $('.fastForwardButton').tooltip('hide');
        },1000);
    });
    $('.nextVideoButton').mouseenter(function(){
        setTimeout(function(){
            $('.nextVideoButton').tooltip('hide');
        },1000);
    });
    $('.playButton').mouseenter(function(){
        setTimeout(function(){
            $('.playButton').tooltip('hide');
        },1000);
    });
    $('.pauseButton').mouseenter(function(){
        setTimeout(function() {
            $('.pauseButton').tooltip('hide');
        }, 1000);
    });
    $('.listUpButton').mouseenter(function(){
        setTimeout(function(){
            $('.listUpButton').tooltip('hide');
        },1000);
    });
}
