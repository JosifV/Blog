const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const sendWelcomeMail = (email, name) => {
  sgMail.send({
    to: email,
    from: "emailordersvladc@gmail.com",
    subject: `Welcome ${name}`,
    text: `Hi ${name}, welcome to our blog.`
  });
};

module.exports = {
  sendWelcomeMail
};
