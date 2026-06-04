# Nodemailer

Nodemailer is a Node.js module for sending email from backend applications.
It connects to an SMTP server or an email provider, composes the message, and then sends it to the recipient.

## How Nodemailer Works

1. Install Nodemailer:
   ```
   npm install nodemailer
   ```
2. Create a transporter with SMTP or provider settings.
3. Define the email content and recipient details.
4. Send the email using `transporter.sendMail()`.
5. Handle the success or error response.

## Typical Workflow

- Configure the SMTP transporter with host, port, and authentication.
- Build the message payload (`from`, `to`, `subject`, `text`, `html`).
- Call `transporter.sendMail(mailOptions)`.
- Use `then`/`catch` or `async`/`await` to process the result.

## Example

```js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: 'username',
    pass: 'password'
  }
});

const mailOptions = {
  from: 'sender@example.com',
  to: 'recipient@example.com',
  subject: 'Test email',
  text: 'Hello from Nodemailer!'
};

transporter.sendMail(mailOptions)
  .then(info => console.log('Email sent:', info.messageId))
  .catch(error => console.error('Error sending email:', error));
```

## Notes

- Use environment variables for credentials instead of hard-coding them.
- For Gmail, Outlook, or other providers, update the transporter settings accordingly.
- `secure` should be `true` for port `465`, and `false` for ports like `587`.



# 2 new packages
npm install @langchain/google-genai
npm i @langchain/mistralai
npm install langchain
npm i @tavily/core
npm i zod