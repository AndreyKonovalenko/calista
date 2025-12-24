import nodemailer from 'nodemailer';
import config from '../config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export const sendEmail = async (options: { [key: string]: string }) => {
  const smptOptions = {
    host: config.smtp.host,
    port: config.smtp.port,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass,
    },
  } as SMTPTransport.Options;

  const mailOptions = {
    from: `${config.smtp.from_name} <${config.smtp.from_email}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  const transporter = nodemailer.createTransport(smptOptions);
  await transporter.sendMail(mailOptions);
};
