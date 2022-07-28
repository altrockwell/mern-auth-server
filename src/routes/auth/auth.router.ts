import { getCurrentUser, logOutUser } from './auth.controller';
import express from 'express';
import passport from 'passport';

const authRouter = express.Router();

authRouter.get('/google', passport.authenticate('google', { scope: ['profile'] }));
authRouter.get(
	'/google/callback',
	passport.authenticate('google', {
		failureRedirect: `${process.env.CLIENT_URL}/login` || '/login',
		failureMessage: 'Google Authentication Failed',
		successRedirect: process.env.CLIENT_URL || '/',
	})
);
authRouter.get('/me', getCurrentUser);
authRouter.get('/logout', logOutUser);

export default authRouter;
