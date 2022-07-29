import { getCurrentUser, logOutUser } from './auth.controller';
import express from 'express';
import passport from 'passport';

const authRouter = express.Router();

authRouter.post(
	'/local',
	(req, res, next) => {
		if (!req.body.username && !req.body.password) {
			return res.status(400).json({ success: false });
		}
		next();
	},
	passport.authenticate('local', { failureRedirect: '/auth/failed' }),
	function (req, res) {
		console.log(req.user);
		res.redirect('/auth/me');
	}
);

authRouter.get('/google', passport.authenticate('google', { scope: ['profile'] } as any));
authRouter.get(
	'/google/callback',
	passport.authenticate('google', {
		failureRedirect: `${process.env.CLIENT_URL}/login` || '/login',
		failureMessage: 'Google Authentication Failed',
		successRedirect: process.env.CLIENT_URL || '/auth/me',
	})
);

authRouter.get(
	'/facebook',
	passport.authenticate('facebook', {
		scope: ['email', 'user_location'],
	})
);

authRouter.get(
	'/facebook/callback',
	(req, res, next) => {
		next();
	},
	passport.authenticate('facebook', { failureRedirect: '/auth/failed', failureMessage: true }),
	function (req, res) {
		res.redirect('/auth/me');
	}
);

authRouter.post(
	'/email',
	passport.authenticate('magiclink', {
		action: 'requestToken',
		failureRedirect: '/auth/failed',
		failureMessage: true,
	} as any),
	(req, res) => res.redirect('/auth/check-your-inbox')
);

authRouter.get(
	'/email/verify',
	passport.authenticate('magiclink', {
		successReturnToOrRedirect: '/auth/me',
		failureRedirect: '/auth/failed',
	})
);

authRouter.post(
	'/custom',
	passport.authenticate('custom', { failureRedirect: '/auth/failed' }),
	function (req, res) {
		res.redirect('/auth/check-your-inbox');
	}
);

authRouter.get('/anonymous', passport.authenticate(['anonymId']), function (req, res) {
	return res.redirect('/auth/me');
});

authRouter.get('/me', getCurrentUser);
authRouter.get('/check-your-inbox', (req, res) => {
	return res.send('Check your Email');
});
authRouter.get('/logout', logOutUser);
authRouter.get('/failed', (req, res) => {
	res.send('Failed');
});

export default authRouter;
