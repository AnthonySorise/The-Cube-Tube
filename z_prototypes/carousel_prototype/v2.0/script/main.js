
var suggestCallBack;
$(document).ready(function(){

    $("#channelSearchInput").autocomplete({
        source: function (request, response) {
            $.getJSON("http://suggestqueries.google.com/complete/search?callback=?",
                {
                    "hl": "en", // Language
                    "ds": "yt", // Restrict lookup to youtube
                    "jsonp": "suggestCallBack", // jsonp callback function name
                    "q": request.term, // query term
                    "client": "youtube" // force youtube style response, i.e. jsonp
                }
            );
            suggestCallBack = function (data) {
                var suggestions = [];
                $.each(data[1], function (key, val) {
                    suggestions.push({"value": val[0]});
                });
                suggestions.length = 8; // prune suggestions list to only 5 items
                response(suggestions);
            };
        },
    });


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