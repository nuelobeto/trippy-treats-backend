const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      // host: process.env.HOST,
      // service: process.env.SERVICE,
      // port: 587,
      // secure: true,
      // auth: {
      //   type: "OAuth2",
      //   user: process.env.USER,
      //   pass: process.env.PASS,
      //   clientId: process.env.CLIENT_ID,
      //   clientSecret: process.env.CLIENT_SECRET,
      // },
      service: "gmail",
      auth: {
        user: "nuelobeto@gmail.com",
        pass: "jtobwdsxhsaobkmd",
      },
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
