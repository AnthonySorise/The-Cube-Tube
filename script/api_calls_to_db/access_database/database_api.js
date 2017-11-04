 function Database(){
    var self = this;
    this.channel_id_hold = null;
    this.delete_ctu = function(ctu_id){//delete by specifying table and id of entry i.e table = 'channels', id = 2
        // var promise = {
        //     then:function(resolve,reject){
        //         this.resolve = resolve;
        //         this.reject = reject;
        //         }
        // }
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
                    console.log('deleted success');
                    // promise.resolve(data);
                }
            },
            errors:function(data){
                // promise.reject(data);
                console.log(data['errors']);
            }
        })
    }
     this.insert_channel = function(channel_object){//pass in channelobject and deconstruct it , not sure if were gonna include videos here
         // var promise = {
         //     then:function(resolve,reject){
         //         this.resolve = resolve;
         //         this.reject = reject;
         //     }
         // }
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
                     // promise.resolve(data);
                     console.log('insert channel success');
                     console.log(data);
                     self.channel_id_hold = data.id;
                 }
             },
             errors:function(data){
                 console.log('insert error');
                 // promise.reject(data);
             }
         })
         // return promise;
     }
     this.insert_ctu = function(user_id,channel_id){//numbers
         // var promise = {
         //     then:function(resolve,reject){
         //         this.resolve = resolve;
         //         this.reject = reject;
         //     }
         // }
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
                     // promise.resolve(data);
                     console.log('insert ctu success');
                 }
             },
             errors:function(){
                 // promise.reject(data);
                 console.log(data['insert errors']);
             }
         })
         // return promise;
     }
     this.insert_user = function(link){
         // var promise = {
         //     then:function(resolve,reject){
         //         this.resolve = resolve;
         //         this.reject = reject;
         //     }//end then
         // }//end promise
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
                     // promise.resolve(data);
                     console.log('insert user success');
                 }
             },
             errors:function(data){
                 // promise.reject(data);
                 console.log(data['errors'])
             }
         })
         // return promise
     }
     this.insert_video = function (videoArray) {//pass in channelobject and deconstruct it , not sure if were gonna include videos here
         // var promise = {
         //     then:function(resolve,reject){
         //         this.resolve = resolve;
         //         this.reject = reject;
         //     }
         // }
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
                     // promise.resolve(data);
                     console.log('insert video success');
                 }
             },
             errors: function (data) {
                 console.log('insert error');
                 // promise.reject(data);
             }
         })
         // return promise
     }
     this.read_channels_by_user_id = function(user_id){
         // var promise = {
         //     then:function(resolve,reject){
         //         this.resolve = resolve;
         //         this.reject = reject;
         //     }
         // }
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
                     // promise.resolve(data);
                     console.log('read success');
                 }
             },
             errors: function (data) {
                 console.log('read error');
                 // promise.reject(data);
             }
         })
         // return promise
     }
     this.read_ctu = function(user_id){
         // var promise = {
         //     then:function(resolve,reject){
         //         this.resolve = resolve;
         //         this.reject = reject;
         //     }
         // }
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
                     // promise.resolve(data);
                     console.log('read success');
                 }
             },
             errors: function (data) {
                 console.log('read error');
                 // promise.reject(data);
             }
         })
         // return promise
     }
     this.read
     this.got_channels_from_database = function(){

     }
     this.channel_not_in_database = function(){

     }
    this.read_channels_by_youtube_id = function(youtube_channel_id){//read data from any table i.e "channels", "users", "videos","channels_to_users", search = "*" for all or more specifically channel_titles
        var promise = {
            then:function(resolve,reject){
                this.resolve = resolve;
                this.reject = reject;
            }
        }
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
                    // promise.resolve(data);
                    console.log('read data success', data);
                }else{
                    console.log(data);
                }
            },
            errors:function(data){
                // promise.reject(data);
                console.log(data['read errors'], data);
            }
        })
        // return promise;
    }
    this.read_videos = function(offset,user_id){
        // var promise = {
        //     then:function(resolve,reject){
        //         this.resolve = resolve;
        //         this.reject = reject;
        //     }
        // }
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
                    // promise.resolve(data);
                    console.log('read video success');
                }
            },
            errors: function (data) {
                console.log('read error');
                // promise.reject(data);
            }
        })
        // return promise
    }
     this.read_videos_by_channel = function(youtube_channel_id,offset){
         // var promise = {
         //     then:function(resolve,reject){
         //         this.resolve = resolve;
         //         this.reject = reject;
         //     }
         // }
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
                     // promise.resolve(data);
                     console.log('read success');
                 }
             },
             errors: function (data) {
                 console.log('read error');
                 // promise.reject(data);
             }
         })
         // return promise
     }
     this.update_channel = function(channel_object){//pass in channelobject and deconstruct it , not sure if were gonna include videos here
         // var promise = {
         //     then:function(resolve,reject){
         //         this.resolve = resolve;
         //         this.reject = reject;
         //     }
         // }
         const {channel_id, channel_title, description, thumbnail, sub_count,video_count,view_count} = channel_object;
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
                 sub_count:sub_count,
                 video_count:video_count,
                 view_count:view_count
             },
             success:function(data){
                 if(data.success){
                     // promise.resolve(data);
                     console.log('update success');
                 }
             },
             errors:function(data){
                 console.log('update error');
                 // promise.reject(data);
             }
         })
         // return promise;
     }
    this.update_video = function(video_object){
        // var promise = {
        //     then:function(resolve,reject){
        //         this.resolve = resolve;
        //         this.reject = reject;
        //     }
        // }
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
                    // promise.resolve(data);
                    console.log('update success');
                }
            },
            errors:function(data){
                console.log('update error');
                // promise.reject(data);
            }
        })
        // return promise;
    }
     // this.update_user = function(user_id,new_link){
     //     // var promise = {
     //     //     then:function(resolve,reject){
     //     //         this.resolve = resolve;
     //     //         this.reject = reject;
     //     //     }
     //     // }
     //     $.ajax({
     //         url:'/script/api_calls_to_db/access_database/access.php',
     //         method:'post',
     //         dataType:'JSON',
     //         data:{
     //             action:'update_user',
     //             id: user_id,
     //             user_link:new_link
     //         },
     //         success:function(data){
     //             if(data.success){
     //                 // promise.resolve(data);
     //                 console.log('update success');
     //             }
     //         },
     //         errors:function(data){
     //             console.log('update error');
     //             // promise.reject(data);
     //         }
     //     })
     //     // return promise;
     // }
}
var access_database = new Database();
 var channel_id_hold = null;