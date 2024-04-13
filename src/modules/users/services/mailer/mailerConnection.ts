import nodemailer from "nodemailer";

export const mailerConnection = nodemailer.createTransport({
  service: "email",
  host: "smtp.mail.ru",
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

mailerConnection.on("error", (error) => {
  console.log(`[Mailer]: Email was not sent. Error: ${error.message}`);
});
