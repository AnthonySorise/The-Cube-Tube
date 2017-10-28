function Users_api(){
    this.create_user = function(link){
        // var promise = {
        //     then:function(resolve,reject){
        //         this.resolve = resolve;
        //         this.reject = reject;
        //     }//end then
        // }//end promise
        $.ajax({
            url:'./access_user_files/access_user.php',
            method:'POST',
            dataType:'JSON',
            data:{
                action:'insert',
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
    }
    this.delete_user = function(user_id){
        // var promise = {
        //     then:function(resolve,reject){
        //         this.resolve = resolve;
        //         this.reject = reject;
        //         }
        // }
        $.ajax({
            url:'./access_user_files/access_user.php',
            method:'post',
            dataType:'JSON',
            data:{
                user_id: user_id,
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
    this.read_user = function(){//grab users
        // var promise = {
        //     then:function(resolve,reject){
        //         this.resolve = resolve;
        //         this.reject = reject;
        //     }
        // }
        $.ajax({
            url:'./access_user_files/access_user.php',
            method:'post',
            dataType:'JSON',
            data:{
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
    }
    this.update_user = function(user_id,new_link){
        $.ajax({
            url:'./access_user_files/access_user.php',
            method:'post',
            dataType:'JSON',
            data:{
                action:'update',
                id: user_id,
                user_link:new_link
            },
            success:function(data){
                if(data.success){
                    console.log('update success');
                }
            },
            errors:function(data){
                console.log('update error');
            }
        })
    }
}
var user_api = new Users_api();