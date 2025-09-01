import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    // console.log("transporter:", transporter);

    const mailOptions = {
      from: `< ${process.env.EMAIL_USER} >`,
      to: to,
      subject: subject,
      text: text,
    };

    const response = await transporter.sendMail(mailOptions);
    console.log("Email sent to:", response.messageId);
  } catch (error) {
    console.log("Email sent to:", error);
    console.error("Email sent to:", error);
    throw new Error("Email could not be sent");
  }
};

export { sendEmail };
