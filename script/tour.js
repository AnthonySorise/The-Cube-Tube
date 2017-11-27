// Instance the tour
var tour = new Tour({
    storage: false,
    // backdrop: true,
    steps: [
    {
      element: "#mainVideoContainer",
      title: "Welcome to TheCubeTube!",
      content: "If this is your first time visiting, please use this tour to discover the site",
      placement: 'bottom',
      backdrop: true
    },
    {
      element: "#mainNav",
     
      orphan: true,
      // container: '#mainNav',
      
      // container: "#searchChannel",
      title: 'Search for Channel',
      content: 'Start by searching for your favorite YouTube Channel here ...',
      placement: 'bottom',
      backdrop: true,
      onShow: function(){
        $(".contentPlaceholderWrapper").hide();
        $("#midNav-option").hide();
        $("#mainVideoContainer").hide();
        $("#text-carousel").hide();
        $(".channelSearchButton").hide();
        $("#text-carousel").hide();
        $(".channelDropDown").hide();
        $("#videoSearchInput").hide();
        
      },
      onNext: function(){
        $('.channelSearchForm').submit();
      }
    },
    {
      element: ".addChannelButton",
      
      orphan: true,
      // element: 'body',
      title: 'Select the best match',
      content: "Pick the best selection from the list of YouTube Channels and click 'next'",
      placement: 'auto',
      smartPlacement: true,
      onShow: function(){
        $(".browseChannelButton").hide();
      },
      onNext: function(){
        $("#channelSearchModal").modal("hide")        
        $("#userLinkModal").modal("show");
      }
    },
    {
      element: '#userLinkBody',
      orphan: true,
      title: '!! SAVE THIS LINK !!',
      content: 'This is your custom link for TheCubeTube.  Please save or bookmark this now',
      placement: 'bottom',
      onShow: function (){
        $(".userLinkModalClose").hide();
        
      },
      onNext: function() {
        $("#userLinkModal").modal("hide");
        $("#text-carousel").show();
      }
    },
    {
      element: '#text-carousel',
      orphan: true,
      title: 'Search for videos',
      content: 'Browse videos from the selected channel here...',
      placement: "auto",
      smartPlacement: true,
      // backdrop: true,
      backdropContainer: '#mainNav-option',
      onShow: function(){
        $("#mainVideoContainer").css('opacity', '0.0');
        $("#mainNav-option").css('opacity', '0.1');
        $(".navbar-header").css('opacity', '0.1');
        $("#text-carousel").css('opacity', '1.0');
        },
      onHide: function(){
        $("#mainVideoContainer").css('opacity', '1');
        $("#mainNav-option").css('opacity', '1');
        $(".navbar-header").css('opacity', '1');

        $("#mainVideoContainer").show();
        $("#text-carousel").show();
        $(".channelSearchButton").show();
        $("#text-carousel").show();
        $(".channelDropDown").show();
        $("#videoSearchInput").show();
        
      }  
      
    },
    {
      element: '#channelCategoryUl',
      orphan: true,
      title: 'Filter Channels',
      content: 'Filter your subscriptions, and sort into customer categories!',
      placement: 'left',
      backdrop: true,
      onShow: function() {
        $('.channelDropDown').toggleClass('open')
      },
      onHide: function() {
        $('.channelDropDown').toggleClass('close')
        location.reload();
      }
    },

  ]});
  
//   // Initialize the tour
//   tour.init();
  
//   // Start the to
//   tour.start();