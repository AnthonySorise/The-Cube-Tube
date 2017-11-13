function showChannelDrop(){
	$('#mainNav-option').addClass('in')
		.attr('aria-expanded','true')
		.css({
			// right: '-400px'
			'width': '0',
			'height': '0'
		})
		.animate({
			// right: '0'
			'width': '95vw',
			// 'height': '+=3px',
			'min-height': '100vh'
		},450,'swing');
	$('.channelDropDown').addClass('open');	


	/*
	#mainNav-option:
		position: absolute
		z-index: 1050
		width: 95vw;
		top: 0
		right 0
	*/
}

function closeChannelDrop(){
	
	
}

function channelDropClickHandle(){
	$('.closeChannelDropXs').click((event)=>{
		// event.stopPropagation();
		// closeChannelDrop();
		$('#mainNav-option').slideDown(1000,()=>{
			$('#mainNav-option').removeClass('in').attr('aria-expanded','false');
			$('.channelDropDown').removeClass('open');
		});
	});
	$('#channelCategoryHamburger').click((event)=>{
		event.stopPropagation();
		showChannelDrop();
		// $('#mainNav-option').slideDown(1000,()=>{
		// 	$('#mainNav-option').addClass('in').attr('aria-expanded','true');
		// 	$('.channelDropDown').addClass('open');
		// });
	});
}

$(document).ready(function(){
	channelDropClickHandle();
});