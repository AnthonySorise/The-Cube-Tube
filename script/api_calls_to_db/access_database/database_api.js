function Database(){
    this.insert_user = function(link){
        // var promise = {
        //     then:function(resolve,reject){
        //         this.resolve = resolve;
        //         this.reject = reject;
        //     }//end then
        // }//end promise
        $.ajax({
            url:'access.php',
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
                    console.log('success');
                }
            },
            errors:function(data){
                // promise.reject(data);
                console.log(data['errors'])
            }
        })
        // return promise
    }
    this.delete_entry = function(table,id){//delete by specifying table and id of entry i.e table = 'channels', id = 2
        // var promise = {
        //     then:function(resolve,reject){
        //         this.resolve = resolve;
        //         this.reject = reject;
        //         }
        // }
        $.ajax({
            url:'access.php',
            method:'post',
            dataType:'JSON',
            data:{
                table:table,
                id: id,
                action:'delete'
            },
            success:function(data){
                if(data.success){
                    console.log('deleted');
                    // promise.resolve(data);
                }
            },
            errors:function(data){
                // promise.reject(data);
                console.log(data['errors']);
            }
        })
    }
    this.read_tables = function(table,search){//read data from any table i.e channels, user, categories, search = * for all or more specifically channelTitles, userlinks
        // var promise = {
        //     then:function(resolve,reject){
        //         this.resolve = resolve;
        //         this.reject = reject;
        //     }
        // }
        $.ajax({
            url:'access.php',
            method:'post',
            dataType:'JSON',
            data:{
                table:table,
                search:search,
                action:'read'
            },
            success:function(data){
                if(data.success){
                    // promise.resolve(data);
                    console.log('read data success');
                }
            },
            errors:function(){
                // promise.reject(data);
                console.log(data['read errors']);
            }
        })
        // return promise;
    }
    this.update_user = function(user_id,new_link){
        // var promise = {
        //     then:function(resolve,reject){
        //         this.resolve = resolve;
        //         this.reject = reject;
        //     }
        // }
        $.ajax({
            url:'access.php',
            method:'post',
            dataType:'JSON',
            data:{
                action:'update_user',
                id: user_id,
                user_link:new_link
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
    this.insert_channel = function(channel_object){//pass in channelobject and deconstruct it , not sure if were gonna include videos here
        // var promise = {
        //     then:function(resolve,reject){
        //         this.resolve = resolve;
        //         this.reject = reject;
        //     }
        // }
        const {channel_id, channel_title, description, thumbnail, sub_count,video_count,view_count} = channel_object;
        $.ajax({
            url:'access.php',
            method:'post',
            dataType:'JSON',
            data:{
                action:'insert_channel',
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
    this.update_channel = function(channel_object){//pass in channelobject and deconstruct it , not sure if were gonna include videos here
        // var promise = {
        //     then:function(resolve,reject){
        //         this.resolve = resolve;
        //         this.reject = reject;
        //     }
        // }
        const {channel_id, channel_title, description, thumbnail, sub_count,video_count,view_count} = channel_object;
        $.ajax({
            url:'access.php',
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
    this.insert_user = function(link){
        // var promise = {
        //     then:function(resolve,reject){
        //         this.resolve = resolve;
        //         this.reject = reject;
        //     }//end then
        // }//end promise
        $.ajax({
            url:'access.php',
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
                    console.log('success');
                }
            },
            errors:function(data){
                // promise.reject(data);
                console.log(data['errors'])
            }
        })
        // return promise
    }
    this.insert_video = function(video_object){//pass in channelobject and deconstruct it , not sure if were gonna include videos here
        // var promise = {
        //     then:function(resolve,reject){
        //         this.resolve = resolve;
        //         this.reject = reject;
        //     }
        // }
        const {channel_id, video_id, channel_title, description, thumbnail,published_at} = video_object;
        $.ajax({
            url:'access.php',
            method:'POST',
            dataType:'JSON',
            data:{
                action:'insert_video',
                video_id:video_id,
                channel_id:channel_id,
                channel_title:channel_title,
                description:description,
                thumbnail:thumbnail,
                published_at:published_at
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
    this.read_vids_with_limit = function (offset) {
        // var promise = {
        //     then:function(resolve,reject){
        //         this.resolve = resolve;
        //         this.reject = reject;
        //     }
        // }
        $.ajax({
            url: 'access.php',
            method: 'POST',
            dataType: 'JSON',
            data: {
                action: 'read_videos_limit',
                offset: offset
            },
            success: function (data) {
                if (data.success) {
                    // promise.resolve(data);
                    console.log('update success');
                }
            },
            errors: function (data) {
                console.log('update error');
                // promise.reject(data);
            }
        })
        // return promise
    }
}
var access_database = new Database();