$(document).ready(function(){
	
	/**
		function for preventing page refresh with search button; 
		only did it because page refresh was annoying
	 **/
	$('#mainNav-option form button, #midNav-option form button').click(function(event){
		event.preventDefault();
	});

	/*** button target for opening theater mode ***/
	$('.lightBoxMode').click(function(){
		$('#lightBoxModal').modal('show');
	});
	/*** ***/
	$('[data-toggle="tooltip"]').tooltip();	//needed for tooltip
	$('[data-toggle="popover"]').popover();

    $('.channelSearchForm').click(function(){
        $('#channelSearchModal').modal('show'); //this would need to be called at success function of ajax call
    });
});

function renderVideoInfo(videoObject){		//argument is video object - just one specific piece of the subscription object.  Object that is the value of the video id
    $('#videoInfo').popover({
        content: function() {
            var message = videoObject.snippet.description;
            return message;
        }
    });
}




