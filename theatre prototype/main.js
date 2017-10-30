$(document).ready(initializeApp);

function initializeApp(){
	assignClickHandlers();
}

function assignClickHandlers(){
	$('.switch').on('click',function(){
		player.pauseVideo();
		player2.seekTo(player.getCurrentTime());
		player2.playVideo();

	});
	$('.unswitch').on('click',function(){
		player2.pauseVideo();
		player.seekTo(player2.getCurrentTime());
		player.playVideo();

	});
}




var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: 'auto',
		width: 'auto',
		videoId: 'M7lc1UVf-VE',
		events: {
		'onReady': onPlayerReady
		}
	});
	player.attr("id", "mainVideo")
}

var player2;
function onYouTubeIframeAPIReady2() {
	player2 = new YT.Player('player2', {
		height: '390',
		width: '640',
		videoId: 'M7lc1UVf-VE'
	});
}


function onPlayerReady(event) {
event.target.playVideo();
}









