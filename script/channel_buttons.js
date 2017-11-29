var clientCategories = {};
var channelIdOfCategorySet = "";

function handleChangeCategory(){
    console.log("HANDLE CHANGE CATEGORY CALLED")
    channelIdOfCategorySet = $(this).parent().attr("channelId");

    //update categoryEditModal
    if(Object.keys(clientCategories).length){
        const catArr = Object.keys(clientCategories);
        $('#channelCategorySelectEdit option:not(:disabled)').remove();
        for(var idx in catArr){
            const catOpt = $('<option>',{
                'value' : catArr[idx],
                'text': catArr[idx]
            });
            $('#channelCategorySelectEdit').append(catOpt);
        }
        $('.userCategoryExists').show();
    }
    $("#categoryEditModal").modal("show")
}

function changeCategory(category, isChangingCategory = false){
    //ajax calls to remove category
    if(isChangingCategory){
        console.log("CHANGE CATEGORY - delete_cuc")
        $.ajax({
            url: './script/api_calls_to_db/access_database/access.php',
            method: 'POST',
            dataType: 'JSON',
            data: {
                action: 'delete_cuc',
                youtube_channel_id:channelIdOfCategorySet
            },
            success: function (data) {
                if (data.success){
                    console.log('delete success', data);
                }else{
                    console.log(data);
                }
                //ajax calls to insert category
                insertCategory();
            },
            errors: function (data) {
                console.log('read error', data);
            }
        });
    }
    else{
        insertCategory();
    }

    function insertCategory(){
        if(clientCategories.hasOwnProperty(category.toLowerCase())){
            $.ajax({
                url:'./script/api_calls_to_db/access_database/access.php',
                method:'post',
                dataType:'JSON',
                data:{
                    action:'insert_cuc',
                    youtube_channel_id:channelIdOfCategorySet,
                    category_name:category
                },
                success: function (data) {
                    console.log("CHANGE CATEGORY - insert_cuc - category already exists")
                    if (data.success) {
                        console.log('insert success', data);

                        removeUnusedCategories();

                        if(!clientCategories.hasOwnProperty(category)){
                            clientCategories[category] = [];
                        }
                        clientCategories[category].push(channelIdOfCategorySet);
                        renderChannelSelectionDropdown();
                    }else{
                        console.log(data);
                    }
                },
                errors: function (data) {
                    console.log('insert error', data);
                }
            })
        }
        else{
            $.ajax({
                url:'./script/api_calls_to_db/access_database/access.php',
                method:'post',
                dataType:'JSON',
                data:{
                    action:'insert_category',
                    youtube_channel_id:channelIdOfCategorySet,
                    category_name:category
                },
                success: function (data) {
                    console.log("CHANGE CATEGORY - insert_category - category doesn't exist")
                    if (data.success) {
                        console.log('insert success', data);

                        for(var key in clientCategories){
                            for(var i = 0; i < clientCategories[key].length; i++){
                                if(clientCategories[key][i] === channelIdOfCategorySet){
                                    clientCategories[key].splice(i, 1)
                                }
                            }
                        }
                        removeUnusedCategories();
                        if(!clientCategories.hasOwnProperty(category)){
                            clientCategories[category] = [];
                        }
                        clientCategories[category].push(channelIdOfCategorySet);
                        renderChannelSelectionDropdown();

                    }else{
                        console.log(data);
                    }
                },
                errors: function (data) {
                    console.log('insert error', data);
                }
            })
        }
    }
}


function removeUnusedCategories(){
    console.log("REMOVE UNUSED CATEGORIES")
    for(var key in clientCategories){
        for(var i = 0; i < clientCategories[key].length; i++){
            if(clientCategories[key][i] === channelIdOfCategorySet){
                clientCategories[key].splice(i, 1)
            }
        }
    }
    for(var key in clientCategories) {
        if (clientCategories[key].length === 0) {
            access_database.delete_categories(key)
            delete clientCategories[key]
        }
    }
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

    let channelID = $(this).parent().attr("channelId");
    channelIdOfCategorySet = channelID;
    retrieveInfoFromDB(channelID, true);
    // toastMsg('loading channel videos',1000);

    $('.fa-play-circle-o').remove();
    $('.tdList').removeClass('selectedTd');
    $('#channelSearchModal').modal('hide')
}

function addChannelModal(userLink) {
    if (userLink) {
        // alert("Save the following link and use it to access your account!");
        let uLink = 'www.thecubetube.com/?user='+userLink;
        const userAddress = $('<span>',{
            'class': 'linkGhost',
            'text': uLink
        }).css({
            position: 'absolute',
            display: 'none'
        });
        $('body').append(userAddress);
        const linkSpan = $('<span>',{
            'class':'linkSpan',
            'text': uLink
        }).css("color", "orange").css("font-weight", "700");

        const linkHeaderHiddenXs = $('<h3>').text("Save this link!").addClass("hidden-xs");
        const linkHeaderVisibleXs = $('<h5>').text("Save this link!").addClass("visible-xs");
        const linkDiv = $('<div>',{
            text: 'Use it to get access to your subscribed channels.'
        }).css("font-weight", "700");
        let button = $('<button>').addClass("btn btn-info btn-lg btn-block").text("CopyLink  ");
        let linkIcon = $('<i>').addClass('fa fa-clipboard fa-lg text-danger');

        button.append(linkIcon).on('click tap', ()=>{
            clipBoard('linkSpan');
        });
        $('.linkCopyArea').append(linkHeaderHiddenXs, linkHeaderVisibleXs, linkSpan, linkDiv, button);
    }else{
        $('.linkCopyArea').hide();
    }
    if(Object.keys(clientCategories).length){
        const catArr = Object.keys(clientCategories);
        $('#channelCategorySelectUlink option:not(:disabled)').remove();
        for(var idx in catArr){
            const catOpt = $('<option>',{
                'value' : catArr[idx],
                'text': catArr[idx]
            });
            $('#channelCategorySelectUlink').append(catOpt);
        }
        $('.userCategoryExists').show();
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
    channelIdOfCategorySet = channelId;
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
    removeUnusedCategories();
    renderChannelSelectionDropdown();
    loadSelectedChannels();
}
