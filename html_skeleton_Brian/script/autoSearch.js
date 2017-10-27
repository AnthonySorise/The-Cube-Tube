jQuery(function() {
    jQuery("#channelSearchInput").autocomplete({
        source: function (request, response) {
            //console.log(request.term);
            var sqValue = [];
            jQuery.ajax({
                type: "POST",
                url: "http://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1",
                dataType: 'jsonp',
                data: jQuery.extend({
                    q: request.term
                }, {}),
                success: function (data) {
                    console.log(data[1]);
                    obj = data[1];
                    jQuery.each(obj, function (key, value) {
                        sqValue.push(value[0]);
                    });
                    response(sqValue);
                }
            });
        }
    });
})