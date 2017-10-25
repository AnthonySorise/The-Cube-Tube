//user database object
var user = {
    userId:"f93jdkd",      //string of text and numbers that is appended to address for unique link
    categories:{
        uncategorized:[            //channel Ids the user is subscribed to separated into categories
            "UCjrL1ugI6xGqQ7VEyV6aRAg",
            "UCUcyEsEjhPEDf69RRVhRh4A",
            "UC67f2Qf7FYhtoUIF4Sf29cA"
        ]
    }
};

//content database object                 TODO channel subscriber count
var content = {
    channels:{
        "UCjrL1ugI6xGqQ7VEyV6aRAg": {
            snippet:{   //*modeled after YouTube API*
                // channelId: "UCjrL1ugI6xGqQ7VEyV6aRAg",       Not stored here, but pulled and used as key within "channels" object 3 lines above
                channelTitle: "BBQ Pit Boys",
                description: "YouTube's and Facebook's #1 Channel for Barbecue and Grilling with 600+ recipes, 360000000 views, and 2000000 subscribers and Likes, the BBQ Pit Boys ...",
                thumbnails: {//Not sure what size to use
                    default: {
                        url:"https://yt3.ggpht.com/-w5MgnW1qxCw/AAAAAAAAAAI/AAAAAAAAAAA/ywS4ukZBIaM/s88-c-k-no-mo-rj-c0xffffff/photo.jpg"
                    },
                    high:{
                        url:"https://yt3.ggpht.com/-w5MgnW1qxCw/AAAAAAAAAAI/AAA…ywS4ukZBIaM/s240-c-k-no-mo-rj-c0xffffff/photo.jpg"
                    },
                    medium:{
                        url:"https://yt3.ggpht.com/-w5MgnW1qxCw/AAAAAAAAAAI/AAA…ywS4ukZBIaM/s240-c-k-no-mo-rj-c0xffffff/photo.jpg"
                    }
                }
            }
        },
    }
};



