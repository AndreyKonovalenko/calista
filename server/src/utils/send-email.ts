import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (options: { [key: string]: string }) => {
  const transporter = nodemailer.createTransport({
    service: config.smtp.emailService,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass,
    },
  });
  const mailOptions = {
    from: `${config.smtp.from_name} <${config.smtp.from_email}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };
  await transporter.sendMail(mailOptions);
};
