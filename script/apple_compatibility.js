/***************************************************************************************************
 * checkIfAppleDevice - checks if user is currently using an apple mobile device
 * @params none
 * returns: boolean: true/false
 */
function checkIfAppleDevice() {
    if (navigator.userAgent.match(/(iPhone|Safari|iPod|iPad)/) != null) {
        return true;
    } else {
        return false;
    }
}

/***************************************************************************************************
 * checkIfAppleDevice - if checkIfAppleDevice returns true, adjust date for mobiile apple device
 * @params dateFromAPI
 * returns: iosDate object
 */
function convertDateForApple(dateFromAPI) {
    if (checkIfAppleDevice()) {
        // let date = "2017-11-03 09:34:14" //testing only - sample data
        let newDate = dateFromAPI.split(" ");
        let removeTime = newDate[0].split("-")
        let iosDate = removeTime[1] + '/' + removeTime[2] + '/' + removeTime[0]
        return iosDate
    } else {
        return;
    }
}