let dropOpened = false;
function showChannelDrop(){
	$('#mainNav-option').addClass('in')
		.attr('aria-expanded','true')
		.css('display','block')
		.velocity({
			'right': '0px',
			'width': '95vw',
			// 'height': '+=3px',
			'min-height': '97vh'
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
	},350,'linear',()=>{
		$('mainNav-option').removeClass('in')
			.attr('aria-expanded','false');
		$('.channelDropDown').removeClass('open');
		dropOpened = false;
        $('.dropdownSettingsPopover').popover('hide');
	});
}

function channelDropClickHandle(){
	$('.closeChannelDropXs').on('click tap', (event)=>{
		event.stopPropagation();
		closeChannelDrop();
	});
	$('#channelCategoryHamburger').on('click tap', (event)=>{
		event.stopPropagation();
		showChannelDrop();
	});
}

$(window).on('click tap',(e)=>{
    // Cleared form because when clicking on autocomplete text the form would clear
    // but get readded on this function 
    $('.channelSearchInput').val('');
    $('#channelModalSearchBar').val('');
	if(dropOpened){
		if( !($.contains($('.channelDropDown.open'),e.target)) && !($('#channelCategoryUl').find(e.target).length) &&($(e.target).attr('id')!=='channelCategoryUl')) {
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
    if(window.innerWidth<767 && $('.contentPlaceholderWrapper').css('display')!=='none'){
        $('.contentPlaceholderWrapper').css('height', $('#listContentWrap').height()-50);
    }
    const iframeWid = ($('#mainVideo').height()*16)/9;
    $('#mainVideo').css('width',iframeWid);
});
$(window).resize(()=>{
    if(window.innerWidth<767 && $('.contentPlaceholderWrapper').css('display')!=='none'){
        $('.contentPlaceholderWrapper').css('height', $('#listContentWrap').height()-50);
    }
    const iframeWid = ($('#mainVideo').height()*16)/9;
    $('#mainVideo').css('width',iframeWid);
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
    }).velocity({
        right: '+=155px'
    }, 900);
    $('body').append(msg);
    setTimeout(function () {
        $('.toast').remove();
    }, time);
}

function videoListDown(){
    $('.listDropWrap').hide();
    $('#text-carousel').slideUp(350);
    $('.thRow').fadeOut(350);
    $('.videoListRowWrapper').fadeOut(350);
    $('.videoRowWrapper').velocity({
        // 'height': '93.8%'
        'height':'94.2%'
    }, 600);
    $('#listContentWrap').velocity({
        'height': '0%'
    }, 350, ()=>{
        $('.listUpWrap').fadeIn();
    });
    $('#mainVideo').velocity({
        'width': '152vh',
        'height': '85vh'
    }, 600);
}
/***************************************************************************************************
 * videoListUp - controls theatre mode effect and animations
 * @params none
 */
function videoListUp(){
    $('.listUpWrap').hide();
    $('.listDropWrap').slideDown();
    $('.videoRowWrapper').velocity({
        'height': '60%'
    }, 600);
    $('#listContentWrap').velocity({
        'height': '40%'
    }, 600);
    $('.videoListRowWrapper').fadeIn(500, ()=>{
        $('#text-carousel').slideDown(800);
        $('.thRow').fadeIn(700);
        $('.listDropWrap').slideDown(700);
    });
    $('#mainVideo').velocity({
        'width': '98vh',
        'height': '55vh'
    }, 600);
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
    $('#userLinkModal').on('hidden.bs.modal',()=>{
        if($('.linkCopyArea').css('display')==='block'){
            history.pushState({},'','/');
        }
    });
    $('.channelDropDown').on('click tap', '.dropdownChannelLiLoad', () => {
        browsingMode = false;
        dropOpened = false;
        returnToPageOne();
        compileSelectedChannelsFromDropdown();
        clearVideoList();

        if (window.innerWidth < 767) {
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
                    numUpdated++;
                    if(numUpdated === clientSelectedChannelObjects.length){
                        returnToPageOne();
                        loadSelectedChannels();
                    }
                },
                errors: function (data) {
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

        if (window.innerWidth < 767) {
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
                    numUpdated++;
                    if(numUpdated === clientSubscribedChannelObjects.length){
                        returnToPageOne();
                        loadSelectedChannels();
                    }
                },
                errors: function (data) {
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
        categoryStr = $(e.target).find('input').val();

        if($(e.target).closest('.modal').attr('id') === "userLinkModal"){
            changeCategory(categoryStr);
        }
        else{
            var isUncategorized = true;
            for(var cat in clientCategories){
                if(clientCategories[cat].indexOf(channelIdOfCategorySet) !== -1){
                    isUncategorized = false;
                }
            }
            if(isUncategorized){
                changeCategory(categoryStr);
            }
            else{
                changeCategory(categoryStr, true);
            }
        }

        $(e.target).find('input').val('');
        $(e.target).closest('.modal').modal('hide').on('hidden.bs.modal',()=>{
            // toastMsg('Channel Added', 2000);
        });
    });
    $('.existingCategoryButton').on('click tap', (e)=>{
        let categoryStr = '';
        categoryStr = $(e.target).closest('.existingCategorySelect').find('select option:selected').val();

        if($(e.target).closest('.modal').attr('id') === "userLinkModal"){
            changeCategory(categoryStr);
        }
        else{
            var isUncategorized = true;
            for(var cat in clientCategories){
                if(clientCategories[cat].indexOf(channelIdOfCategorySet) !== -1){
                    isUncategorized = false;
                }
            }
            if(isUncategorized){
                changeCategory(categoryStr);
            }
            else{
                changeCategory(categoryStr, true);
            }
        }

        $(e.target).closest('.existingCategorySelect').find('select option:selected').prop('selected', false);
        $(e.target).closest('.existingCategorySelect').find('select option:disabled').prop('selected', true);
        $(e.target).closest('.modal').modal('hide').on('hidden.bs.modal',()=>{
            // toastMsg('Channel Added', 2000);
        });
    });
    //Search Button
    $('.channelSearchForm').on('click tap', '.channelSearchButton', (e) => {
        e.preventDefault();
        $('.channelSearchForm').submit();
    });

    function channelSearchWorked() {
        for (var i = 0; i < 10; i++) {
            renderChannelSearchStats(i)
        }
    }
    function channelSearchFailed(message) {
        console.log('console.log("CHANNEL SEARCH FAILED")', message);
    }
    $(".channelSearchForm").submit(function (event) {
        event.preventDefault();
        let inputStr = '';
        if ($(event.target).find('input').val() === "") {
            return;     //prevent empty input
        } else {
            inputStr = $(event.target).find('input').val();
        }
        $(".navbar-collapse").collapse('hide');
        searchChannelsByName(inputStr).then(channelSearchWorked, channelSearchFailed);
        if($('.contentPlaceholderWrapper').css('display')!=='none'){
            $('.contentPlaceholderWrapper').fadeOut(1000, function () {
                $('#text-carousel, .videoHeader, .listDropWrap').slideDown(1100);
            });
        }
    });
    //Browse Button
    $('.browseChannelButton').on("click tap", handleBrowseButton);

    //Add Buttons
    $('.addChannelButton').on("click tap", handleAddButton);

    $(".tdPlaylistButton").on("click tap", handleAddToPlaylist);

    $('.ui-autocomplete').on('click tap','.ui-menu-item-wrapper', function (event){
        event.stopPropagation();
        let autocompleteValue = $(event.target).text();
        $('.channelSearchInput').val(autocompleteValue);
        $('.channelSearchButton').click();
        // searchChannelsByName(autocompleteValue).then(channelSearchWorked, channelSearchFailed);
    });

/***************************************************************************************************
 * click handlers for table rows that are untouched
 * @params none
 */
    $(".tdTitle, .tdChannel, .tdUpDate").on("click tap", function () {
        
        if (!$(this).parent().hasClass('selectedTd')) {
            $(".tdTitle, .tdChannel").unbind("mouseup");
            $('.tdTitle i.fa').remove();
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

 /***************************************************************************************************
 * click handlers for bottom carousel slides
 * @params none
 */
    $('#rightArrowIcon').on('click tap',carouselRightArrow);
    $('#leftArrowIcon').on('click tap',carouselLeftArrow);

 /***************************************************************************************************
 * click handler for 'watch order' function and arrow icon
 * @params none
 */
    $("#playOrderArrow").on('click', function(){
        reversePlayDirection = !reversePlayDirection;
        if(reversePlayDirection === false){
          $("i").removeClass('up')
        }else{
          $("i").addClass('up')
        }
      });
    

/***************************************************************************************************
 * click handlers for theatre controls
 * @params none
 */
    $('.fastForwardButton').on('click tap', fastForwardVideo);
    $('.rewindButton').on('click tap', rewindVideo);
    $('.playButton').on('click tap', playYtVideo);
    $('.lastVideoButton').on('click tap',playPrevYTVideo);
    $('.nextVideoButton').on('click tap', playNextYTVideo);

/***************************************************************************************************
 * fastForwardVideo - moves video forward in time 15s
 * @params none
 */
    function fastForwardVideo() {
        var fastForward = player.getCurrentTime();
        var add15Seconds = fastForward + 15;
            player.seekTo(add15Seconds);
    }
/***************************************************************************************************
 * playTYVideo - pause and play functionality with tooltip and icon changes
 * @params none
 */
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
/***************************************************************************************************
 * rewindVideo - moves video back in time 15s
 * @params none
 */
    function rewindVideo() {
        var fastForward = player.getCurrentTime();
        var minus15Seconds = fastForward - 15;
        player.seekTo(minus15Seconds);
    }
}

/***************************************************************************************************
 * carouselLeftArrow - carousel controls on bottom
 * @params none
 */
function carouselLeftArrow(){
    $(".carousel").carousel('prev');
}
/***************************************************************************************************
 * carouselRightArrow - carousel controls on bottom
 * @params none
 */
function carouselRightArrow(){
    if($('#tdList-20').attr('videoID') === '') {
        return;
    } else if ($('#tdList-40').attr('videoID') === '' && currentSlideNumber % 2 === 0) {
        return;
    }
    $(".carousel").carousel('next');
}

/***************************************************************************************************
 * tooltipFunctions - set timeouts for tool tips after hover
 * @params none
 */
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
