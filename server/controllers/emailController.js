// Email Controller API
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const AppError = require('../utils/apierror');
dotenv.config();

exports. sendEmail = async (email, from, subject, text, html) => {

    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    try {
        const data = await transporter.sendMail({
            from: `${from} <${process.env.EMAIL_USER}>`,
            to: email,
            subject: subject,
            text: text,
            html: html
        });
        return data;
    } catch (error) {
        throw new AppError(`Error sending email`, 400);
    }
};
