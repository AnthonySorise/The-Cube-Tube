// log out button will return to thecubetube.com
// check if user's id is in database
// check if user's email is in database


const user_query_string = location.search.slice(1); // set on page load, should only change when page url changes


function generate(){ // needs ajax call 
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var user_id = '';
  for(var i = 0; i < 7; i++){
    user_id += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return user_id
}

$('.addChannelButton').on('click', function(){
	if(user_query_string === ""){
		var user_id = generate();
		check_for_user_id(user_id);
		// filler ajax call(s)
			// if error user id is not in data base or reload default page
		location.search = user_id
	}
});

function check_for_user_id(link){
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
}