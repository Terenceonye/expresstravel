const express = require('express');
const { sendEmail } = require('../utils/emailServices'); // Import the sendEmail function
const router = express.Router();


router.post('/send-email', (req, res) => {
    const { firstName, lastName, email, phone, flyingFrom, flyingTo, departureDate, returnDate, flightClass, numAdults, numChildren } = req.body;

    const subject = 'New Flight Booking Request';
    const textContent = `You have received a new flight booking request:\n\n
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

    sendEmail(subject, textContent, 'onyeweketerence@gmail.com')
        .then((info) => {
            res.status(200).json({ success: true, message: info });
        })
        .catch((error) => {
            res.status(500).json({ success: false, message: error });
        });
});

// Example for Contact Us page email
router.post('/contact-us', (req, res) => {
    const { name, email, message } = req.body;

    const subject = 'New Contact Us Message';
    const textContent = `You have received a new message from the Contact Us form:\n\n
                         Name: ${name}\n
                         Email: ${email}\n
                         Message: ${message}\n`;

    sendEmail(subject, textContent, 'onyeweketerence@gmail.com')
        .then((info) => {
            res.status(200).json({ success: true, message: info });
        })
        .catch((error) => {
            res.status(500).json({ success: false, message: error });
        });
});


module.exports = router