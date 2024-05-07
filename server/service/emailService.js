import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.API_KEY_MailSend);


// Function to send email
export const sendEmail = async (to, subject, text, html) => {
  const msg = {
    to:'ayush_kumar@srmap.edu.in',
  from: 'pranathi_j@srmap.edu.in',
  subject:'xdvxdv',
  text:'dgfghf vgjv',
  html:'<h1>cfbcfbc cfcf</h1>',
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error.response.body);
  }
};

