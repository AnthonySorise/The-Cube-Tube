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

var iansSampleSubscriptions = {
     "22w5vMUykkw": {
                    // id:"0Jykp0GFDAY",  Default place from API call, not stored here on db put pulled as key one lines above
                    snippet: {  //**From here to bottom, exact same as return from  'https://www.googleapis.com/youtube/v3/videos'
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
                },
     "Qp3YWu2wGuU": {
                    // id:"0Jykp0GFDAY",  Default place from API call, not stored here on db put pulled as key one lines above
                    snippet: {  //**From here to bottom, exact same as return from  'https://www.googleapis.com/youtube/v3/videos'
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
                },
     "pddqXWGpcQ8": {
                    // id:"0Jykp0GFDAY",  Default place from API call, not stored here on db put pulled as key one lines above
                    snippet: {  //**From here to bottom, exact same as return from  'https://www.googleapis.com/youtube/v3/videos'
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
                },
     "OA8tasCFJ24": {
                    // id:"0Jykp0GFDAY",  Default place from API call, not stored here on db put pulled as key one lines above
                    snippet: {  //**From here to bottom, exact same as return from  'https://www.googleapis.com/youtube/v3/videos'
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
                },
     "SqLI4l59dQM": {
                    // id:"0Jykp0GFDAY",  Default place from API call, not stored here on db put pulled as key one lines above
                    snippet: {  //**From here to bottom, exact same as return from  'https://www.googleapis.com/youtube/v3/videos'
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
                },
     "dGoCL_E9DNE": {
                    // id:"0Jykp0GFDAY",  Default place from API call, not stored here on db put pulled as key one lines above
                    snippet: {  //**From here to bottom, exact same as return from  'https://www.googleapis.com/youtube/v3/videos'
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
                },
     "J-HiPfcwIJM": {
                    // id:"0Jykp0GFDAY",  Default place from API call, not stored here on db put pulled as key one lines above
                    snippet: {  //**From here to bottom, exact same as return from  'https://www.googleapis.com/youtube/v3/videos'
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
                },

                
}

