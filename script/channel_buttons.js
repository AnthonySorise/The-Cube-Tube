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

    let channelID = $(this).parent().attr("channelId");
    retrieveInfoFromDB(channelID, true);
    // toastMsg('loading channel videos',1000);

    $('.fa-play-circle-o').remove();
    $('.tdList').removeClass('selectedTd');
    $('#channelSearchModal').modal('hide')
}

function addChannelModal(userLink) {
    if (userLink) {
        let uLink = 'www.thecubetube.com/?user='+userLink;
        const secretLinkSpan = $('<span>',{
            'class': 'linkSpanSecret',
            'text': uLink
        }).css({
            'position': 'absolute',
            'display': 'none',
            'top': '-500px',
            'z-index': '-1'
        });
        $('body').prepend(secretLinkSpan);
        const linkSpan = $('<span>',{
            'class':'linkSpan',
            'text': uLink
        });
        const linkDiv = $('<div>',{
            text: 'Save this link!!!!  '
        }).append(linkSpan);
        // $('.userLinkBody').text("Save this link!!!  ").append(linkSpan);

        let button = $('<button>').addClass("btn btn-info btn-lg btn-block").text("CopyLink  ");
        let linkIcon = $('<i>').addClass('fa fa-clipboard fa-lg text-danger');

        button.append(linkIcon).click(()=>{
            clipBoard('linkSpan');
        });
        $('.userLinkBody').addClass('text-center').append(linkDiv, button);
    }
    else {
        $('.userLinkBody').text("Channel added to your subscriptions!")
    }
    $('#userLinkModal').modal('show');
}

function clipBoard(txtClass){

    if($('span').hasClass(txtClass)){
        let textElmt = document.querySelector('.'+txtClass);
        let range = document.createRange();
        range.selectNode(textElmt);
        window.getSelection().addRange(range);
        try{
        let success = document.execCommand('copy');
        let result = success ? 'link copied!' : 'something went wrong';
        toastMsg(result, 1200);
        }catch(err){
        console.log('error with clipBoard:', err);
        }
    }else{
        toastMsg('nothing to copy', 1200);
    }
}

function handleBrowseButton() {
    $('.dropdownSettingsPopover').popover('hide');

    browsingMode = true;
    videoObjectsToLoad = [];

    returnToPageOne();
    clearVideoList();

    let channelID = $(this).parent().attr("channelId");
    retrieveInfoFromDB(channelID);
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