const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTP = async (email, otp) => {
  await transporter.sendMail({
    from: `"Employee Management System" <${process.env.EMAIL_USER}>`,

    to: email,

    subject: "Verify Your Email",

    html: `
      <div style="font-family:Arial;padding:20px">
        <h2>Email Verification</h2>

        <p>Your OTP is</p>

        <h1 style="letter-spacing:5px;color:#0d6efd">
          ${otp}
        </h1>

        <p>This OTP will expire in 5 minutes.</p>

        <hr/>

        <small>
          Employee Management System
        </small>
      </div>
    `,
  });
};

module.exports = sendOTP;