function API_CALLS(){
    this.create_user = function(link){
        var promise = {
            then:function(resolve,reject){
                this.resolve = resolve;
                this.reject = reject;
            }//end then
        }//end promise
        $.ajax({
            url:'./insert_user.php',
            method:'post',
            data:{
                user_link: link
            },
            success:function(data){
                if(data.success) {
                    promise.resolve(data);
                    console.log('success');
                }
            },
            errors:function(data){
                promise.reject(data);
                console.log(data['errors'])
            }
        })
    }
    this.delete_user = function(user_id){
        var promise = {
            then:function(resolve,reject){
                this.resolve = resolve;
                this.reject = reject;
            }
        }
        $.ajax({
            url:'./delete_user.php',
            method:'post',
            data:{
                user_id: user_id
            },
            success:function(data){
                if(data.success){
                    promise.resolve(data);
                }
            },
            errors:function(data){
                promise.reject(data);
                console.log(data['errors']);
            }
        })
    }
    this.read_user = function(){//grab users
        var promise = {
            then:function(resolve,reject){
                this.resolve = resolve;
                this.reject = reject;
            }
        }
        $.ajax({
            url:'./read_user.php',
            method:'post',
            //no data needed
            success:function(data){
                if(data.success){
                    promise.resolve(data);
                }
            },
            errors:function(){
                promise.reject(data);
                console.log(data['errors']);
            }
        })
    }
}