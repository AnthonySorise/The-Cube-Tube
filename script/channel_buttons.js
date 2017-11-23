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
        const britEyesOnly = $('<span>',{
            'class': 'linkGhost',
            'text': uLink
        }).css({
            position: 'absolute',
            display: 'none'
        });
        $('body').append(britEyesOnly);
        const linkSpan = $('<span>',{
            'class':'linkSpan',
            'text': uLink
        });
        const linkDiv = $('<div>',{
            text: 'Save this link!  Use it to get access to your subscribed channels.  '
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
        // $('.userLinkBody').text("Channel added to your subscriptions!")
        $('.userLinkBody').text('');

        let catFormWrap = $('<form>',{
            'class':'form-inline col-xs-12 col-sm-6 col-sm-offset-3'
        });
        let catFormDiv1= $('<div>',{
            'class':'form-group'
        });
        let catFormDiv2= $('<div>',{
            'class':'input-group'
        });
        const catFormInput = $('<input>',{
            'type':'text',
            'class':'form-control channelCategoryInput',
            'placeholder': 'enter channel category',
            'name' : 'channelCategory'
        });
        let catFormBtn = $('<span>',{
            'type':'button',
            'class':'input-group-addon channelCategoryButton'
        });
        const catFormBtnIcon=$('<span>',{
            'class':'glyphicon glyphicon-ok'
        }).css({
            'color':'rgba(255,0,0,0.6)'
        }).appendTo(catFormBtn);
        catFormDiv2.append(catFormInput, catFormBtn);
        catFormDiv1.append(catFormDiv2);
        catFormWrap.append(catFormDiv1);

        let chCatDescWrap = $('<dl>');
        const chCatDescDt = $('<dt>',{
            'text': 'Categorize your channels:'
        }).css({
            'color':'grey'
        });
        const chCatDescDd= $('<dd>',{
            'text': 'add a custom channel category for the channel you added'
        }).css({
            'color':'white'
        });
        chCatDescWrap.append(chCatDescDt, chCatDescDd);

        $('.userLinkBody').append(chCatDescWrap, catFormWrap);
    }
    $('#userLinkModal').modal('show');
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