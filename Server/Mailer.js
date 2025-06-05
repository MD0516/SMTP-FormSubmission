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

export async function sendMailToUser(name, email) {
  await transporter.sendMail({
    from: `"ARKFA" <${process.env.FROM_EMAIL}>`,
    to: email,
    subject: "Thanks for contacting us!",
    html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #4CAF50;">Hi ${name},</h2>
        <p>Thank you for reaching out to us. We have received your message and will get back to you soon.</p>
        <br>
        <p>Regards,<br><strong>ARKFA Team</strong></p>
        <hr>
        <small>This is an automated message. Please do not reply.</small>
      </div>.`,
  });
}

export async function sendMailToCompany(name, email, message) {
  await transporter.sendMail({
    from: `"Website Bot" <${process.env.FROM_EMAIL}>`,
    to: process.env.COMPANY_EMAIL,
    subject: `New Contact Form Submission from ${name}`,
    html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>📩 New Inquiry Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
        <hr>
        <small>Received via contact form on your website.</small>
      </div>`,
  });
}
