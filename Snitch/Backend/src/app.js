import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import productRouter from './routes/product.routes.js';
import cors from 'cors';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from './config/config.js';
import cartRouter from './routes/cart.routes.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(
//     cors({
//         origin: 'http://localhost:5173',
//         credentials: true,
//     })
// );

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use(passport.initialize());
passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/auth/google/callback',
        },
        (_, __, profile, done) => {
            return done(null, profile);
        }
    )
);

app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);

export default app;
