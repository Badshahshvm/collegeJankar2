
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
              host: process.env.SMTP_HOST,
              port: process.env.SMTP_PORT,
              secure: process.env.SMTP_SECURE === 'true',
              auth: {
                            user: process.env.EMAIL_USER,
                            pass: process.env.EMAIL_PASS
              },
              tls: {
                            rejectUnauthorized: false
              }
});

module.exports = transporter;