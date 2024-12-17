const nodemailer = require('nodemailer');
require('dotenv').config(); // For environment variables

// Configure Nodemailer transport to use SMTP server
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    debug: true,  // Enable debugging output
    logger: true  // Log the entire process
});

// Function to send an email
const sendEmail = (subject, textContent, recipientEmail) => {
    const mailOptions = {
        from: `Express Travel And Tour <${process.env.SMTP_USER}>`,  // Sender's email (must match SMTP user)
        to: recipientEmail,           // Recipient's email
        subject: subject,             // Email subject
        text: textContent             // Email body
    };

    return transporter.sendMail(mailOptions); // Return a promise
};

// Function to send two emails
const sendAdminAndUserEmails = (subjectAdmin, textAdmin, adminEmail, subjectUser, textUser, userEmail) => {
    return Promise.all([
        sendEmail(subjectAdmin, textAdmin, adminEmail), // Email to admin
        sendEmail(subjectUser, textUser, userEmail)     // Email to user
    ]);
};

// Export both functions
module.exports = { sendEmail, sendAdminAndUserEmails };
