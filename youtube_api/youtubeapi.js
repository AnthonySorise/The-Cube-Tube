$(document).ready(clickHandlers);

function clickHandlers(){
    $('.channelButton').click(searchChannelsByName)
    $('.channelVideosButton').click(searchVideosWithinChannel)

}

//Channel Search by Name
function searchChannelsByName() {
    string = $('.inputSearchChannel').val();
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
            console.log('Youtube success',data);
        },
        error: function (data) {
            console.log('something went wrong with YT', data);
        }
    })
}

//Get channel information from channel ID
function getChannelInfoFromChannelId(string) {
    // string = $('.inputSearchChannel').val();
    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/channels',
        dataType: 'json',
        method: 'get',
        data: {
            key: "AIzaSyAOr3VvEDRdI5u9KGTrsJ7usMsG5FWcl6s",
            id: string,
            part: 'snippet, statistics'
        },
        success: function (data) {
            console.log('Youtube success',data);
        },
        error: function (data) {
            console.log('something went wrong with YT', data);
        }
    })
}

//Video Search Within Channel
function searchVideosWithinChannel(){        //string = channel ID
    string = $('.inputSearchChannelVideos').val();
    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/search',
        dataType: 'json',
        method: 'get',
        data: {
            key: "AIzaSyAOr3VvEDRdI5u9KGTrsJ7usMsG5FWcl6s",
            channelId: string,
            type: 'video',
            order:'date',
            part: 'snippet',
            maxResults: 10
        },
        success: function (data) {
            console.log('Youtube success',data);
            for(var i=0; i<data.items.length; i++){
                let responseDiv = $("<div>").addClass("video");
                $('<iframe>',{
                    src: 'https://www.youtube.com/embed/'+data.items[i].id.videoId,
                }).appendTo(responseDiv);
                $(".videoResponse").append(responseDiv);
            }

        },
        error: function (data) {
            console.log('something went wrong with YT', data);
        }
    })
}


//Get video information from video ID
function getVideoInfoFromVideoId(string) {
    // string = $('.inputSearchChannel').val();
    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/videos',
        dataType: 'json',
        method: 'get',
        data: {
            key: "AIzaSyAOr3VvEDRdI5u9KGTrsJ7usMsG5FWcl6s",
            id: string,
            part: 'snippet, statistics'
        },
        success: function (data) {
            console.log('Youtube success',data);
        },
        error: function (data) {
            console.log('something went wrong with YT', data);
        }
    })
}

function deepCopy(toCopy){
    function objectDeepCopy(object){
        var objectCopy = {};
        for(var prop in object){
            var currentValue = object[prop];
            if(typeof currentValue !== "object"){
                objectCopy[prop] = currentValue
            }
            else{
                if(Array.isArray(currentValue)){
                    objectCopy[prop] = arrayDeepCopy(currentValue)
                }
                else{
                    objectCopy[prop] = objectDeepCopy(currentValue)
                }

            }
        }
        return objectCopy;
    }

    function arrayDeepCopy(array){
        var arrayCopy = [];
        for(var i = 0; i < array.length; i++){
            var currentValue = array[i];
            if(typeof currentValue !== "object"){
                arrayCopy[i] = currentValue
            }
            else{
                if(Array.isArray(currentValue)){
                    arrayCopy[i] = arrayDeepCopy(currentValue)
                }
                else{
                    arrayCopy[i] = objectDeepCopy(currentValue)
                }

            }

        }
        return arrayCopy
    }
    if(typeof toCopy === "object"){
        if(Array.isArray(toCopy)){
            return arrayDeepCopy(toCopy)
        }
        else{
            return objectDeepCopy(toCopy)
        }
    }
    else{
        var copy = toCopy;
        return toCopy;
    }
}

function constructDataPackageFromAPIReturn(data){
    var dataCopy = deepCopy(data);
}