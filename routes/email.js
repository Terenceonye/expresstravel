const express = require('express');
const { sendEmail } = require('../utils/emailServices'); // Import the sendEmail function
const router = express.Router();

router.use(express.json()); // Parse JSON request body

// Route for flight booking email
router.post('/send-email', (req, res) => {
    const { firstName, lastName, email, phone, flyingFrom, flyingTo, departureDate, returnDate, flightClass, numAdults, numChildren } = req.body;

    // Admin email content
    const adminSubject = 'New Flight Booking Request';
    const adminText = `You have received a new flight booking request:\n\n
                         First Name: ${firstName}\n
                         Last Name: ${lastName}\n
                         Email: ${email}\n
                         Phone: ${phone}\n
                         Flying From: ${flyingFrom}\n
                         Flying To: ${flyingTo}\n
                         Departure Date: ${departureDate}\n
                         Return Date: ${returnDate}\n
                         Class: ${flightClass}\n
                         Number of Adults: ${numAdults}\n
                         Number of Children: ${numChildren}\n`;

    // User confirmation email
    const userSubject = 'Flight Booking Confirmation';
    const userText = `Dear ${firstName} ${lastName},\n\n
                      Thank you for your flight booking request. Here are your details:\n
                      Flying From: ${flyingFrom}\n
                      Flying To: ${flyingTo}\n
                      Departure Date: ${departureDate}\n
                      Return Date: ${returnDate}\n
                      Class: ${flightClass}\n
                      Number of Adults: ${numAdults}\n
                      Number of Children: ${numChildren}\n\n
                      We will contact you shortly to confirm your booking.\n\n
                      Best regards,\nFlight Support Team`;

    // Admin and user email addresses
    const adminEmail = 'onyeweketerence@gmail.com'; // Replace with your admin email
    const userEmail = email;

    // Send both emails
    Promise.all([
        sendEmail(adminSubject, adminText, adminEmail), // Email to admin
        sendEmail(userSubject, userText, userEmail)     // Email to user
    ])
        .then(() => {
            res.status(200).json({ success: true, message: 'Emails sent successfully!' });
        })
        .catch((error) => {
            console.error('Error sending emails:', error);
            res.status(500).json({ success: false, message: 'Failed to send emails.' });
        });
});

// Route for contact-us form email
router.post('/contact-us', (req, res) => {
    const { name, email, message } = req.body;

    // Admin email content
    const adminSubject = 'New Contact Us Message';
    const adminText = `You have received a new message from the Contact Us form:\n\n
                         Name: ${name}\n
                         Email: ${email}\n
                         Message: ${message}\n`;

    // User confirmation email
    const userSubject = 'We Have Received Your Message';
    const userText = `Dear ${name},\n
                      Thank you for contacting us. We have received your message:\n
                      "${message}"\n
                      Our team will get back to you shortly.\n
                      Best regards,\nSupport Team`;

    // Admin and user email addresses
    const adminEmail = 'onyeweketerence@gmail.com'; // Replace with your admin email
    const userEmail = email;

    // Send both emails
    Promise.all([
        sendEmail(adminSubject, adminText, adminEmail), // Email to admin
        sendEmail(userSubject, userText, userEmail)     // Email to user
    ])
        .then(() => {
            res.status(200).json({ success: true, message: 'Emails sent successfully!' });
        })
        .catch((error) => {
            console.error('Error sending emails:', error);
            res.status(500).json({ success: false, message: 'Failed to send emails.' });
        });
});

module.exports = router;
