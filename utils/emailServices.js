const nodemailer = require('nodemailer');
require('dotenv').config();  // For loading environment variables

// Configure Nodemailer transport to use SMTP server
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,   // SMTP server host (e.g., smtp.yourserver.com)
    port: process.env.SMTP_PORT,   // SMTP server port (e.g., 587 for TLS)
    secure: process.env.SMTP_SECURE === 'false', // Whether to use SSL or TLS (true/false)
    auth: {
        user: process.env.SMTP_USER,  // SMTP username
        pass: process.env.SMTP_PASS   // SMTP password
    },

    debug: true, // Enable debugging output
    logger: true // Log the entire process
});

// Verify connection
transporter.verify((error, success) => {
    if (error) {
        console.error('SMTP Transport Error:', error);
    } else {
        console.log('SMTP Server is ready to send emails');
    }
});

// Function to send email
const sendEmail = (subject, textContent, recipientEmail) => {
    const mailOptions = {
        from: process.env.SMTP_USER,   // Use the SMTP user for your email
        to: recipientEmail,            // Dynamic recipient email
        subject: subject,              // Dynamic subject
        text: textContent              // Dynamic text content
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject('Error sending email: ' + error);
            } else {
                resolve('Email sent: ' + info.response);
            }
        });
    });
};

module.exports = { sendEmail };
