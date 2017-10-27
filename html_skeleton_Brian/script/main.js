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

	clickHandler();
    // $('.channelSearchForm').click(function(){
    //     $('#channelSearchModal').modal('show'); //this would need to be called at success function of ajax call
    // });
});

function renderVideoInfo(videoObject){		//argument is video object - just one specific piece of the subscription object.  Object that is the value of the video id
    $('#videoInfo').popover({
        content: function() {
            var message = videoObject.snippet.description;
            return message;
        }
    });
}

//Click handler to console log search results
function clickHandler() {
	console.log('Search button was clicked');
	$(".channelSearchForm .channelSearchButton").on('click',function(event){
		event.preventDefault();
        searchChannelsByName();
	});
}

//Channel Search by Name
function searchChannelsByName() {
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
			}
		},
		error: function (data) {
			console.log('something went wrong with YT', data);
		}
	})
	setTimeout(function(){	//SHOULD USE PROMISE HERE INSTEAD
		for(var i = 0; i < 10; i++){
			renderSearchStats(i)
		}
	}, 500)
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
			$(chSub).text(data.items[0].statistics.subscriberCount);
            $(chDesc).attr("data-content", data.items[0].snippet.description)
		},
		error: function (data) {
			console.log('something went wrong with YT', data);
		}
    })
}




