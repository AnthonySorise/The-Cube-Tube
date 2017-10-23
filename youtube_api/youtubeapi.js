
$(document).ready(clickHandlers);

function clickHandlers(){
    $('button').click(searchYoutube)
}

// function getTextString(){
//     return $('input').text();
// }


function searchYoutube(string) {
    string = $('input').val();
    $.ajax({
        url: 'https://www.googleapis.com/youtube/v3/search',
        dataType: 'json',
        method: 'get',
        data: {
            key: 'AIzaSyAOr3VvEDRdI5u9KGTrsJ7usMsG5FWcl6s',
            q: string,
            type: 'channelSection',
            part: 'snippet',
            maxResults: 10
        },
        success: function (data) {
            console.log('Youtube success',data);
            for(var i=0; i<data.items.length; i++){
                let responseDiv = $("<div>");
                $('<iframe>',{
                    src: 'https://www.youtube.com/embed/'+data.items[i].id.videoId,
                }).appendTo(responseDiv);
                $(".response").append(responseDiv);
            }

        },
        error: function (data) {
            console.log('something went wrong with YT', data);
        }
    })
}

// 'https://www.youtube.com/channel/'+data.items[0].id.channelId
