import express from 'express';
import cors from 'cors';
import Connection from './database/db.js';
import routes from './routes/route.js';

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";


const app = express();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use('/', routes);

const PORT = 8000;

//sending mail
const transporter = nodemailer.createTransport({
  service: "gmail",   
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
});

const sendMail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (err) {
    console.log(err);
  }   
}


const genAI = new GoogleGenerativeAI(process.env.API_KEY);


app.post('/generate', async (req, res) => {
    const prompt = req.body.prompt;
    
    if (!prompt) {
      return res.status(400).send({ error: 'Prompt is required' });
    }
  
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // console.log(text);
    res.send({ generatedText: text });
  });

  // New route for sending emails
  // New route for sending emails
  app.post('/sendEmail', async (req, res) => {
    const mailContent = req.body.mailContent;
    const subject = req.body.subject;
    const to = req.body.to;
    
    const mailOptions = {
      from: {
        name: "Ayush Kumar",
        address: process.env.USER
      }, 
      to: to,
      subject: subject,
      text: mailContent,
      html: `<p>${mailContent.replace(/\n/g, "<br>")}</p>`,
    };

    sendMail(mailOptions)
      .then(() => res.status(200).send({ message: "Email sent successfully" }))
      .catch(error => res.status(500).send({ error: "Error sending email", details: error }));
});

Connection();

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));