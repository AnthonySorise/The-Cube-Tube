<?php


//function: clickHandler() - called when :
		//ajax 1: videos; $part: snippet, statistics; $params (id): videoID
function videosListById($service, $part, $params) {
    $params = array_filter($params);
    $response = $service->videos->listVideos(
        $part,
        $params
    );

    print_r($response);
}
videosListById($service, 'snippet,contentDetails,statistics', array('id' => 'Ks-_Mh1QhMc'));
		//ajax 2: channels; $part: snippet, statistics; $params (id): channelID
function channelsListById($service, $part, $params) {
    $params = array_filter($params);
    $response = $service->channels->listChannels(
        $part,
        $params
    );

    print_r($response);
}
channelsListById($service, 'snippet,contentDetails,statistics', array('id' => 'UC_x5XG1OV2P6uZZ5FSM9Ttw'));


//function searchChannelsByName() - called when ?
	//ajax 1: search; $part: snippet ; $params: q-user input, type-channel, maxResults-10
function searchListByKeyword($service, $part, $params) {
    $params = array_filter($params);
    $response = $service->search->listSearch(
        $part,
        $params
    );

    print_r($response);
}
searchListByKeyword($service, 'snippet', array('maxResults' => 25, 'q' => 'surfing', 'type' => 'channel'));


// https://developers.google.com/youtube/v3/docs/channels/list
//function renderChannelSearchStats() - called when :
	//ajax 1: channels; $part: snippet, statistics ; $params: channel ID
function channelsListById($service, $part, $params) {
    $params = array_filter($params);
    $response = $service->channels->listChannels(
        $part,
        $params
    );

    print_r($response);
}
channelsListById($service, 'snippet,contentDetails,statistics', array('id' => 'UC_x5XG1OV2P6uZZ5FSM9Ttw'));


//function ytChannelApiToDb() - called when ?
	//ajax 1: channels; $part: snippet, statistics; $params: channel id

//function ytVideoApiToDb() - calle
	//ajax 1: search; $part: snippet; $params: channelId, type:video, order:date, maxResults:50, pageToken:pgToken?


?>