function searchChannelsByName() {
    var promise = {
        then: function(resolve,reject){
            this.resolve = resolve;
            this.reject = reject;

        }
    };
    string = $('#channelSearchInput').val();
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
            $('#channelSearchModal').modal('show');
            for(var i = 0; i < 10; i++){
                var channelListData = "#chSearch-"+(i+1);
                var chName = "#chSearch-"+(i+1) + " .chName";
                var img = "#chSearch-"+(i+1) + " img";
                $(channelListData).attr("channelId", data.items[i].snippet.channelId);
                $(chName).text(data.items[i].snippet.channelTitle);
                $(img).attr("src", data.items[i].snippet.thumbnails.medium.url);
                promise.resolve(data);
            }
        },
        error: function (data) {
            console.log('something went wrong with YT', data);
            promise.reject('oops')
        }

    });
    return promise;
}

function worked(data){	//SHOULD USE PROMISE HERE INSTEAD
    //for(var i = 0; i < 10; i++){
    console.log('YESSS---promise!!')
}

function failed(message){
    console.log('no way jose')
}


searchChannelsByName().then(worked,failed);