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
	// $('.videoStats').click(function(){
	// 	$('.videoStats').popover('toggle');
	// });
	// $('#videoStats').popover('hover focus');


});

function renderVideoList(subsciptionsObject){
	for(var key in subsciptionsObject){
		console.log(subsciptionsObject[key].snippet.title);
		console.log(subsciptionsObject[key].snippet.channelTitle);
		console.log(subsciptionsObject[key].snippet.publishedAt);
	
	}
}