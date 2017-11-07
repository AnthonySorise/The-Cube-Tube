 function Database(){
    var self = this;
    this.user_id_hold = null;
    this.channel_id_hold = null;
    this.delete_ctu = function(ctu_id){//delete by specifying ctu id
        $.ajax({
            url:'./script/api_calls_to_db/access_database/access.php',
            method:'post',
            dataType:'JSON',
            data:{
                id: ctu_id,
                action:'delete_ctu'
            },
            success:function(data){
                if(data.success){
                    console.log('deleted success', data);
                }
            },
            errors:function(data){
                console.log(data['errors']);
            }
        })
    }
     this.insert_channel = function(channel_object){//pass in channelobject and deconstruct it, match items in data object
         const {youtube_channel_id, channel_title, description, thumbnail} = channel_object;
         $.ajax({
             url:'./script/api_calls_to_db/access_database/access.php',
             method:'post',
             dataType:'JSON',
             data:{
                 action:'insert_channel',
                 youtube_channel_id:youtube_channel_id,
                 channel_title:channel_title,
                 description:description,
                 thumbnail:thumbnail
             },
             success:function(data){
                 if(data.success){
                     console.log('insert channel success', data);
                     self.channel_id_hold = data.id;
                 }
             },
             errors:function(data){
                 console.log('insert error');
             }
         })
     }
     this.insert_ctu = function(user_id,channel_id){//takes integers
         $.ajax({
             url:'./script/api_calls_to_db/access_database/access.php',
             method:'post',
             dataType:'JSON',
             data:{
                 user_id:user_id,
                 channel_id:channel_id,
                 action:'insert_ctu'
             },
             success:function(data){
                 if(data.success){
                     console.log('insert ctu success', data);
                 }
             },
             errors:function(){
                 console.log(data['insert errors']);
             }
         })
     }
     this.insert_user = function(link){//custom link
         $.ajax({
             url:'./script/api_calls_to_db/access_database/access.php',
             method:'POST',
             dataType:'JSON',
             data:{
                 action:'insert_user',
                 user_link: link
             },
             success:function(data){
                 console.log(data);
                 if(data["success"]){
                     console.log('insert user success', data);
                 }
             },
             errors:function(data){
                 console.log(data['errors'])
             }
         })
         // return promise
     }
     this.insert_video = function (videoArray) {//pass in video array
         $.ajax({
             url: './script/api_calls_to_db/access_database/access.php',
             method: 'POST',
             dataType: 'JSON',
             data: {
                 action: 'insert_video',
                 videoArray: videoArray
             },
             success: function (data) {
                 if (data.success) {
                     console.log('insert video success', data);
                 }
             },
             errors: function (data) {
                 console.log('insert error', data);
             }
         })
     }
     this.read_channels_by_user_id = function(user_id){//itll read channel based on user, just pass in user id
         $.ajax({
             url: './script/api_calls_to_db/access_database/access.php ',
             method: 'POST',
             dataType: 'JSON',
             data: {
                 action: 'read_channels_by_user_id',
                 user_id:user_id
             },
             success: function (data) {
                 if (data.success) {
                     console.log('read success', data);
                 }
             },
             errors: function (data) {
                 console.log('read error', data);
             }
         })
     }
     this.read_ctu = function(user_id){//give u all channels to users based on user id
         $.ajax({
             url: './script/api_calls_to_db/access_database/access.php',
             method: 'POST',
             dataType: 'JSON',
             data: {
                 action: 'read_ctu',
                 user_id: user_id
             },
             success: function (data) {
                 if (data.success) {
                     console.log('read success', data);
                 }
             },
             errors: function (data) {
                 console.log('read error', data);
             }
         })
     }
    this.read_channels_by_youtube_id = function(youtube_channel_id){//read data from any table i.e "channels", "users", "videos","channels_to_users", search = "*" for all or more specifically channel_titles
        $.ajax({
            url:'./script/api_calls_to_db/access_database/access.php',
            method:'post',
            dataType:'JSON',
            data:{
                youtube_channel_id:youtube_channel_id,
                action:'read_channels_by_youtube_id'
            },
            success:function(data){
                if(data.success){
                    console.log('read data success', data);
                }else{
                    console.log(data);
                }
            },
            errors:function(data){
                console.log(data['read errors'], data);
            }
        })
    }
    this.read_videos = function(offset,user_id){//read videos with limit 40 based on user_id, can give an offset to read more.
        $.ajax({
            url: './script/api_calls_to_db/access_database/access.php',
            method: 'POST',
            dataType: 'JSON',
            data: {
                action: 'read_videos',
                offset: offset,
                user_id:user_id
            },
            success: function (data) {
                if (data.success) {
                    console.log('read video success', data);
                }
            },
            errors: function (data) {
                console.log('read error', data);
            }
        })
    }
    this.read_user = function(user_link){
        $.ajax({
            url: './script/api_calls_to_db/access_database/access.php',
            method: 'POST',
            dataType: 'JSON',
            data: {
                action:'read_user',
                user_id:user_link
            },
            success: function (data) {
                if (data.success) {
                    console.log('read success', data);
                    self.user_id_hold = data.id;

                }
            },
            errors: function (data) {
                console.log('read error', data);
            }
        })
        // return promise
    }
     this.read_videos_by_channel = function(youtube_channel_id,offset){//give u a list of videos bassed on channels, limit 40, can pass in offset
         $.ajax({
             url: './script/api_calls_to_db/access_database/access.php',
             method: 'POST',
             dataType: 'JSON',
             data: {
                 action:'read_videos_by_channel',
                 youtube_channel_id:youtube_channel_id,
                 offset:offset
             },
             success: function (data) {
                 if (data.success) {
                     console.log('read success', data);
                 }
             },
             errors: function (data) {
                 console.log('read error', data);
             }
         })
     }
     this.update_channel = function(channel_object){//pass in channelobject and deconstruct it, match items in data object
         const {channel_id, channel_title, description, thumbnail} = channel_object;
         $.ajax({
             url:'./script/api_calls_to_db/access_database/access.php',
             method:'post',
             dataType:'JSON',
             data:{
                 action:'update_channel',
                 channel_id:channel_id,
                 channel_title:channel_title,
                 description:description,
                 thumbnail:thumbnail,
             },
             success:function(data){
                 if(data.success){
                     console.log('update success', data);
                 }
             },
             errors:function(data){
                 console.log('update error', data);
             }
         })
     }
    this.update_video = function(video_object){//pass in video object with things inside the data object
        const {channel_title,description,video_id} = video_object;
        $.ajax({
            url:'./script/api_calls_to_db/access_database/access.php',
            method:'post',
            dataType:'JSON',
            data:{
                action:'update_video',
                channel_title:channel_title,
                description:description,
                video_id:video_id
            },
            success:function(data){
                if(data.success){
                    console.log('update success', data);
                }
            },
            errors:function(data){
                console.log('update error', data);
            }
        })
    }
     this.read_videos_by_channel_array = function(channel_id_array,offset){//give u a list of videos bassed on channels, limit 40, can pass in offset
         $.ajax({
             url: './script/api_calls_to_db/access_database/access.php',
             method: 'POST',
             dataType: 'JSON',
             data: {
                 action:'read_videos_by_channel_array',
                 channel_id_array:channel_id_array,
                 offset:offset
             },
             success: function (data) {
                 if (data.success) {
                     console.log('read success', data);
                 }
             },
             errors: function (data) {
                 console.log('read error', data);
             }
         })
     }
    this.read_user_videos_by_user_link = function(user_link){
        $.ajax({
            url: './script/api_calls_to_db/access_database/access.php',
            method: 'POST',
            dataType: 'JSON',
            data: {
                action:'read_videos_by_channel_array',
                user_link:user_link,
                offset:offset
            },
            success: function (data) {
                if (data.success) {
                    console.log('read success', data);
                }
            },
            errors: function (data) {
                console.log('read error', data);
            }
        })
    }
     //read user based on user link get user id, read ctu(user_id) read channels, read videos
}
var access_database = new Database();
