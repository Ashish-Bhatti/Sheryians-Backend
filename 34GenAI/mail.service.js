import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAUTH2',
        user: process.env.GOOGLE_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
});

transporter
    .verify()
    .then(() => {
        console.log('email transporter is ready to send emails');
    })
    .catch((err) => {
        console.error('email transporter verification failer', err);
    });

export async function sendEmail({ to, subject, html, text = '' }) {
    const mailOption = {
        from: process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text,
    };

    const details = await transporter.sendMail(mailOption);
    console.log('email sent : ', details);
    return 'email send successfully, to ' + to;
}
