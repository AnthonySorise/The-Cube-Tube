// check if device is apple mobile device (used to convert date object)
function checkIfAppleDevice() {
    if (navigator.userAgent.match(/(iPhone|iPod|iPad)/) != null) {
        return true;
    } else {
        return false;
    }
}

//converts date object for apple mobile devices
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