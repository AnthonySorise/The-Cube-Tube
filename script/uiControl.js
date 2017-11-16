let dropOpened = false;
function showChannelDrop(){
	$('#mainNav-option').addClass('in')
		.attr('aria-expanded','true')
		.css('display','block')
		.animate({
			right: '0',
			'width': '95vw',
			// 'height': '+=3px',
			'min-height': '100vh'
		},450,'swing',()=>{
			$('mainNav-option').css('width','95vw !important');
			dropOpened = true;
		});
	$('.channelDropDown').addClass('open');	
}

function closeChannelDrop(){
	$('#mainNav-option').animate({
		'width': '0',
		'min-height': '0',
		'right': '-30px'
	},450,'linear',()=>{
		$('mainNav-option').removeClass('in')
			.attr('aria-expanded','false');
		$('.channelDropDown').removeClass('open');
		dropOpened = false;
	});
}

function channelDropClickHandle(){
	$('.closeChannelDropXs').click((event)=>{
		event.stopPropagation();
		closeChannelDrop();
		// $('#mainNav-option').slideDown(1000,()=>{
		// 	$('#mainNav-option').removeClass('in').attr('aria-expanded','false');
		// 	$('.channelDropDown').removeClass('open');
		// });
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

// $(window).on('click',(e)=>{
// 	if(dropOpened){
// 		if( !($.contains($('.channelDropDown.open'),e.target)) ){
// 			 $('mainNav-option').removeClass('in')
//                 .attr('aria-expanded','false');
//             $('.channelDropDown').removeClass('open');
//             dropOpened = false;
// 		}
// 	}
	
// });

$(window).on('click',(e)=>{
	if(dropOpened){
		if( !($.contains($('.channelDropDown.open'),e.target)) && !($('#channelCategoryUl').find(e.target).length)) {
			 $('mainNav-option').removeClass('in')
                .attr('aria-expanded','false');
            $('.channelDropDown').removeClass('open');
            dropOpened = false;
		}
	}
	
});

$(document).ready(function(){
	channelDropClickHandle();
});