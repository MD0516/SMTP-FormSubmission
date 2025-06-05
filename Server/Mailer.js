import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // Use `true` for port 465, `false` for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendMailToUser(name, phoneNumber, email, service, message) {
  await transporter.sendMail({
    from: `"ARKFA" <${process.env.FROM_EMAIL}>`,
    to: email,
    subject: "Thanks for contacting us!",
    html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Thank You for Contacting Us</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f2f4f8;
            padding: 20px;
          }
          .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            max-width: 600px;
            margin: auto;
            box-shadow: 0 5px 10px rgba(0,0,0,0.05);
          }
          h2 {
            color: #007bff;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Thank You, ${name}!</h2>
          <p>We have received your message and will get back to you shortly.</p>
          <p><strong>Your Submitted Details:</strong></p>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phoneNumber}</li>
            <li><strong>Service:</strong> ${service}</li>
            <li><strong>Message:</strong> ${message}</li>
          </ul>
          <p>Best regards,<br/>ARKFA Team</p>
        </div>
      </body>
    </html>
    `,
  });
}

export async function sendMailToCompany(name, phoneNumber, email, service, message) {
  await transporter.sendMail({
    from: `"Website Bot" <${process.env.FROM_EMAIL}>`,
    to: process.env.COMPANY_EMAIL,
    subject: `New Contact Form Submission from ${name}`,
    html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>New Contact Form Submission</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            padding: 20px;
          }
          .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            max-width: 600px;
            margin: auto;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          }
          h2 {
            color: #333;
          }
          ul {
            padding-left: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>New Contact Form Submission</h2>
          <p>You have received a new message via the website contact form.</p>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone Number:</strong> ${phoneNumber}</li>
            <li><strong>Selected Service:</strong> ${service}</li>
            <li><strong>Message:</strong> ${message}</li>
          </ul>
        </div>
      </body>
    </html>
    `,
  });
}
