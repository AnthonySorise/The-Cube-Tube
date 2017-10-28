var tempGlobalUserIdStorage = [];

function createUserId(){
    var idLength = 5;
    var id = "";
    var tries = 0;
    var foundAvailableId = false;
    while(!foundAvailableId){
        for(var i = 0; i< idLength; i++){
            var randomNum = Math.floor(Math.random() * 36);
            if(randomNum > 9)
            {
                randomNum += 87;
                randomNum = String.fromCharCode(randomNum)
            }
            id = id+randomNum
        }
        if(tempGlobalUserIdStorage.indexOf(id) === -1){
            foundAvailableId = true;
        }
        else{
            console.log("DUP")
            tries+=1;
            if(tries > 10){
                idLength+=1;
                console.log("WOW")
            }
        }
    }
    tempGlobalUserIdStorage.push(id);
}
//
// function test(){
//     for(var i = 0; i < 10000; i++){
//         createUserId()
//     }
//     console.log(tempGlobalUserIdStorage)
// }