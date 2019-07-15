const CLIENT_ID = '877864863528-8q6gbm5epb5nv5no5vvs39rn9ehsqhu3.apps.googleusercontent.com';
const SECRET_KEY = 'bsh5QG18Ak2JG3gl45kvq-H7';

const SERVER_PORT = 8080;
const CLIENT_PORT = 3000;
const CLIENT_URL = `http://localhost:${CLIENT_PORT}`;

const JWT_KEY = 'itisalmostimpossibletocrackthiscode';

const CLOUD_NAME = 'dnuq1lgqs';
const CLOUDINARY_API_KEY = '295531686213238';
const CLOUDINARY_API_SECRET = '-zMFnMD_rqF2vJtU7vcCfw0B9hY';

const SENDGRID_NAME = 'ttn buzz email';
const SENDGRID_API_KEY = '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';
// const SENDGRID_API_KEY = 'SG.pammAjw9RpGUjJlJhVjAzw.qYAmYpCdvQRJcGaTYjHJSrj-uNmgfVLrRvElewJVTSI';

const USER_INFO = {
    PROFILE: 'https://www.googleapis.com/auth/userinfo.profile',
    EMAIL: 'https://www.googleapis.com/auth/userinfo.email'
};

const userRoles = {
    USER: 'User',
    ADMIN: 'Admin'
};

const buzzCategory = {
    ACTIVITY: 'activity',
    LOSTFOUND: 'lostFound'
};

const adminDepartments = {
    HR: 'HR',
    IT: 'IT',
    OTHERS: 'Others'
};

const complaintStatus = {
    PENDING: 'Pending',
    INPROGRESS: 'In Progress',
    COMPLETED: 'Completed',
    CLOSED: 'Closed'
};

const reaction = {
    HAPPY: 'happy',
    ANGRY: 'angry',
    SAD: 'sad'
};

const complaintReqType = {
    BRIEF: 'brief',
    DETAILED: 'detailed'
};

module.exports = {
    CLIENT_ID,
    SECRET_KEY,
    SERVER_PORT,
    CLIENT_URL,
    JWT_KEY,
    CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    SENDGRID_NAME,
    SENDGRID_API_KEY,
    USER_INFO,

    userRoles,
    buzzCategory,
    adminDepartments,
    complaintStatus,
    reaction,
    complaintReqType
};