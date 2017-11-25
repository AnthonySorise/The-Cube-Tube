<?php  
require_once('./script/api_calls_to_db/access_database/get_user_query.php');
?>
<!--
consider carousel for the video list area:
	issue - accessibility issue
-->
<!DOCTYPE html>
<html>

<head>
		<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-109199068-1"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'UA-109199068-1');
	</script>
	
	<link href="https://fonts.googleapis.com/css?family=Montserrat|Roboto|Audiowide|Arvo" rel="stylesheet">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
	 crossorigin="anonymous">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css" type="text/css" />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
	 crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
	 crossorigin="anonymous"></script>
	<link rel="stylesheet" type="text/css" href="style.css">
	<script type="text/javascript" src="script/api_calls_to_db/access_database/database_api.js"></script>

    <script type="text/javascript" src="script/main.js"></script>
    <script type="text/javascript" src="script/youtube_iframe.js"></script>
    <script type="text/javascript" src="script/channel_search.js"></script>
    <script type="text/javascript" src="script/ui.js"></script>
    <script type="text/javascript" src="script/db.js"></script>
    <script type="text/javascript" src="script/video_list.js"></script>
    <script type="text/javascript" src="script/playlist.js"></script>
    <script type="text/javascript" src="script/apple_compatibility.js"></script>
    <script type="text/javascript" src="script/auto_search.js"></script>
    <script type="text/javascript" src="script/channel_buttons.js"></script>
    <script type="text/javascript" src="script/my_cube.js"></script>
    <script type="text/javascript" src="script/categories.js"></script>
    <!-- <script type="text/javascript" src="script/tour.js"></script> -->
    <script type="text/javascript" src="script/utilities.js"></script>

	<script src="z_prototypes/sampleDatabaseObjects/sampleDatabaseObjects.js"></script>
	<meta name="viewport" content="width=device-width, initial-scale=1.0 maximum-scale=1.0, user-scalable=no">
	<link rel="icon" type='image/png' href="assets/images/ctube_logo.png" sizes="32x32">
	<title>CubeTube 0.1</title>
</head>

<body>
	<nav class="navbar" id="mainNav">
		<div class="container-fluid" id="">
			<!--navbar content main div-->
			<div class="navbar-header">
				<!--nav header div; includes hamburger menu and navbrand-->
				<button type="button" class="navbar-toggle collapsed hamburger" id="channelCategoryHamburger" aria-expanded="true">
					<span class="hamburger-box">
						<span class="glyphicon glyphicon-th-list"></span>
					</span>
				</button>
				<span class="navbar-brand text-center">
					<!-- <img src="assets/images/ctube_logo.png" alt="logo" id="cubeTubeLogo"> -->
					<span id="cubeTubeLogo"></span>
					<span class="logoText hidden-xs">TheCubeTube</span>
				</span>
				<form class="navbar-form channelSearchForm channelSearchFormMobile visible-xs">
					<div class="form-group">
						<div class="input-group">
							<input type="text" class="form-control channelSearchInput" placeholder="search channels" name="channelSearch">
							<span type="button" class="input-group-addon channelSearchButton">
								<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
							</span>
						</div>
					</div>
				</form>
			</div>
			<!--end of nav header div-->

			<!-- having bootstrap js before jquery js makes it so the hamburger menu does not expand -->
			<div class="collapse navbar-collapse text-center" id="mainNav-option">
				<ul class="nav navbar-nav navbar-right">
					<li class="dropdown channelDropDown">
						<a href="#" class="dropdown-toggle hidden-xs dropdownLabelA" role="button" aria-haspopup="true" aria-expanded="false">
							<i class="fa fa-cube" aria-hidden="true"></i>
							MyCube
							<span class="caret"></span>
						</a>
						<a href="#" class="visible-xs closeChannelDropXs">
							close <i class="fa fa-times" aria-hidden="true"></i>
						</a>
						<ul class="dropdown-menu text-center" id="channelCategoryUl">
							<li id="myLinkButton">
								<i class="fa fa-floppy-o" aria-hidden="true" style='color:lightblue'></i>
								Copy Link
							</li>
							<li role="separator" class="divider"></li>
							<li class="dropdownChannelLiLoad">
								<i class="fa fa-refresh" aria-hidden="true"></i>
								Load Channels
							</li>
							<li class="dropdownChannelLiAll">
                                <i class="fa fa-cubes" aria-hidden="true"></i>
                                All
							</li>
                            <li role="separator" class="divider"></li>
                            <ul id="dropdownChannelUl"></ul>
						</ul>
					</li>
				</ul>
				<form class="navbar-right navbar-form channelSearchForm hidden-xs form-inline">
					<!--form for searching channels-->
					<div class="form-group">
						<div class="input-group">
							<input type="text" class="form-control channelSearchInput" placeholder="search channels" name="channelSearch">
							<span type="button" class="input-group-addon channelSearchButton channelToolTip" data-toggle="tooltip" data-placement="bottom" data-trigger="hover" title="Search for channels to add">
								<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
							</span>
						</div>
					</div>
				</form>
			</div>
			<!--end of nav options div-->
		</div>
		<!--end of navbar content main div-->
	</nav>
	<div class="container-fluid">
		<div class="main-content">
			<div class="row videoRowWrapper text-center">
				<!-- <div class="col-sm-3"></div> -->
				<div class="text-center" id="mainVideoContainer">
					
					<!--This is where the iframe element will go-->
					<div id="mainVideo" class="iframeVideo">
						
					</div>
				</div>
			</div>
			<!--end of videoRow div-->
			<div id="listContentWrap">
			<nav class="navbar navbar-inverse" id="midNav">
				<!-- <div class="container-fluid" id=""> -->
					<!--navbar content main div-->
					<div class="navbar-header">
						<!--nav header div; includes hamburger menu and navbrand-->
						<button type="button" class="navbar-toggle collapsed hamburger" data-toggle="collapse" data-target="#midNav-option" data-parent="#accordion"
						 aria-expanded="true">
							<span class="hamburger-box">
								<span class="glyphicon glyphicon-menu-hamburger"></span>
							</span>
						</button>
					</div>
					<!--end of nav header div-->
					<div class="collapse navbar-collapse text-center" id="midNav-option">
						<!--div for nav options-->
						<div class="listUpWrap hidden-xs">
							<button class="btn listUpButton" data-toggle="tooltip" data-placement="bottom" data-container="body" data-trigger="hover" title="show video list">
								<i class="fa fa-angle-double-up fa-2x" aria-hidden="true"></i>
							</button>
						</div>
						<div class="listDropWrap hidden-xs">
							<button class="btn listDropButton" data-toggle="tooltip" data-placement="top" data-container='body' data-trigger="hover" title="hide video list">
								<i class="fa fa-angle-double-down fa-2x" aria-hidden="true"></i>
							</button>
						</div>
						<div class="navbar-nav nav-pills midNavButtonWrap">
							<div class="navbar-nav nav-pills infoButtons hidden-xs">
								<a tabindex="0" id="videoStats" class="btn hidden-xs" role="button" data-trigger="focus" data-container="body" data-placement="top">
									<i class="fa fa-bar-chart fa-2x" aria-hidden="true" data-toggle="tooltip" data-placement="top" data-trigger="hover" title="Video Info"></i>
								</a>
								<a tabindex="0" id="channelInfo" class="btn hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover" data-placement="top" title="" data-content="">
									<i class="fa fa-list-alt fa-2x" aria-hidden="true" data-toggle="tooltip" data-placement="top" data-trigger="hover" title="Channel Info"></i>
								</a>
							</div>
							<div class="navbar-nav nav-pills autoPlayArea">
								<label id="autoplayText">Autoplay</label>
								<label class="switch">
									<input type="checkbox" id='autoplayCheckBox' checked>
									<span class="slider round"></span>
								</label>
							</div>
							<div class="navbar-nav nav-pills autoPlayArea vertSlide">
								<label id="autoplayOrderText">Direction</label>
								<label class="switch vertSwitch">
									<input type="checkbox" id='autoplayOrderCheckBox' checked>
									<span class="slider round vert"></span>
								</label>
							</div>
						</div>
						<div class="mediaControls"></div>
<!--						<form class="navbar-right nav-pills form-inline">-->
<!--							<!--form for searching channels-->
<!--							<div class="form-group">-->
<!--								<div class="input-group">-->
<!--									<input type="text" class="form-control" placeholder="search videos" name="videoSearch" id="videoSearchInput">-->
<!--									<span class="input-group-addon videoToolTip" data-toggle="tooltip" data-placement="bottom" data-trigger="hover" title="search for videos from your channels">-->
<!--										<span class="glyphicon glyphicon-search" aria-hidden="true"></span>-->
<!--									</span>-->
<!--								</div>-->
<!--							</div>-->
<!--						</form>-->
<!--						end of form for channel search-->
                        <div class="navbar-nav nav-pills midNavChannels">
							<span class="midNavBrowsing">
								<p style="display:inline-block">
									Browsing:
								</p>
							</span>
                            <span class="midNavBrowsing browsingLabel label label-info">
								channel name
							</span>
                            <span class="midNavBrowsing">
								<button class="btn btn-success addChannelButton midNavAddBtn">Subscribe</button>
							</span>
                            <span class="midNavWatching">
								<p style="display:inline-block">
                                    Watching:
                                </p>
							</span>
                            <span class="midNavWatching watchingLabel label label-success" data-toggle="tooltip" data-placement="auto" data-container='body' data-trigger="hover focus" title="channel 1, channel 2, channel 3">
								<i class="fa fa-cubes"></i>
								Subscribed Channels
							</span>
                            <span class="midNavPlaylist">
								<p style="display:inline-block">
                                    Watching:
                                </p>
							</span>
                            <span class="midNavPlaylist playlistLabel label label-info" data-toggle="tooltip" data-placement="auto" data-container="body" data-trigger="hover" title="all">
                        		<i class="fa fa-list-ol fa-lg"></i>
                        		Playlist
                        	</span>
                        </div>
					</div>
					<!--end of nav options div-->
				<!-- </div> -->
				<!--end of navbar content main div-->
			</nav>
			<div class="col-xs-12 videoListRowWrapper">
				<!--videoListRow for listing channel videos-->
				<div class="row thRow videoHeader">
					<div class="col-sm-12 col-md-6 thLabel text-center">
						<div class="col-xs-7 col-md-6 thTitle">
							<strong>Title</strong>
						</div>
						<div class="col-xs-2 hidden-xs"></div>

						<div class="col-xs-5 col-sm-2 thChannel">
							<strong>Channel</strong>
						</div>
						<div class="col-xs-2 hidden-xs thUpDate">
							<strong>Date</strong>
						</div>
					</div>
					<div class="hidden-xs hidden-sm col-md-6 thLabel text-center">
						<div class="col-sm-6 thTitle">
							<strong>Title</strong>
						</div>
						<div class="col-xs-2"></div>
						<div class="col-sm-2 thChannel">
							<strong>Channel</strong>
						</div>
						<div class="col-sm-2 thUpDate">
							<strong>Date</strong>
						</div>
					</div>
				</div>

								<!-- placeholder for first time user content: possible instruction area -->
				
								<div class='row contentPlaceholderWrapper'>
									<div class="placeholderBg"></div>
									<div class="col-sm-12 text-center contentPlaceholder">
										<h1 class="text-center hidden-xs">Welcome to TheCubeTube!</h1>
										<h3 class="text-center visible-xs">Welcome to TheCubeTube!</h3>
										<h3 class="hidden-xs">Start by searching for your favorite YouTube channel</h3>
										<h5 class="visible-xs">Start by searching for your favorite YouTube channel</h5>
										<h3 class="hidden-xs">Add channels by clicking the 'add' button, or simply browse content with 'browse'</h3>
										<p class="visible-xs">Add channels by clicking the 'add' button, or simply browse content with 'browse'</p>
										<!--<img src="https://www.paypalobjects.com/webstatic/en_US/i/btn/png/btn_donate_92x26.png">-->
									</div>
								</div>

				<!--end of table header div row-->
				<div id="text-carousel" class="carousel slide" data-ride="carousel" data-interval="0">
					
					<!-- Indicators -->
					<ol class="carousel-indicators hidden-xs hidden-sm">
						<!-- <li data-target="#text-carousel" data-slide-to="0" class="active"></li>
						<li data-target="#text-carousel" data-slide-to="1"></li> -->
						<li id="returnCarouselStart" class="glyphicon glyphicon-fast-backward" onclick=returnToPageOne()></li>
						<li id="currentSlideNumberArea"></li>
					</ol>

					<!-- Wrapper for slides -->
					<div class="row">
						<div class="col-xs-12">
							<div class="carousel-inner">
								<div class="item active pageOne">
									<div class="carousel-content">
										<div class="row tdRow text-center ">
											<!--target each list:
                                                e.g. changing video title
                                                $('#tdList-' + [i] +' .tdTitle')
                                            -->
											<div class="col-xs-12 col-md-6 tdListLeft text-left">
												<div class="col-xs-12 tdList" id="tdList-1">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<!-- when added to playlist target and toggle:
															$('#tdList-'+[i]+' .tdPlaylistBadgeSign i').toggleClass('fa-plus-square fa-check-square-o')
															$('#tdList-'+[i]+' .tdPlaylistNum').text('') -->
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-2">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-3">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-4">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-5">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-6">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-7">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-8">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-9">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-10">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
											</div>
											<div class="col-xs-12 col-md-6 tdListRight text-left">
												<div class="col-xs-12 tdList" id="tdList-11">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-12">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-13">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-14">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-15">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-16">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-17">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-18">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-19">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-20">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="item pageTwo">
									<div class="carousel-content">
										<div class="row tdRow text-center">
											<!--target each list:
                                                e.g. changing video title
                                                $('#tdList-' + [i] +' .tdTitle')
                                            -->
											<div class="col-xs-12 col-md-6 tdListLeft text-left">
												<div class="col-xs-12 tdList" id="tdList-21">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-22">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-23">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-24">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-25">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-26">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-27">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-28">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-29">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-30">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
											</div>
											<div class="col-xs-12 col-md-6 tdListRight text-left">
												<div class="col-xs-12 tdList" id="tdList-31">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-32">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-33">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-34">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-35">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-36">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-37">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-38">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-39">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
												<div class="col-xs-12 tdList" id="tdList-40">
													<div class="col-xs-7 col-md-6 tdTitle">
														<span></span>
													</div>
													<div class="col-xs-1 tdInfo hidden-xs text-center">
														<a tabindex="0" class="btn btn-info hidden-xs" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
														 data-placement="right" title="video info" data-content="a section for video info and picture">
															<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
														</a>
													</div>
													<div class="col-sm-1 hidden-xs tdPlaylist text-center">
														<button class="btn btn-xs tdPlaylistButton" data-toggle="tooltip" data-trigger="hover" data-container="body" data-placement="auto" title="add to playlist">
															<!-- <i class="fa fa-list-ol fa-lg" aria-hidden="true"></i> -->
															<!-- <span class="tdPlaylistBadgeSign"> -->
																<i class="fa fa-plus-square fa-lg"></i>
															<!-- </span> -->
															<span class="tdPlaylistNum">
															</span>
														</button>
													</div>
													<div class="col-xs-5 col-sm-2 tdChannel text-center">

													</div>
													<div class="col-xs-2 hidden-xs tdUpDate text-center">

													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="pageTwo_mobile mobileSlide">
									<div class="carousel-content">
											<div class="row tdRow text-center">
												<div class="col-xs-12 col-md-6 newArea2">
													
												</div>
											</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- Controls -->
					<a class="left carousel-control leftControl" href="#text-carousel" data-slide="prev">
						<span class="glyphicon glyphicon-chevron-left"></span>
					</a>
					<a class="right carousel-control" href="#text-carousel" data-slide='next'>
						<span class="glyphicon glyphicon-chevron-right"></span>
					</a>
				</div>
				<!--end of listRow div-->
			</div>
			<!--end of listRow div-->
			</div>
		</div>
		<!--end of main content div-->
		<!--modal for channel search result-->
		<div class="modal fade" id="channelSearchModal" tabindex="-1" role="dialog" data-backdrop="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content searchModal">
					<div class="modal-header" id="channelSearchModalHeader">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<i class="fa fa-window-close fa-lg" aria-hidden="true"></i>
						</button>
						<form class="channelSearchForm modalChSearch form-inline">
					<!--form for searching channels-->
							<div class="form-group">
								<div class="input-group">
									<input type="text" class="form-control channelSearchInput" placeholder="search channels" name="channelSearch">
									<span type="button" class="input-group-addon channelSearchButton channelToolTip" data-toggle="tooltip" data-placement="bottom" data-trigger="hover" title="Search for channels to add">
										<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
									</span>
								</div>
							</div>
						</form>
					</div>
					<div class="modal-body" id="channelSearchModalBody">
						<li id="chSearch-1" class="col-xs-12">
							<img class="col-xs-4" />
							<h4 class="col-xs-6 col-sm-7 modalChHeader">
								<span class="chName col-xs-6">
								</span>
								<small class="col-xs-5 hidden-xs">subs:
									<span class="chSub"></span>
								</small>
								<a tabindex="0" class="chInfoButton text-center col-xs-1" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
								 data-placement="right" title="Channel Description" data-content="">
									<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
								</a>
							</h4>
							<button class="btn btn-primary browseChannelButton" data-toggle="tooltip" data-placement="top" title="Browse channel videos before adding"
							 data-container="body">Browse</button>
							<button class="btn btn-success addChannelButton"> Subscribe </button>
						</li>
						<li id="chSearch-2" class="col-xs-12">
							<img class="col-xs-4" />
							<h4 class="col-xs-6 col-sm-7 modalChHeader">
								<span class="chName col-xs-6">
								</span>
								<small class="col-xs-5 hidden-xs">subs:
									<span class="chSub"></span>
								</small>
								<a tabindex="0" class="chInfoButton text-center col-xs-1" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
								 data-placement="right" title="Channel Description" data-content="">
									<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
								</a>
							</h4>
							<button class="btn btn-primary browseChannelButton" data-toggle="tooltip" data-placement="top" title="Browse channel videos before adding"
							 data-container="body">Browse</button>
							<button class="btn btn-success addChannelButton"> Subscribe </button>

						</li>
						<li id="chSearch-3" class="col-xs-12">
							<img class="col-xs-4" />
							<h4 class="col-xs-6 col-sm-7 modalChHeader">
								<span class="chName col-xs-6">
								</span>
								<small class="col-xs-5 hidden-xs">subs:
									<span class="chSub"></span>
								</small>
								<a tabindex="0" class="chInfoButton text-center col-xs-1" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
								 data-placement="right" title="Channel Description" data-content="">
									<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
								</a>
							</h4>
							<button class="btn btn-primary browseChannelButton" data-toggle="tooltip" data-placement="top" title="Browse channel videos before adding"
							 data-container="body">Browse</button>
							<button class="btn btn-success addChannelButton"> Subscribe </button>

						</li>
						<li id="chSearch-4" class="col-xs-12">
							<img class="col-xs-4" />
							<h4 class="col-xs-6 col-sm-7 modalChHeader">
								<span class="chName col-xs-6">
								</span>
								<small class="col-xs-5 hidden-xs">subs:
									<span class="chSub"></span>
								</small>
								<a tabindex="0" class="chInfoButton text-center col-xs-1" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
								 data-placement="right" title="Channel Description" data-content="">
									<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
								</a>
							</h4>
							<button class="btn btn-primary browseChannelButton" data-toggle="tooltip" data-placement="top" title="Browse channel videos before adding"
							 data-container="body">Browse</button>
							<button class="btn btn-success addChannelButton"> Subscribe </button>
						</li>
						<li id="chSearch-5" class="col-xs-12">
							<img class="col-xs-4" />
							<h4 class="col-xs-6 col-sm-7 modalChHeader">
								<span class="chName col-xs-6">

								</span>
								<small class="col-xs-5 hidden-xs">subs:
									<span class="chSub"></span>
								</small>
								<a tabindex="0" class="chInfoButton text-center col-xs-1" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
								 data-placement="right" title="Channel Description" data-content="">
									<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
								</a>
							</h4>
							<button class="btn btn-primary browseChannelButton" data-toggle="tooltip" data-placement="top" title="Browse channel videos before adding"
							 data-container="body">Browse</button>
							<button class="btn btn-success addChannelButton"> Subscribe </button>

						</li>
						<li id="chSearch-6" class="col-xs-12">
							<img class="col-xs-4" />
							<h4 class="col-xs-6 col-sm-7 modalChHeader">
								<span class="chName col-xs-6">
								</span>
								<small class="col-xs-5 hidden-xs">subs:
									<span class="chSub"></span>
								</small>
								<a tabindex="0" class="chInfoButton text-center col-xs-1" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
								 data-placement="right" title="Channel Description" data-content="">
									<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
								</a>
							</h4>
							<button class="btn btn-primary browseChannelButton" data-toggle="tooltip" data-placement="top" title="Browse channel videos before adding"
							 data-container="body">Browse</button>
							<button class="btn btn-success addChannelButton"> Subscribe </button>
						</li>
						<li id="chSearch-7" class="col-xs-12">
							<img class="col-xs-4" />
							<h4 class="col-xs-6 col-sm-7 modalChHeader">
								<span class="chName col-xs-6">
								</span>
								<small class="col-xs-5 hidden-xs">subs:
									<span class="chSub"></span>
								</small>
								<a tabindex="0" class="chInfoButton text-center col-xs-1" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
								 data-placement="right" title="Channel Description" data-content="">
									<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
								</a>
							</h4>
							<button class="btn btn-primary browseChannelButton" data-toggle="tooltip" data-placement="top" title="Browse channel videos before adding"
							 data-container="body">Browse</button>
							<button class="btn btn-success addChannelButton"> Subscribe </button>
						</li>
						<li id="chSearch-8" class="col-xs-12">
							<img class="col-xs-4" />
							<h4 class="col-xs-6 col-sm-7 modalChHeader">
								<span class="chName col-xs-6">
								</span>
								<small class="col-xs-5 hidden-xs">subs:
									<span class="chSub"></span>
								</small>
								<a tabindex="0" class="chInfoButton text-center col-xs-1" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
								 data-placement="right" title="Dhannel Cescription" data-content="">
									<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
								</a>
							</h4>
							<button class="btn btn-primary browseChannelButton" data-toggle="tooltip" data-placement="top" title="Browse channel videos before adding"
							 data-container="body">Browse</button>
							<button class="btn btn-success addChannelButton"> Subscribe </button>

						</li>
						<li id="chSearch-9" class="col-xs-12">
							<img class="col-xs-4" />
							<h4 class="col-xs-6 col-sm-7 modalChHeader">
								<span class="chName col-xs-6">
								</span>
								<small class="col-xs-5 hidden-xs">subs:
									<span class="chSub"></span>
								</small>
								<a tabindex="0" class="chInfoButton text-center col-xs-1" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
								 data-placement="right" title="Channel Description" data-content="">
									<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
								</a>
							</h4>
							<button class="btn btn-primary browseChannelButton" data-toggle="tooltip" data-placement="top" title="Browse channel videos before adding"
							 data-container="body">Browse</button>
							<button class="btn btn-success addChannelButton"> Subscribe </button>
						</li>
						<li id="chSearch-10" class="col-xs-12">
							<img class="col-xs-4" />
							<h4 class="col-xs-6 col-sm-7 modalChHeader">
								<span class="chName col-xs-6">
								</span>
								<small class="col-xs-5 hidden-xs">subs:
									<span class="chSub"></span>
								</small>
								<a tabindex="0" class="chInfoButton text-center col-xs-1" role="button" data-trigger="focus" data-container="body" data-toggle="popover"
								 data-placement="right" title="Channel Description" data-content="">
									<i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
								</a>
							</h4>
							<button class="btn btn-primary browseChannelButton" data-toggle="tooltip" data-placement="top" title="Browse channel videos before adding"
							 data-container="body">Browse</button>
							<button class="btn btn-success addChannelButton"> Subscribe </button>
						</li>
					</div>
				</div>
			</div>
		</div>
		<!--modal end for channel search result-->
		<!--modal for user link-->
				<!-- command for modal show:  $('#userLinkModal').modal('show') -->
		<div class="modal fade" id="userLinkModal" tabindex="-1" role="dialog" data-backdrop="static">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header text-center userLinkHeader">
        				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
        					<i class="fa fa-window-close fa-lg" aria-hidden="true"></i>
        				</button>
        				<div class="modal-title-wrap">
        					<h3 class="hidden-xs modal-title userLinkModalTitle">
        						Channel Added!
        					</h3>
        					<h5 class="visible-xs modal-title userLinkModalTitle">
        						Channel Added!
        					</h5>
        				</div>
      				</div>
					<div class="modal-body userLinkBody">
						<div class="linkCopyArea text-center"></div>
						<div class="channelCategoryArea text-center">
							<h3 class="hidden-xs">Categorize your channel:</h3>
							<h5 class="visible-xs">Categorize your channel:</h5>
							<div class="userCategoryExists">
								<label>Add to existing categories</label>
								<div class="form-group form-inline">
									<select name="initialCategorySelect" class="channelCategorySelect form-control" style="width:60%;">
										<option value="cat1">cat1</option>
										<option value="cat2">cat2</option>
									</select>
									<button class="btn btn-success">
										<span class="glyphicon glyphicon-ok"></span>
									</button>
								</div>
								<dl class="col-xs-12 text-center" style="margin-bottom:20px;">
									<dd> ------or------ </dd>
								</dl>
							</div>
							<label>Create a a  new category for this channel.</label>
							<form class="form-inline col-xs-12 col-sm-8 col-sm-offset-2">
								<div class="form-group" style="width:100%;">
									<div class="input-group" style="width:100%;">
										<input type="text" class="form-control channelCategoryInput" placeholder="enter channel category" name="channelCategory">
										<span type="button" class="input-group-addon channelCategoryButton">
											<span class="glyphicon glyphicon-ok"></span>
										</span>
									</div>
								</div>	
							</form>
							
							
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--modal end for user link-->
		<div class="modal fade" id="categoryEditModal" tabindex="-1" role="dialog" data-backdrop="static">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header text-center categoryEditHeader">
        				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
        					<i class="fa fa-window-close fa-lg" aria-hidden="true"></i>
        				</button>
        				<div class="modal-title-wrap">
        					<h3 class="hidden-xs modal-title categoryEditModalTitle">
        						Edit Category
        					</h3>
        					<h5 class="visible-xs modal-title categoryEditModalTitle">
        						Edit Category
        					</h5>
        				</div>
      				</div>
					<div class="modal-body categoryEditBody">
						<div class="channelCategoryArea text-center">
							<h3 class="hidden-xs">Categorize your channel:</h3>
							<h5 class="visible-xs">Categorize your channel:</h5>
							<div class="userCategoryExists">
								<label>Add to existing categories</label>
								<div class="form-group form-inline">
									<select name="initialCategorySelect" class="channelCategorySelect form-control" style="width:60%;">
										<option value="cat1">cat1</option>
										<option value="cat2">cat2</option>
									</select>
									<button class="btn btn-success">
										<span class="glyphicon glyphicon-ok"></span>
									</button>
								</div>
								<dl class="col-xs-12 text-center" style="margin-bottom:20px;">
									<dd> ------or------ </dd>
								</dl>
							</div>
							<label>Create a a  new category for this channel.</label>
							<form class="form-inline col-xs-12 col-sm-8 col-sm-offset-2">
								<div class="form-group" style="width:100%;">
									<div class="input-group" style="width:100%;">
										<input type="text" class="form-control channelCategoryInput" placeholder="enter channel category" name="channelCategory">
										<span type="button" class="input-group-addon channelCategoryButton">
											<span class="glyphicon glyphicon-ok"></span>
										</span>
									</div>
								</div>	
							</form>
							
							
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>

</html>
