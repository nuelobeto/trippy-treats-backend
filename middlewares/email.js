const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
      authMethod: "PLAIN",
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      html: html,
    });

    console.log("email sent");
  } catch (error) {
    console.log(error);
    console.log("email not sent");
  }
};

module.exports = sendEmail;
