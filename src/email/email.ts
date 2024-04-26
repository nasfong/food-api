import { Router } from "express";
import nodemailer from 'nodemailer';

const routerEmail = Router();

routerEmail.post('',
  async (req, res) => {
    const { user_name, user_email, message } = req.body;

    // Create a Nodemailer transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: 'mail.maomkhmercuisine.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'info@maomkhmercuisine.com', // Your email address
        pass: 'VfX,H}30Da1I' // Your email password or app-specific password
      },
      tls: {
        // RejectUnauthorized should be set to false to ignore certificate errors
        rejectUnauthorized: false
      }
    });

    try {
      // Send mail with defined transport object
      await transporter.sendMail({
        from: '"Maom Khmer Cuisine" <info@maomkhmercuisine.com>', // Sender address
        to: 'info@maomkhmercuisine.com', // List of recipients
        subject: 'maomkhmercuisine.com', // Subject line
        html: `<p>Hello ${user_name},</p>
      <p>You got a new message from ${user_email}:</p>
      <p style="padding: 12px; border-left: 4px solid #d0d0d0; font-style: italic;">
        ${message}
      </p>
      <p>
        Best wishes,<br>Maom Khmer Cuisine team
      </p>`
      });
      res.setHeader('Content-Type', 'text/html')
      res.send('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    }
  }
);

export { routerEmail };
