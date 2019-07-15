const sgMail = require('../../config/sendgrid.config');

const msgToLogger = (emailTo, complaintId, loggerName, subject, assigneeName, department) => {
    const msg = {
        to: emailTo,
        from: 'no-reply@ttn-buzz.com',
        subject: `Complaint ID: ${complaintId}`,
        html: `Hi <strong>${loggerName}</strong>, <br/>The complaint with the title <strong>${subject}</strong> has been logged by you. The complaint is assigned to <strong>${assigneeName}</strong> successfully. You can go through the complaint details and track the complaints <a href="#">here</a>. <br/>Hope your issue would be resolved soon. <br/><br/>Regards. <br/>Admin. <br/>${department} Department`,
    };
    return sgMail.send(msg);
};

const msgToAssignee = (emailTo, complaintId, assigneeName, subject, loggerName, loggerEmail, department) => {
    const msg = {
        to: emailTo,
        from: 'no-reply@ttn-buzz.com',
        subject: `Complaint ID: ${complaintId}`,
        html: `Hi <strong>${assigneeName}</strong>, <br/>The complaint with the title <strong>${subject}</strong> has been assigned to you. The complaint is assigned by <strong>${loggerName}(${loggerEmail})</strong> successfully. You can go through the complaint details and track the complaints <a href="#">here</a>. <br/>Hope you would look into the matter. <br/><br/>Regards. <br/>Admin. <br/>${department} Department`,
    };
    return sgMail.send(msg);
};

module.exports = {
    msgToLogger,
    msgToAssignee
};