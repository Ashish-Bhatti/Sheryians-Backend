import nodemailer from 'nodemailer';

// transporter communicate between web server and smtp sever(used for sending email). SMTP server own by google and to use them we need GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, GOOGLE_USER from .env file
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.GOOGLE_USER,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        clientId: process.env.GOOGLE_CLIENT_ID,
    },
});

// it will check transporter is working properly or not
transporter
    .verify()
    .then(() => {
        console.log('Ready to send email');
    })
    .catch((err) => {
        console.error('Error with email transporter: ', errr);
    });

export const sendEmail = async ({ to, subject, html, text }) => {
    const mailOptions = {
        from: process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text,
    };
    const details = await transporter.sendMail(mailOptions);
    console.log(details);
};
