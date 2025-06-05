import express from 'express';
import bodyParser from 'body-parser';
import { sendMailToUser, sendMailToCompany } from './Mailer.js';
import cors from 'cors'

const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: 'https://smtp-form-submission.vercel.app',
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));

app.post('/api/contact', async (req, res) => {
  const { name, phoneNumber, email, service, message } = req.body;
  try {
    await sendMailToUser( name, phoneNumber, email, service, message );
    await sendMailToCompany( name, phoneNumber, email, service, message );
    await fetch ('https://script.google.com/macros/s/AKfycbzFcqTICyfqrhgkhTsPYU0Zwp7d-wrkEt9THzfV9fLFRwSyYPmXgfmm-4glWRm4K2bw/exec', {
      method: 'POST',
      headers: {'Content-Type':'application/JSON'},
      body: JSON.stringify({name, phoneNumber, email, service, message})
    })
    res.status(200).send({ success: true });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).send({ success: false, error: err.message });
  }
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
