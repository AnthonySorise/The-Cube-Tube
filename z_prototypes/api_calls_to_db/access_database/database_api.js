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
        const {channelId, channelTitle, description, thumbnails, subCount,videoCount,viewCount} = channel_object;
        $.ajax({
            url:'access.php',
            method:'post',
            dataType:'JSON',
            data:{
                action:'insert_channel',
                channelId:channelId,
                channelTitle:channelTitle,
                description:description,
                thumbnails:thumbnails,
                subCount:subCount,
                videoCount:videoCount,
                viewCount:viewCount
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
        const {channelId, channelTitle, description, thumbnails, subCount,videoCount,viewCount} = channel_object;
        $.ajax({
            url:'access.php',
            method:'post',
            dataType:'JSON',
            data:{
                action:'update_channel',
                channelId:channelId,
                channelTitle:channelTitle,
                description:description,
                thumbnails:thumbnails,
                subCount:subCount,
                videoCount:videoCount,
                viewCount:viewCount
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
}
var access_database = new Database();