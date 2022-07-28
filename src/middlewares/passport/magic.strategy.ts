const MagicLinkStrategy = require('passport-magic-link').Strategy;
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env['SENDGRID_API_KEY'] as string);

import sendEmail from '../../utils/sendEmail';

function send(user: any, token: string) {
	var link = 'https://localhost:8000/auth/email/verify?token=' + token;
	// var msg = {
	// 	to: user.email,
	// 	from: process.env['SENDGRID_EMAIL'] as string,
	// 	subject: 'Sign in to MERN auth',
	// 	text: 'Hello! Click the link below to finish signing in to MERN auth.\r\n\r\n' + link,
	// 	html:
	// 		'<h3>Hello!</h3><p>Click the link below to finish signing in to MERN auth.</p><p><a href="' +
	// 		link +
	// 		'">Sign in</a></p>',
	// };
	// return sendgrid.send(msg);
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
	return new Promise(function (resolve, reject) {
		resolve(user);
	});
}

export default new MagicLinkStrategy(
	{
		secret: 'keyboard cat',
		userFields: ['name', 'email'],
		tokenField: 'token',
		verifyUserAfterToken: true,
	},
	send,
	verify
);
