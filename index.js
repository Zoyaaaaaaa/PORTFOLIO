const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'zoyah768@gmail.com', 
    pass: 'mrbs farp anwq lsdg'
  }
});

// Handle form submission
app.post('/send-email', (req, res) => {
    const { email, message } = req.body;
  
    const mailOptions = {
      from: 'zoyah768@gmail.com', 
      to: email,
      subject: 'Message from Portfolio website',
      text: `Message from: ${email}\n\n${message}` 
    };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
