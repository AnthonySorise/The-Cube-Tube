// log out button will return to thecubetube.com
// check if user's id is in database
// check if user's email is in database


const user_query_string = location.search.slice(1); // set on page load, should only change when page url changes

function manage_database_with_user_id(user_id){
	$.ajax({
		url:'./script/api_calls_to_db/access_database/access.php',
		method:'post',
		dataType:'JSON',
		data:{
			user_link: user_id,
			action:'insert_user'
		},
		success:function(data){
			if(data.success){
				console.log(data)
			}
		}
	})
}

function generate(){
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var user_id = '';
  for(var i = 0; i < 9; i++){
    user_id += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return user_id
}

