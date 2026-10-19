import { Router } from 'express';
import User from '../models/user.model.js';
import passport from 'passport';

const authRouter = Router();

authRouter.get('/google', passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email'] }));

authRouter.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/login' }), async (req, res) => {
    try {
        const { id, displayName, emails, photos } = req.user;
        let user = await User.findOne({ googleId: id });
        if (!user) {
            user = new User({
                googleId: id,
                name: displayName,
                email: emails[0].value,
                avatar: photos[0].value,
            });
            await user.save();
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true });
        res.redirect('/'); // redirect to home page

        res.send('Google login successful');
    } catch (error) {
        console.log('Error during Google authentication', error);
        res.redirect('/'); // redirect to home page
    }
});

export default authRouter;
