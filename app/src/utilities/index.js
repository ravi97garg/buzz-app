const getToken = () => {
    return localStorage.getItem("Token");
};

const setToken = (token) => {
    return localStorage.setItem("Token", token);
};

const getTimeDifference = (time) => {
    let message = '';
    const timeDiff = Math.trunc((Date.now()-new Date(time))/(1000*60));
    if(timeDiff < 1) {
        message = `just now`;
    } else if(timeDiff >= 1 && timeDiff < 60){
        message = `${Math.trunc(timeDiff%60)} minutes ago`;
    } else if(timeDiff >= 60 && timeDiff < 1440){
        message = `${Math.trunc(timeDiff/60)} hours ${Math.trunc(timeDiff%60)} minutes ago`;
    } else {
        message = `${Math.trunc(timeDiff/(60*24))} days ${Math.trunc(timeDiff%(24))} hours ago`;
    }
    return message;
};

const addCarriageReturn = (text, cols) => {
    let modifiedText = '';
    let i=0;
    for(i=0; i<Math.trunc(text.length/cols); i+=1){
        modifiedText += text.slice(cols*i,cols*(i+1))+'\n';
    }
    modifiedText += text.slice(cols*i,cols*(i+1));
    return modifiedText;
};

module.exports = {
    setToken,
    getToken,
    getTimeDifference,
    addCarriageReturn
};
