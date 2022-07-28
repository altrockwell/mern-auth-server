const MagicLinkStrategy = require('passport-magic-link').Strategy;
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env['SENDGRID_API_KEY'] as string);

function send(user: any, token: string) {
	var link = 'http://localhost:3000/login/email/verify?token=' + token;
	var msg = {
		to: user.email,
		from: process.env['SENDGRID_EMAIL'] as string,
		subject: 'Sign in to Todos',
		text: 'Hello! Click the link below to finish signing in to Todos.\r\n\r\n' + link,
		html:
			'<h3>Hello!</h3><p>Click the link below to finish signing in to Todos.</p><p><a href="' +
			link +
			'">Sign in</a></p>',
	};
	return sendgrid.send(msg);
}

function verify(user: any) {
	return new Promise(function (resolve, reject) {
		resolve(user);
	});
}

export default new MagicLinkStrategy(
	{
		secret: 'keyboard cat',
		userFields: ['email'],
		tokenField: 'token',
		verifyUserAfterToken: true,
	},
	send,
	verify
);
