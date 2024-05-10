// const nodemailer = require("nodemailer");
// require("dotenv").config();
import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",   
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
},
});

const mailContent = `Dear [Hiring Manager name (if known)],

I hope this email finds you well.

I'm writing to enthusiastically recommend [Your Name] for the Software Development Engineer (SDE) position at Microsoft. I've had the pleasure of working with [Your Name] at [Previous Company] for [Number] years in my role as [Your Title]. During this time, [he/she] has consistently impressed me with [his/her] strong technical skills, problem-solving abilities, and collaborative spirit.

[Your Name] possesses a deep understanding of [mention relevant technical skills and programming languages]. [He/She] consistently delivers high-quality code, often exceeding expectations by [mention a specific example of their accomplishment]. [Your Name] is also a quick learner and is always eager to tackle new challenges.Thank you for your time and consideration.

Sincerely,
[Your Name]
`;

const mailOptions = {
    from: {
        name: "Ayush Kumar",
        address: process.env.USER
    }, 
    // sender address
    // to: "jvlpranathi@gmail.com", // list of receivers
    to: "ayushk1708@gmail.com", // list of receivers
    subject: "Hi !! working right 😎 From nodemailer", // Subject line
    text: mailContent,
    html: `<p>${mailContent.replace(/\n/g, "<br>")}</p>`,
}

const sendMail = async (transporter, mailOptions) => {
    try{
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    }catch(err){
        console.log(err);
    }   
}

sendMail(transporter, mailOptions);