const getToken = () => {
    return localStorage.getItem("Token");
};

module.exports = {
    getToken
};
