// log out button will return to thecubetube.com
// check if user's id is in database
// check if user's email is in database


const user_query_string = location.search.slice(1); // set on page load, should only change when page url changes


function generate(){
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var user_id = '';
  for(var i = 0; i < 9; i++){
    user_id += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return user_id
}

$('.addChannelButton').on('click', function(){
	if(user_query_string === 0){
		var user_id = generate();
		function_that_inserts_users_id(user_id);
		// filler ajax call(s)
			// if error user id is not in data base or reload default page
		location.search = user_id.slice(1)
		
	}
})