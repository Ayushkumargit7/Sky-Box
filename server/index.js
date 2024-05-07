import express from 'express';
import cors from 'cors';
import Connection from './database/db.js';
import routes from './routes/route.js';

const app = express();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use('/', routes);

const PORT = 8000;


// Gen AI code starts
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";
// dotenv.config();

// // Access your API key as an environment variable (see "Set up your API key" above)
// const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// async function run() {
//   // For text-only input, use the gemini-pro model
//   const model = genAI.getGenerativeModel({ model: "gemini-pro"});

//   const prompt = "write a referral email "

//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();
//   console.log(text);

// }

// run();
// Gen AI code ends

// Gen AI code starts


import sgMail from '@sendgrid/mail';
const API_KEY = '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';
sgMail.setApiKey(API_KEY);
const msg = {
  to: 'ayush_kumar@srmap.edu.in',
  from: 'ayushk1708@gmail.com', // Use the email address or domain you verified above
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail
  .send(msg)
  .then(() => {}, error => {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  });
//ES8
(async () => {
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  }
})();



import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

// Access your API key as an environment variable (see "Set up your API key" above)
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

Connection();

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));