const sgMail = require('../../config/sendgrid.config');

const msgToLogger = (emailTo, complaintId, loggerName, subject, assigneeName, department, status) => {
    const msg = {
        to: emailTo,
        from: 'no-reply@ttn-buzz.com',
        subject: `Complaint ID: ${complaintId}`,
        html: `Hi <strong>${loggerName}</strong>, <br/>The status of the complaint with the title <strong>${subject}</strong> has been changed by <strong>${assigneeName}</strong> (Admin, ${department} Department). The current status of your complaint is <strong>${status}</strong>You can go through the complaint details and track the complaints <a href="#">here</a>. <br/><br/>Thank you<br/>Regards. <br/>Admin. <br/>${department} Department`,
    };
    return sgMail.send(msg);
};

const msgToAssignee = (emailTo, complaintId, assigneeName, subject, status, department) => {
    const msg = {
        to: emailTo,
        from: 'no-reply@ttn-buzz.com',
        subject: `Complaint ID: ${complaintId}`,
        html: `Hi <strong>${assigneeName}</strong>, <br/>You have changed the status of complaint with the title <strong>${subject}</strong> to status: <strong>${status}</strong>. <br/><br/>Regards. <br/>Admin. <br/>${department} Department`,
    };
    return sgMail.send(msg);
};

module.exports = {
    msgToLogger,
    msgToAssignee
};