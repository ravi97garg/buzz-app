const transporter = require('../../config/nodemailer.config');

const msgToBuzzCreator = (emailTo, emailFrom, buzzCreatorName, buzzId, buzzReporter) => {
    const msg = {
        to: emailTo,
        from: emailFrom,
        subject: `Your Buzz #${buzzId} has been reported`,
        html: `Hi <strong>${buzzCreatorName}</strong>, <br/>Your Buzz #${buzzId} is reported by <strong>${buzzReporter}</strong>. Please look into the matter. <br/> Thank you.`,
    };
    return transporter.sendMail(msg);
};

const msgToBuzzReporter = (emailTo, emailFrom, buzzId, buzzReporter) => {
    const msg = {
        to: emailTo,
        from: emailFrom,
        subject: `Buzz #${buzzId} reported by you`,
        html: `Hi <strong>${buzzReporter}</strong>, <br/>You have reported a Buzz with BuzzId #${buzzId} successfully. The appropriate action would be taken by the buzz creator. <br/> Thank you`,
    };
    return transporter.sendMail(msg);
};

module.exports = {
    msgToBuzzCreator,
    msgToBuzzReporter
};