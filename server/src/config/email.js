// config/email.js
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');

dotenv.config();

if (!process.env.SENDGRID_API_KEY) {
    throw new Error('SENDGRID_API_KEY no está definida en las variables de entorno');
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = sgMail;
