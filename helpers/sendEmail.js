const nodemailer = require('nodemailer')
let transporter; 

const getTransporter = async () => {
  if (transporter) return transporter; 

  const testAccount = await nodemailer.createTestAccount(); 
  transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: { user: testAccount.user, pass: testAccount.pass },
  });

  return transporter;
};
const sendEmail = async (targetEmail, htmlMessageString, text) => {
    try {
        const transpInstance = await getTransporter()
        const info = await transpInstance.sendMail({
            from: '"Bem Estar" <no-reply@minhaapp.test>',
            to: targetEmail,
            text: text,
            html: htmlMessageString
        })
        const previewUrl = nodemailer.getTestMessageUrl(info);
        console.log('previewUrl', previewUrl)
        return {
            success: true,
            message: info,
            previewUrl
        }
    } catch (error) {
        return {
            success: false,
            message: error
        }
    }
}

const formEmailMessage = (title, message, link) => {
    return `
    <h1>${title}</h1>
    <p>${message}: </p>
    <a>${link}</a>
    `
}

module.exports = {sendEmail, formEmailMessage}