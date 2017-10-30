$(document).ready(function(){

    /**
     function for preventing page refresh with search button;
     only did it because page refresh was annoying
     **/
    $('#midNav-option form button').click(function(event){
        event.preventDefault();
    });

    /*** button target for opening theater mode ***/
    $('.lightBoxMode').click(function(){
        $('#lightBoxModal').modal('show');
    });
    /*** ***/
    $('[data-toggle="tooltip"]').tooltip();	//needed for tooltip
    $('[data-toggle="popover"]').popover();

    // $('.videoStats').click(function(){
    // 	$('.videoStats').popover('toggle');
    // });
    // $('#videoStats').popover('hover focus');
    clickHandler();
    // $('.channelSearchForm').click(function(){
    //     $('#channelSearchModal').modal('show'); //this would need to be called at success function of ajax call
    // });

    //TEMP DUMMY DATA
    renderVideoList(sampleSubscriptions)
    //TEMP DUMMY DATA

});

// function renderVideoInfo(videoObject){		//argument is video object - just one specific piece of the subscription object.  Object that is the value of the video id
//     $('#videoInfo').popover({
//         content: function() {
//             var message = videoObject.snippet.description;
//             return message;
//         }
//     });
// }

//Click handler to console log search results
function clickHandler() {
    //Search Button
    $(".channelSearchForm .channelSearchButton").on('click',function(event){
        event.preventDefault();
        searchChannelsByName().then(worked,failed);
    });

    //Table List Rows
    $(".tdTitle, .tdChannel, .tdUpDate").on("click", function(){
        console.log('https://www.youtube.com/embed/'+$(this).attr('videoId'));
        $('.fa-play').remove();
        var playSymbol = $('<i>')
            .addClass("fa fa-play")
            .css("margin-right", '5px')
            .css("color", "green");
        $(this).parent().find(".tdTitle>span").prepend(playSymbol);
        $('.tdList').removeClass('selectedTd');
        $(this).parent().addClass("selectedTd");
        $('#mainVideo').attr("src", 'https://www.youtube.com/embed/'+$(this).parent().attr('videoId')+ '?&autoplay=1');
        $('#theaterVideo').attr("src", 'https://www.youtube.com/embed/'+$(this).parent().attr('videoId'))
    })
}

//Channel Search by Name
function searchChannelsByName() {
    string = $('#channelSearchInput').val();
    var promise = {
        then: function(resolve,reject){
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
            console.log('Youtube success',data);
            $('#channelSearchModal').modal('show');
            for(var i = 0; i < 10; i++){
                var channelListData = "#chSearch-"+(i+1);
                var chName = "#chSearch-"+(i+1) + " .chName";
                var img = "#chSearch-"+(i+1) + " img";
                $(channelListData).attr("channelId", data.items[i].snippet.channelId);
                $(chName).text(data.items[i].snippet.channelTitle);
                $(img).attr("src", data.items[i].snippet.thumbnails.medium.url);
            }
            promise.resolve(data)
        },
        error: function (data) {
            console.log('something went wrong with YT', data);
            promise.reject('oops');
        }
    });
    return promise;
}
function worked(){	//SHOULD USE PROMISE HERE INSTEAD
    for(var i = 0; i < 10; i++){
        renderSearchStats(i)
    }
}
function failed(message){
    console.log('nope',message);
}

function renderSearchStats(i){
    var channelListData = "#chSearch-"+(i+1);
    var chSub = "#chSearch-"+(i+1) + " .chSub";
    var chDesc ="#chSearch-"+(i+1) + " a";
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
            console.log('Youtube success',data);
            console.log(chSub);
            var subNumber = parseInt(data.items[0].statistics.subscriberCount);
            var numWithCommas = subNumber.toLocaleString("en-us");
            $(chSub).text(numWithCommas);
            $(chDesc).attr("data-content", data.items[0].snippet.description)
        },
        error: function (data) {
            console.log('something went wrong with YT', data);
        }
    })
}


function renderVideoList(subsciptionsArray){
	for(var i = 0; i<subsciptionsArray.length; i++){

		var row = "#tdList-" + (i+1);
		var title = row + " .tdTitle>span";
		var channel = row + " .tdChannel";
        var upDate = row + " .tdUpDate";



		var key = Object.keys(subsciptionsArray[i])[0];

		var dateString = subsciptionsArray[i][key].snippet.publishedAt;
        var d = new Date(dateString)
        dateString = (d.getMonth() + 1) + '/' + d.getDate() + '/' +  d.getFullYear().toString().substring(2);

        $(row).attr("videoID", Object.keys(subsciptionsArray[i]));
        $(title).text(subsciptionsArray[i][key].snippet.title);
		$(channel).text(subsciptionsArray[i][key].snippet.channelTitle);
		$(upDate).text(dateString);

        var videoData = row + " .tdInfo a";
        var videoDataImg = $('<img>').attr('src',subsciptionsArray[i][key].snippet.thumbnails.medium.url);  //NEEDS IMPLEMENTATION

        $(videoData).attr("data-original-title", subsciptionsArray[i][key].snippet.title);

	}

}

