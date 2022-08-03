const MagicLinkStrategy = require('passport-magic-link').Strategy;
import sendgrid from '@sendgrid/mail';
import User from '../../models/user.model';

sendgrid.setApiKey(process.env['SENDGRID_API_KEY'] as string);

import sendEmail from '../../utils/sendEmail';

function send(user: any, token: string) {
	var link = 'https://localhost:8000/auth/email/verify?token=' + token;

	return sendEmail({
		receiver: user.email,
		html:
			'<h3>Hello!</h3><p>Click the link below to finish signing in to MERN auth.</p><p><a href="' +
			link +
			'">Sign in</a></p>',
	});
}

function verify(user: any) {
	console.log(user);
	return new Promise(async function (resolve, reject) {
		try {
			const newUser = await User.findOneOrCreate(user);
			return resolve(newUser);
		} catch (error) {
			return reject(error);
		}
	});
}

export default new MagicLinkStrategy(
	{
		secret: 'keyboard cat',
		userFields: ['email'],
		tokenField: 'token',
		verifyUserAfterToken: true,
		session: false,
	},
	send,
	verify
);
