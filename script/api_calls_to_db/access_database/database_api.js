 function Database(){
    this.delete_categories = function(){
        $.ajax({
            url:'./script/api_calls_to_db/access_database/access.php',
            method:'post',
            dataType:'JSON',
            data:{
                youtube_channel_id: youtube_channel_id,
                action:'delete_ctu'
            },
            success:function(data){
                if(data.success){
                    console.log('deleted success', data);
                }else{
                    console.log(data);
                }
            },
            errors:function(data){
                console.log(data['errors']);
            }
        })
    }
    this.delete_ctu = function(youtube_channel_id){//delete by specifying ctu id
        $.ajax({
            url:'./script/api_calls_to_db/access_database/access.php',
            method:'post',
            dataType:'JSON',
            data:{
                youtube_channel_id: youtube_channel_id,
                action:'delete_ctu'
            },
            success:function(data){
                if(data.success){
                    console.log('deleted success', data);
                }else{
                    console.log(data);
                }
            },
            errors:function(data){
                console.log(data['errors']);
            }
        })
    }
     this.read_channels_by_user_id = function(){//itll read channel based on user, just pass in user id
         $.ajax({
             url: './script/api_calls_to_db/access_database/access.php ',
             method: 'POST',
             dataType: 'JSON',
             data: {
                 action: 'read_channels_by_user_id',
             },
             success: function (data) {
                 if (data.success){
                     console.log('read success', data);
                 }else{
                    console.log(data);
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
                console.log(data['errors'], data);
            }
        })
    }
    this.read_videos_by_user = function(offset){//read videos with limit 40, can give an offset to read more.
        $.ajax({
            url: './script/api_calls_to_db/access_database/access.php',
            method: 'POST',
            dataType: 'JSON',
            data: {
                action: 'read_videos_by_user',
                offset: offset,
            },
            success: function (data) {
                if (data.success) {
                    console.log('read video success', data);
                }else{
                    console.log(data);
                }
            },
            errors: function (data) {
                console.log('read error', data);
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
                 }else{
                    console.log(data);
                }
             },
             errors: function (data) {
                 console.log('read error', data);
             }
         })
     }
     this.insert_channels_by_youtube_id_php = function(youtube_channel_id){
        $.ajax({
            url:'./script/api_calls_to_db/access_database/access.php',
            method:'post',
            dataType:'JSON',
            data:{
                action:'insert_youtube_channel_curl',
                youtube_channel_id:youtube_channel_id
            },
            success: function (data) {
                if (data.success) {
                    console.log('insert success', data);
                }else{
                    console.log(data);
                }
            },
            errors: function (data) {
                console.log('insert error', data);
            }
        })
     }
     this.insert_videos_php = function(youtube_channel_id,page_token){
         $.ajax({
            url:'./script/api_calls_to_db/access_database/access.php',
            method:'post',
            dataType:'JSON',
            data:{
                action:'insert_videos_curl',
                youtube_channel_id:youtube_channel_id,
                page_token:page_token
            },
            success: function (data) {
                if (data.success) {
                    console.log('insert success', data);
                }else{
                    console.log(data);
                }
            },
            errors: function (data) {
                console.log('insert error', data);
            }
         })
     }
     this.insert_cuc = function(youtube_channel_id,category_name){
        $.ajax({
            url:'./script/api_calls_to_db/access_database/access.php',
            method:'post',
            dataType:'JSON',
            data:{
                action:'insert_cuc',
                youtube_channel_id:youtube_channel_id,
                category_name:category_name
            },
            success: function (data) {
                if (data.success) {
                    console.log('insert success', data);
                }else{
                    console.log(data);
                }
            },
            errors: function (data) {
                console.log('insert error', data);
            }
        })
     }
     this.update_videos_by_youtube_id_php = function(youtube_channel_id,last_channel_pull){//get last channel pull from read channels by youtube id
        $.ajax({
            url:'./script/api_calls_to_db/access_database/access.php',
            method:'post',
            dataType:'JSON',
            data:{
                action:'update_video_list',
                youtube_channel_id:youtube_channel_id,
                last_channel_pull:last_channel_pull
            },
            success: function (data) {
                if (data.success) {
                    console.log('insert success', data);
                }else{
                    console.log(data);
                }
            },
            errors: function (data) {
                console.log('insert error', data);
            }
        })
     }
     //read user based on user link get user id, read ctu(user_id) read channels, read videos
     this.insert_ctu = function(youtube_channel_id){
         $.ajax({
            url:'./script/api_calls_to_db/access_database/access.php',
            method:'post',
            dataType:'JSON',
            data:{
                action:'insert_ctu',
                youtube_channel_id:youtube_channel_id
            },
            success: function (data) {
                if (data.success) {
                    console.log('insert success', data);
                }else{
                    console.log(data);
                }
            },
            errors: function (data) {
                console.log('insert error', data);
            }
         })
     }
}
var access_database = new Database();
