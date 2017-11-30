function deepCopy(toCopy){
    function objectDeepCopy(object){
        var objectCopy = {};
        for(var prop in object){
            var currentValue = object[prop];
            if(typeof currentValue !== "object"){
                objectCopy[prop] = currentValue
            }
            else{
                if(Array.isArray(currentValue)){
                    objectCopy[prop] = arrayDeepCopy(currentValue)
                }
                else{
                    objectCopy[prop] = objectDeepCopy(currentValue)
                }

            }
        }
        return objectCopy;
    }

    function arrayDeepCopy(array){
        var arrayCopy = [];
        for(var i = 0; i < array.length; i++){
            var currentValue = array[i];
            if(typeof currentValue !== "object"){
                arrayCopy[i] = currentValue
            }
            else{
                if(Array.isArray(currentValue)){
                    arrayCopy[i] = arrayDeepCopy(currentValue)
                }
                else{
                    arrayCopy[i] = objectDeepCopy(currentValue)
                }

            }

        }
        return arrayCopy
    }
    if(typeof toCopy === "object"){
        if(Array.isArray(toCopy)){
            return arrayDeepCopy(toCopy)
        }
        else{
            return objectDeepCopy(toCopy)
        }
    }
    else{
        var copy = toCopy;
        return toCopy;
    }
}

function clipBoard(txtClass){

    if($('span').hasClass(txtClass)){
        if(txtClass==="linkGhost"){
            $('.linkGhost').css('display','block');
        }
        var x = document.querySelector('.'+txtClass);
        var rng = document.createRange();
        rng.selectNode(x);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(rng);
        try{
        var success = document.execCommand('copy');
        var result = success ? 'Link Copied!' : 'Something Went Wrong';
        toastMsg(result, 2000);
        }catch(err){
        console.log('error');
        }
        $('.linkGhost').css('display','none'); 
    }else{
        toastMsg('nothing to copy', 2000);
    }
}


