import { encryptPassword } from './../../utils/bcrypt';
import { issueJWT } from '../../utils/jwt';
import { getCurrentUser, logOutUser } from './auth.controller';
import express from 'express';
import passport from 'passport';
import User, { IUser } from '../../models/user.model';

const authRouter = express.Router();

authRouter.post(
	'/local',
	passport.authenticate('local', {
		failureRedirect: '/auth/failed',
		// session: false,
	}),
	function (req, res) {
		const { token, expires } = issueJWT(req.user);
		return res.json({ accessToken: token, expires, success: true });
		// return res.json(req.user);
		// res.redirect('/auth/me');
	}
);

authRouter.post('/login', passport.authenticate('local', {}), function (req, res) {
	res.redirect('/auth/me');
});

authRouter.post('/signup', async function (req, res) {
	const user = await new User({ email: req.body.email, password: await encryptPassword(req.body.password) });
	await user.save();
	return res.status(200).json(user);
});

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] } as any));
authRouter.get(
	'/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/auth/failed',
		failureMessage: 'Google Authentication Failed',
		session: false,
	}),
	function (req, res) {
		const { token, expires } = issueJWT(req.user);
		return res.json({ accessToken: token, expires, success: true });
	}
);

authRouter.get(
	'/facebook',
	passport.authenticate('facebook', {
		scope: ['email', 'public_profile'],
	})
);

authRouter.get(
	'/facebook/callback',
	(req, res, next) => {
		next();
	},
	passport.authenticate('facebook', { failureRedirect: '/auth/failed', failureMessage: true }),
	function (req, res) {
		const { token, expires } = issueJWT(req.user);
		return res.json({ accessToken: token, expires, success: true });
	}
);

authRouter.post(
	'/email',
	passport.authenticate('magiclink', {
		action: 'requestToken',
		failureRedirect: '/auth/failed',
		failureMessage: true,
		session: false,
	} as any),
	(req, res) => res.redirect('/auth/check-your-inbox')
);

authRouter.get(
	'/email/verify',
	passport.authenticate('magiclink', {
		failureRedirect: '/auth/failed',
	}),
	function (req, res) {
		console.log(req.user);
		const { token, expires } = issueJWT(req.user);
		return res.json({ accessToken: token, expires, success: true });
	}
);

authRouter.post(
	'/custom',
	passport.authenticate('custom', { failureRedirect: '/auth/failed' }),
	function (req, res) {
		res.redirect('/auth/check-your-inbox');
	}
);

authRouter.post('/anonymous', passport.authenticate('anonymId'), function (req, res) {
	const { token, expires } = issueJWT(req.user);
	return res.json({ accessToken: token, expires, success: true });
});

authRouter.get('/me', passport.authenticate('jwt', { session: false }), function (req, res) {
	if (!req.user) {
		return res.status(400).json({ success: false });
	}
	const user = req.user as IUser;
	return res.status(200).json({ email: user.email });
});
authRouter.get('/check-your-inbox', (req, res) => {
	return res.send('Check your Email');
});
authRouter.get('/logout', logOutUser);
authRouter.get('/failed', (req, res) => {
	res.status(400).json({ success: false });
});

export default authRouter;
