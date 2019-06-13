const getToken = () => {
    return localStorage.getItem("Token");
};

const getTimeDifference = (time) => {
    let message = '';
    const timeDiff = Math.trunc((Date.now()-new Date(time))/(1000*60));
    if(timeDiff < 60){
        message = `${timeDiff} minutes`;
    } else if(timeDiff >= 60 && timeDiff < 1440){
        message = `${Math.trunc(timeDiff/60)} hours ${Math.trunc(timeDiff%60)} minutes`;
    } else {
        message = `${Math.trunc(timeDiff/(60*24))} days ${Math.trunc(timeDiff/60)} hours`;
    }
    return message;
};

module.exports = {
    getToken,
    getTimeDifference
};
