const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.post('/contact', (req, res) => {
    const { firstName, lastName, suggestion } = req.body;

    if (!firstName || !lastName || !suggestion) {
        return res.status(400).send('All fields are required.');
    }

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'satyasingh525553@gmail.com', // Update with your email address
            pass: 'ovftnllghtdoafqv', // Replace with the generated app password
        },
    });

    // Define the email options
    const mailOptions = {
        from: `${firstName} ${lastName} <your-email@example.com>`,
        to: 'recipient-email@example.com', // Update with the recipient email address
        subject: 'New suggestion from your website',
        text: `First Name: ${firstName}\nLast Name: ${lastName}\nSuggestion:\n${suggestion}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error);
            return res.status(500).send('Oops! Something went wrong.');
        }

        console.log('Email sent:', info.response);
        return res.status(200).send('Thank you for your suggestion 🐈🐈');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
