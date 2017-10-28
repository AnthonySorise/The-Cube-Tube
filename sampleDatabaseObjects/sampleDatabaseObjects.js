//user database object
var user = {
    userId:"f93jd",      //string of text and numbers that is appended to address for unique link
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
            snippet:{   //*From here to line 37, exact same as return from API https://www.googleapis.com/youtube/v3/channels*
                // channelId: "UCjrL1ugI6xGqQ7VEyV6aRAg",  Default place from API call, not stored here on db put pulled as key three lines above
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
            },
            statistics:{
                subscriberCount:"927972",
                videoCount:"620",
                viewCount:"168949569"
            },
            videos:{
                "0Jykp0GFDAY": {
                    // id:"0Jykp0GFDAY",  Default place from API call, not stored here on db put pulled as key one lines above
                    snippet: {  //**From here to bottom, exact same as return from  'https://www.googleapis.com/youtube/v3/videos'
                        channelId:"UCjrL1ugI6xGqQ7VEyV6aRAg",
                        channelTitle:"BBQ Pit Boys",
                        description: "Don't fear the Reaper. Light it up with this classic hot chili pepper cheese burger by the BBQ Pit Boys. It comes with the South Carolina Reaper, known as the hottest pepper on the planet and the Ghost. These burgers are packed with flavor and topped with a Jack Cheese Sauce. Your family and friends will luv 'em.-...Please Subscribe, Fav and Share us. Thanks..!  Are you looking for barbecue and grilling recipes to serve up at your Pit, family picnic, or tailgating party? Then put your Barbecue Shoes on because we're serving up some delicious, moist and tender, and real easy to do cooking on the ol' BBQ grill.↵↵To print out this recipe, or to get your BBQ Pit Boys Pitmasters Certificate, our custom BBQ Pit Boys Old Hickory knife, gifts and more CLICK HERE http://www.bbqpitboys.com/barbecue-store-gifts.↵↵For more information about our Santa Corona Grill used in this video, check out our website here: http://bbqpitboys.com/grill-shop/↵ ↵To purchase our official T-Shirts, Mugs, Aprons, Scarfs, Hoodies, and more shipped to you anywhere in the world CLICK HERE http://www.bbqpitboys.com/barbecue-store-gifts↵↵Cheese Sauce recipe: 8 tablespoons butter, 1/2 cup all-purpose flour, 2 cups whole milk, or more as needed, 1 teaspoon onion powder, 1 teaspoon garlic powder, 24oz. shredded Monterey Jack cheese↵  ↵Become a member of the Pit. Or join a BBQ Pit Boys Chapter, or start your own, now over 15,000 BBQ Pit Boys Chapters formed worldwide. Visit our Website to register http://www.BBQPitBoys.com↵↵Thanks for stopping by the Pit and for your continued support..! --BBQ Pit Boys",
                        publishedAt: "2017-10-21T12:58:06.000Z",
                        thumbnails: {
                            default: {
                                url: "https://i.ytimg.com/vi/0Jykp0GFDAY/default.jpg"
                            },
                            high: {
                                url: "https://i.ytimg.com/vi/0Jykp0GFDAY/hqdefault.jpg"
                            },
                            medium: {
                                url: "https://i.ytimg.com/vi/0Jykp0GFDAY/mqdefault.jpg"
                            },
                            standard: {
                                url: "https://i.ytimg.com/vi/0Jykp0GFDAY/sddefault.jpg"
                            }
                        },
                        title: "Reaper Ghost Cheese Burger recipe by the BBQ Pit Boys"
                    },
                    statistics: {
                        dislikeCount:"99",
                        favoriteCount:"0",
                        likeCount:"3288",
                        viewCount:"91867"
                    }
                }
            }
        },
    },
};


var sampleSubscirptions = [
    {"0Jykp0GFDAY": {
        // id:"0Jykp0GFDAY",  Default place from API call, not stored here on db put pulled as key one lines above
        snippet: {  //**From here to bottom, exact same as return from  'https://www.googleapis.com/youtube/v3/videos'
            channelId:"UCjrL1ugI6xGqQ7VEyV6aRAg",
            channelTitle:"BBQ Pit Boys",
            description: "Don't fear the Reaper. Light it up with this classic hot chili pepper cheese burger by the BBQ Pit Boys. It comes with the South Carolina Reaper, known as the hottest pepper on the planet and the Ghost. These burgers are packed with flavor and topped with a Jack Cheese Sauce. Your family and friends will luv 'em.-...Please Subscribe, Fav and Share us. Thanks..!  Are you looking for barbecue and grilling recipes to serve up at your Pit, family picnic, or tailgating party? Then put your Barbecue Shoes on because we're serving up some delicious, moist and tender, and real easy to do cooking on the ol' BBQ grill.↵↵To print out this recipe, or to get your BBQ Pit Boys Pitmasters Certificate, our custom BBQ Pit Boys Old Hickory knife, gifts and more CLICK HERE http://www.bbqpitboys.com/barbecue-store-gifts.↵↵For more information about our Santa Corona Grill used in this video, check out our website here: http://bbqpitboys.com/grill-shop/↵ ↵To purchase our official T-Shirts, Mugs, Aprons, Scarfs, Hoodies, and more shipped to you anywhere in the world CLICK HERE http://www.bbqpitboys.com/barbecue-store-gifts↵↵Cheese Sauce recipe: 8 tablespoons butter, 1/2 cup all-purpose flour, 2 cups whole milk, or more as needed, 1 teaspoon onion powder, 1 teaspoon garlic powder, 24oz. shredded Monterey Jack cheese↵  ↵Become a member of the Pit. Or join a BBQ Pit Boys Chapter, or start your own, now over 15,000 BBQ Pit Boys Chapters formed worldwide. Visit our Website to register http://www.BBQPitBoys.com↵↵Thanks for stopping by the Pit and for your continued support..! --BBQ Pit Boys",
            publishedAt: "2017-10-21T12:58:06.000Z",
            thumbnails: {
                default: {
                    url: "https://i.ytimg.com/vi/0Jykp0GFDAY/default.jpg"
                },
                high: {
                    url: "https://i.ytimg.com/vi/0Jykp0GFDAY/hqdefault.jpg"
                },
                medium: {
                    url: "https://i.ytimg.com/vi/0Jykp0GFDAY/mqdefault.jpg"
                },
                standard: {
                    url: "https://i.ytimg.com/vi/0Jykp0GFDAY/sddefault.jpg"
                }
            },
            title: "Reaper Ghost Cheese Burger recipe by the BBQ Pit Boys"
        },
        statistics: {
            dislikeCount:"99",
            favoriteCount:"0",
            likeCount:"3288",
            viewCount:"91867"
        }
    }},
    {"vD6qBrdrRYY": {
        snippet: {  //**From here to bottom, exact same as return from  'https://www.googleapis.com/youtube/v3/videos'
            channelId:"UCjrL1ugI6xGqQ7VEyV6aRAg",
            channelTitle:"BBQ Pit Boys",
            description: "No frozen fake food fish fry here. Watch the BBQ Pit Boys cook up some local caught Harbor Blues and Weakfish. They come out crispy tender guuud..! Choose ...",
            publishedAt: "2017-10-14T13:00:04.000Z",
            thumbnails: {
                default: {
                    url: "https://i.ytimg.com/vi/vD6qBrdrRYY/default.jpg"
                },
                high: {
                    url: "https://i.ytimg.com/vi/vD6qBrdrRYY/hqdefault.jpg"
                },
                medium: {
                    url: "https://i.ytimg.com/vi/vD6qBrdrRYY/mqdefault.jpg"
                },
                standard: {
                    url: ""
                }
            },
            title: "Easy Fish Fry by the BBQ Pit Boys"
        },
        statistics: {
            dislikeCount:"208",
            favoriteCount:"0",
            likeCount:"1203",
            viewCount:"13546"
        }
    }},
    {"a2KQQocGmwM": {
        snippet: {  //**From here to bottom, exact same as return from  'https://www.googleapis.com/youtube/v3/videos'
            channelId:"UCjrL1ugI6xGqQ7VEyV6aRAg",
            channelTitle:"BBQ Pit Boys",
            description: "Howto to make some garden fresh pickled peppers and cucumbers,. And its ready to eat in a few days....",
            publishedAt: "2017-09-24T13:00:00.000Z",
            thumbnails: {
                default: {
                    url: "https://i.ytimg.com/vi/a2KQQocGmwM/default.jpg"
                },
                high: {
                    url: "https://i.ytimg.com/vi/a2KQQocGmwM/hqdefault.jpg"
                },
                medium: {
                    url: "https://i.ytimg.com/vi/a2KQQocGmwM/mqdefault.jpg"
                },
                standard: {
                    url: ""
                }
            },
            title: "Easy Pepper Pickles recipe"
        },
        statistics: {
            dislikeCount:"23",
            favoriteCount:"0",
            likeCount:"2456",
            viewCount:"53435"
        }
    }},
    {"v0-QZmJ_WaY": {
        snippet: {  //**From here to bottom, exact same as return from  'https://www.googleapis.com/youtube/v3/videos'
            channelId:"UCjrL1ugI6xGqQ7VEyV6aRAg",
            channelTitle:"BBQ Pit Boys",
            description: "Nothing better than taking some time to go crabbing, and cooking up some fresh Blues. If you have that Blue Crab Blues then check this out. . -...Please ...",
            publishedAt: "2017-09-23T13:00:03.000Z",
            thumbnails: {
                default: {
                    url: "https://i.ytimg.com/vi/v0-QZmJ_WaY/default.jpg"
                },
                high: {
                    url: "https://i.ytimg.com/vi/v0-QZmJ_WaY/hqdefault.jpg"
                },
                medium: {
                    url: "https://i.ytimg.com/vi/v0-QZmJ_WaY/mqdefault.jpg"
                },
                standard: {
                    url: ""
                }
            },
            title: "Blue Crab Blues recipe"
        },
        statistics: {
            dislikeCount:"28",
            favoriteCount:"4",
            likeCount:"1200",
            viewCount:"56879"
        }
    }},
    {"1MDJEfp04C0": {
        snippet: {  //**From here to bottom, exact same as return from  'https://www.googleapis.com/youtube/v3/videos'
            channelId:"UCjrL1ugI6xGqQ7VEyV6aRAg",
            channelTitle:"BBQ Pit Boys",
            description: "munching on them bones...",
            publishedAt: "2017-09-22T20:20:57.000Z",
            thumbnails: {
                default: {
                    url: "https://i.ytimg.com/vi/1MDJEfp04C0/default.jpg"
                },
                high: {
                    url: "https://i.ytimg.com/vi/1MDJEfp04C0/hqdefault.jpg"
                },
                medium: {
                    url: "https://i.ytimg.com/vi/1MDJEfp04C0/mqdefault.jpg"
                },
                standard: {
                    url: ""
                }
            },
            title: "Pit Chickens Live"
        },
        statistics: {
            dislikeCount:"69",
            favoriteCount:"3",
            likeCount:"4568",
            viewCount:"85246"
        }
    }},
    {"l4KVcE6OBVo": {
        snippet: {  //**From here to bottom, exact same as return from  'https://www.googleapis.com/youtube/v3/videos'
            channelId:"UCjrL1ugI6xGqQ7VEyV6aRAg",
            channelTitle:"BBQ Pit Boys",
            description: "Fresh caught Blue Crab and Sea Bass are on the menu at the Pit. -...Please Subscribe, Fav and Share us. Thanks..! Are you looking for barbecue and grilling ...",
            publishedAt: "2017-09-16T13:00:04.000Z",
            thumbnails: {
                default: {
                    url: "https://i.ytimg.com/vi/l4KVcE6OBVo/default.jpg"
                },
                high: {
                    url: "https://i.ytimg.com/vi/l4KVcE6OBVo/hqdefault.jpg"
                },
                medium: {
                    url: "https://i.ytimg.com/vi/l4KVcE6OBVo/mqdefault.jpg"
                },
                standard: {
                    url: ""
                }
            },
            title: "Crab and Fish Stew"
        },
        statistics: {
            dislikeCount:"135",
            favoriteCount:"0",
            likeCount:"1536",
            viewCount:"54035"
        }
    }},
    {"hl9wh2y0Ca0": {
        snippet: {  //**From here to bottom, exact same as return from  'https://www.googleapis.com/youtube/v3/videos'
            channelId:"UCjrL1ugI6xGqQ7VEyV6aRAg",
            channelTitle:"BBQ Pit Boys",
            description: "Plain and simple crispy roll hotdogs kicked up a notch. And they're real easy to do And all you need is a good sausage and some bread and butter. -...Please ...\"",
            publishedAt: "2017-09-09T13:00:05.000Z",
            thumbnails: {
                default: {
                    url: "https://i.ytimg.com/vi/hl9wh2y0Ca0/default.jpg"
                },
                high: {
                    url: "https://i.ytimg.com/vi/hl9wh2y0Ca0/hqdefault.jpg"
                },
                medium: {
                    url: "https://i.ytimg.com/vi/hl9wh2y0Ca0/mqdefault.jpg"
                },
                standard: {
                    url: ""
                }
            },
            title: "HotDogs!"
        },
        statistics: {
            dislikeCount:"135",
            favoriteCount:"0",
            likeCount:"2456",
            viewCount:"65243"
        }
    }},
    {"22w5vMUykkw": {
        // id:"0Jykp0GFDAY",  Default place from API call, not stored here on db put pulled as key one lines above
        snippet: {  //**From here to bottom, exact same as return from  'https://www.googleapis.com/youtube/v3/videos'
            channelId: "CMNmwqCtCSpftrbvR3KkHDA",
            channelTitle: "Guava Juice",
            description: "Get your own Guava Juice Box ➽ https://goo.gl/0dTjI7 Subscribe and become a Guava Juicer!! ➽ http://bit.ly/GUAVAJUICE Guava Juice Merchandise ...",
            publishedAt: "2017-10-26T19:06:09.000Z",
            thumbnails: {
                default: {
                    url: "https://i.ytimg.com/vi/22w5vMUykkw/default.jpg"
                },
                high: {
                    url: "https://i.ytimg.com/vi/22w5vMUykkw/hqdefault.jpg"
                },
                medium: {
                    url: "https://i.ytimg.com/vi/22w5vMUykkw/mqdefault.jpg"
                },
                standard: {
                    url: ""
                }
            },
            title: "GUAVA JUICE BOX 5 HOLIDAY EDITION UNBOXING!"

        },
        statistics: {
            dislikeCount:"261",
            favoriteCount:"0",
            likeCount:"6045",
            viewCount:"149395"
        }
    }},
    {"Qp3YWu2wGuU": {
        // id:"0Jykp0GFDAY",  Default place from API call, not stored here on db put pulled as key one lines above
        snippet: {  //**From here to bottom, exact same as return from  'https://www.googleapis.com/youtube/v3/videos'
            channelId: "CMNmwqCtCSpftrbvR3KkHDA",
            channelTitle: "Guava Juice",
            description: "Today I attempt to eat the spiciest chip in the world! Subscribe and become a GUAV! ➽ http://bit.ly/GUAVAJUICE Get your own Guava Juice Box ...",
            publishedAt: "2017-10-25T21:27:05.000Z",
            thumbnails: {
                default: {
                    url: "https://i.ytimg.com/vi/Qp3YWu2wGuU/default.jpg"
                },
                high: {
                    url: "https://i.ytimg.com/vi/Qp3YWu2wGuU/hqdefault.jpg"
                },
                medium: {
                    url: "https://i.ytimg.com/vi/Qp3YWu2wGuU/mqdefault.jpg"
                },
                standard: {
                    url: ""
                }
            },
            title: "Eating The Spiciest Chip In The World!"
        },
        statistics: {
            dislikeCount:"16",
            favoriteCount:"0",
            likeCount:"10936",
            viewCount:"275938"
        }
    }},
    {"pddqXWGpcQ8": {
        // id:"0Jykp0GFDAY",  Default place from API call, not stored here on db put pulled as key one lines above
        snippet: {  //**From here to bottom, exact same as return from  'https://www.googleapis.com/youtube/v3/videos'
            channelId: "CMNmwqCtCSpftrbvR3KkHDA",
            channelTitle: "Guava Juice",
            description: "Today I bathe in Nachos and Cheese! Donation Receipt! ➽ https://ibb.co/gu7evm Subscribe and become a GUAV! ➽ http://bit.ly/GUAVAJUICE Get your own ...",
            publishedAt: "2017-10-24T19:46:39.000Z",
            thumbnails: {
                default: {
                    url: "https://i.ytimg.com/vi/pddqXWGpcQ8/default.jpg"
                },
                high: {
                    url: "https://i.ytimg.com/vi/pddqXWGpcQ8/hqdefault.jpg"
                },
                medium: {
                    url: "https://i.ytimg.com/vi/pddqXWGpcQ8/mqdefault.jpg"
                },
                standard: {
                    url: ""
                }
            },
            title: "NACHO CHEESE BATH CHALLENGE!"
        },
        statistics: {
            dislikeCount:"31",
            favoriteCount:"0",
            likeCount:"92758",
            viewCount:"452956"
        }
    }},
    {"OA8tasCFJ24": {
        // id:"0Jykp0GFDAY",  Default place from API call, not stored here on db put pulled as key one lines above
        snippet: {  //**From here to bottom, exact same as return from  'https://www.googleapis.com/youtube/v3/videos'
            channelId: "CMNmwqCtCSpftrbvR3KkHDA",
            channelTitle: "Guava Juice",
            description: "Hey Guavs! This is the third and final #NoiseChallenge vid! #AD Can me and my lil bro Reymound stay quiet long enough to win? Can YOU beat our record?",
            publishedAt: "2017-10-23T17:56:53.000Z",
            thumbnails: {
                default: {
                    url: "https://i.ytimg.com/vi/OA8tasCFJ24/default.jpg"
                },
                high: {
                    url: "https://i.ytimg.com/vi/OA8tasCFJ24/hqdefault.jpg"
                },
                medium: {
                    url: "https://i.ytimg.com/vi/OA8tasCFJ24/mqdefault.jpg"
                },
                standard: {
                    url: ""
                }
            },
            title: "THE FINAL QUIETEST CHALLENGE! (ft. Baby Brother)"
        },
        statistics: {
            dislikeCount:"27",
            favoriteCount:"0",
            likeCount:"11748",
            viewCount:"836209"
        }
    }},
    {"SqLI4l59dQM": {
        // id:"0Jykp0GFDAY",  Default place from API call, not stored here on db put pulled as key one lines above
        snippet: {  //**From here to bottom, exact same as return from  'https://www.googleapis.com/youtube/v3/videos'
            channelId: "CMNmwqCtCSpftrbvR3KkHDA",
            channelTitle: "Guava Juice",
            description: "My little brother buys my outfits! Subscribe and become a GUAV! ➽ http://bit.ly/GUAVAJUICE Guava Juice iPhone 8 Giveaway ...",
            publishedAt: "2017-10-22T18:39:50.000Z",
            thumbnails: {
                default: {
                    url: "https://i.ytimg.com/vi/SqLI4l59dQM/default.jpg"
                },
                high: {
                    url: "https://i.ytimg.com/vi/SqLI4l59dQM/hqdefault.jpg"
                },
                medium: {
                    url: "https://i.ytimg.com/vi/SqLI4l59dQM/mqdefault.jpg"
                },
                standard: {
                    url: ""
                }
            },
            title: "My Brother Buys My Outfits Challenge!"
        },
        statistics: {
            dislikeCount:"65",
            favoriteCount:"0",
            likeCount:"9347",
            viewCount:"742384"
        }
    }},
    {"dGoCL_E9DNE": {
        // id:"0Jykp0GFDAY",  Default place from API call, not stored here on db put pulled as key one lines above
        snippet: {  //**From here to bottom, exact same as return from  'https://www.googleapis.com/youtube/v3/videos'
            channelId: "CMNmwqCtCSpftrbvR3KkHDA",
            channelTitle: "Guava Juice",
            description: "Weird things happened when I was trying to film this video.. Subscribe and become a GUAV! ➽ http://bit.ly/GUAVAJUICE Guava Juice iPhone 8 Giveaway ...",
            publishedAt: "2017-10-21T19:23:30.000Z",
            thumbnails: {
                default: {
                    url: "https://i.ytimg.com/vi/dGoCL_E9DNE/default.jpg"
                },
                high: {
                    url: "https://i.ytimg.com/vi/dGoCL_E9DNE/hqdefault.jpg"
                },
                medium: {
                    url: "https://i.ytimg.com/vi/dGoCL_E9DNE/mqdefault.jpg"
                },
                standard: {
                    url: ""
                }
            },
            title: "Something Scary Happened While Filming A Video (Ghost)"
        },
        statistics: {
            dislikeCount:"54",
            favoriteCount:"0",
            likeCount:"11948",
            viewCount:"839567"
        }
    }},
    {"J-HiPfcwIJM": {
        // id:"0Jykp0GFDAY",  Default place from API call, not stored here on db put pulled as key one lines above
        snippet: {  //**From here to bottom, exact same as return from  'https://www.googleapis.com/youtube/v3/videos'
            channelId: "CMNmwqCtCSpftrbvR3KkHDA",
            channelTitle: "Guava Juice",
            description: "Today we're going to explore a haunted parking garage at 3AM Subscribe and become a GUAV! ➽ http://bit.ly/GUAVAJUICE Guava Juice iPhone 8 Giveaway ...",
            publishedAt: "2017-10-20T19:19:49.000Z",
            thumbnails: {
                default: {
                    url: "https://i.ytimg.com/vi/J-HiPfcwIJM/default.jpg"
                },
                high: {
                    url: "https://i.ytimg.com/vi/J-HiPfcwIJM/hqdefault.jpg"
                },
                medium: {
                    url: "https://i.ytimg.com/vi/J-HiPfcwIJM/mqdefault.jpg"
                },
                standard: {
                    url: ""
                }
            },
            title: "Do Not Explore Haunted Parking Garage at 3AM (Ghost)"
        },
        statistics: {
            dislikeCount:"43",
            favoriteCount:"0",
            likeCount:"30678",
            viewCount:"853278"
        }
    }},
    {"bRuLGVagk84": {
        snippet: {
            channelId: "UCHEf6T_gVq4tlW5i91ESiWg",
            channelTitle: "REACT",
            description: "College Kids try Halloween Candy! Watch all People Vs Food Eps! http://goo.gl/KjLw5C SUBSCRIBE THEN HIT THE ! New Videos 12pm PT on REACT!",
            publishedAt: "2017-10-26T19:00:02.000Z",
            thumbnails: {
                default: {
                    url: "https://i.ytimg.com/vi/bRuLGVagk84/default.jpg"
                },
                high: {
                    url: "https://i.ytimg.com/vi/bRuLGVagk84/hqdefault.jpg"
                },
                medium: {
                    url: "https://i.ytimg.com/vi/bRuLGVagk84/mqdefault.jpg"
                },
                standard: {
                    url: ""
                }
            },
            title: "GUESS THAT HALLOWEEN CANDY CHALLENGE! | COLLEGE KIDS vs. FOOD"
        },
        statistics: {
            dislikeCount:"110",
            favoriteCount:"0",
            likeCount:"6141",
            viewCount:"70136"
        }
    }},
    {"imfhW8sk2mg": {
        snippet: {
            channelId: "UCRH49DSFyl8oPwsiHyZ9O0g",
            channelTitle: "DSNY Newscast - The World of Disney News",
            description: "We discuss the breaking news that Disney have decided to SCRAP the Eastern Gateway Project in favour of a new Western Gateway into Downtown Disney",
            publishedAt: "2017-10-26T01:26:47.000Z",
            thumbnails: {
                default: {
                    url: "https://i.ytimg.com/vi/imfhW8sk2mg/default.jpg"
                },
                high: {
                    url: "https://i.ytimg.com/vi/imfhW8sk2mg/hqdefault.jpg"
                },
                medium: {
                    url: "https://i.ytimg.com/vi/imfhW8sk2mg/mqdefault.jpg"
                },
                standard: {
                    url: ""
                }
            },
            title: "Disney SCRAPS Eastern Gateway for Downtown Disney Entrance Area - Disney News - 10/25/17"
        },
        statistics: {
            dislikeCount:"8",
            favoriteCount:"0",
            likeCount:"1009",
            viewCount:"20242"
        }
    }},
    {"DKVJ52qwWWQ": {
        snippet: {
            channelId: "UC0M0rxSz3IF0CsSour1iWmw",
            channelTitle: "Cinemassacre",
            description: "Full playthrough of Castlevania: Chorus of Mysteries (NES Hack) by Mike Matei↵Twitter Mike ✜ https://twitter.com/Mike_Matei↵↵This is edited down from two live streams that were done on the Cinemassacre Plays Channel. If you'd like to see the fully unedited playthroughs use these links↵Part 1 https://www.youtube.com/watch?v=ub8zPpui0p0↵Part 2 https://www.youtube.com/watch?v=NGg1fyJJgmQ",
            publishedAt: "2017-10-24T05:42:14.000Z",
            thumbnails: {
                default: {
                    url: "https://i.ytimg.com/vi/DKVJ52qwWWQ/default.jpg"
                },
                high: {
                    url: "https://i.ytimg.com/vi/DKVJ52qwWWQ/hqdefault.jpg"
                },
                medium: {
                    url: "https://i.ytimg.com/vi/DKVJ52qwWWQ/maxresdefault.jpg"
                },
                standard: {
                    url: "https://i.ytimg.com/vi/DKVJ52qwWWQ/sddefault.jpg"
                }
            },
            title: "Castlevania: Chorus of Mysteries - Full Playthrough"
        },
        statistics: {
            dislikeCount:"305",
            favoriteCount:"0",
            likeCount:"1758",
            viewCount:"101358"
        }
    }},
    {"wg6PfxpPQeM": {
        snippet: {
            channelId:"UCZvoUuniFzmOjfBt67lNsEQ",
            channelTitle:"BuzzFeedFood",
            description: "Get the whole family together for breakfast!↵↵Check out more awesome BuzzFeedFood videos! ↵http://bit.ly/YTbuzzfeedfood↵↵↵MUSIC↵All Heart↵Licensed via Warner Chappell Production Music Inc. ↵↵SFX provided by Audioblocks. ↵(https://www.Audioblocks.com)↵↵Footage provided by VideoBlocks↵http://vblocks.co/x/BuzzFeedYouTube↵↵↵Made by BFMP www.buzzfeed.com/videoteam↵↵↵GET MORE BUZZFEED:↵www.buzzfeed.com↵www.buzzfeed.com/video↵www.buzzfeed.com/videoteam↵www.youtube.com/buzzfeedvideo↵www.youtube.com/buzzfeedyellow↵www.youtube.com/buzzfeedblue↵www.youtube.com/buzzfeedviolet↵www.youtube.com/buzzfeed",
            publishedAt: "2016-01-07T23:00:01.000Z",
            thumbnails: {
                default: {
                    url: "https://i.ytimg.com/vi/wg6PfxpPQeM/default.jpg"
                },
                high: {
                    url: "https://i.ytimg.com/vi/wg6PfxpPQeM/hqdefault.jpg"
                },
                medium: {
                    url: "https://i.ytimg.com/vi/wg6PfxpPQeM/mqdefault.jpg"
                },
                standard: {
                    url: "https://i.ytimg.com/vi/wg6PfxpPQeM/sddefault.jpg"
                }
            },
            title: "2 Breakfast Bake Recipes"
        },
        statistics: {
            dislikeCount:"85",
            favoriteCount:"0",
            likeCount:"9090",
            viewCount:"555143"
        }
    }},
    {"xNddRhpx5tA": {
        snippet: {
            channelId:"UCYUQQgogVeQY8cMQamhHJcg",
            channelTitle:"CinemaSins",
            description: "For October, we like going back and hitting some older horror films we've never covered. And Friday the 13th Part 2 has oodles of sins. ↵↵Next week: A couple more creepy sins.↵↵Remember, no movie is without sin! Which movie's sins should we expose next?!↵↵Podcast: http://soundcloud.com/cinemasins↵Sins Video Playlist: http://www.youtube.com/watch?v=wy-v4c4is-w&list=PLMWfZxj1nTkQBy4AeRGG4xH5d2IIApNPj↵Tweet us: http://twitter.com/cinemasins↵Reddit with us: http://reddit.com/r/cinemasins↵Tumble us: http://cinema-sins.tumblr.com↵Call us: 405-459-7466↵Jeremy's book: http://theablesbook.com",
            publishedAt: "2017-10-12T16:06:03.000Z",
            thumbnails: {
                default: {
                    url: "https://i.ytimg.com/vi/xNddRhpx5tA/default.jpg"
                },
                high: {
                    url: "https://i.ytimg.com/vi/xNddRhpx5tA/hqdefault.jpg"
                },
                medium: {
                    url: "https://i.ytimg.com/vi/xNddRhpx5tA/mqdefault.jpg"
                },
                standard: {
                    url: "https://i.ytimg.com/vi/xNddRhpx5tA/sddefault.jpg"
                }
            },
            title: "Everything Wrong With Friday the 13th Part 2"
        },
        statistics: {
            dislikeCount:"488",
            favoriteCount:"0",
            likeCount:"24876",
            viewCount:"1094813"
        }
    }},
    {
        "gHgBk2fLLHY": {
            snippet: {
                channelId: "UCZGYJFUizSax-yElQaFDp5Q",
                channelTitle: "Star Wars",
                description: "See how director Rian Johnson is taking the characters of a galaxy far, far away into new directions in this behind-the-scenes look at Star Wars: The Last Jedi.↵↵Visit Star Wars at http://www.starwars.com↵Subscribe to Star Wars on YouTube at http://www.youtube.com/starwars↵Like Star Wars on Facebook at http://www.facebook.com/starwars↵Follow Star Wars on Twitter at http://www.twitter.com/starwars↵Follow Star Wars on Instagram at http://www.instagram.com/starwars↵Follow Star Wars on Tumblr at http://starwars.tumblr.com/",
                publishedAt: "2017-10-26T04:00:01.000Z",
                thumbnails: {
                    default: {
                        url: "https://i.ytimg.com/vi/gHgBk2fLLHY/default.jpg"
                    },
                    high: {
                        url: "https://i.ytimg.com/vi/gHgBk2fLLHY/hqdefault.jpg"
                    },
                    medium: {
                        url: "https://i.ytimg.com/vi/gHgBk2fLLHY/mqdefault.jpg"
                    },
                    standard: {
                        url: "https://i.ytimg.com/vi/gHgBk2fLLHY/sddefault.jpg"
                    }
                },
                title: "Directing The Last Jedi"
            },
            statistics: {
                dislikeCount: "156",
                favoriteCount: "0",
                likeCount: "15868",
                viewCount: "218422"
            }
        }
    }];