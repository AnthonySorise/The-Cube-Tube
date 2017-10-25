$(document).ready(function(){
	// $('#topFiller').css('height',$('nav').height());
	$('#mainNav-option form button, #midNav-option form button').click(function(event){
		event.preventDefault();
	});
	$('.lightBoxMode').click(function(){
		$('#lightBoxModal').modal('show');
	});
});