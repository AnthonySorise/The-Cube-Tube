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
	$('.lightBoxMode').tooltip('hover focus');
	// $('.videoStats').click(function(){
	// 	$('.videoStats').popover('toggle');
	// });
	$('#videoStats').popover('hover focus');
});