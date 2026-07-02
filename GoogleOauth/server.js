/* to use import we need to add
  "type" : "module"
in package.json file */

import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.send('hello how are you');
});

app.use(passport.initialize());

// Configure Passport to use Google OAuth 2.0 strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
        },
        (_, __, profile, done) => {
            // Here, you would typically find or create a user in your database
            // For this example, we'll just return the profile
            return done(null, profile);
        }
    )
);

// working - when we reqest on this api it will redirect to google authorization
app.get("/auth/google",
    passport.authenticate("google", { scope: [ "profile", "email" ] })
)

app.get('/auth/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/' }),
    (req, res) => {
    console.log(req.user);
    res.send('google authentication successful');
});

app.listen(3000, () => {
    console.log('server is running on port 3000');
});
