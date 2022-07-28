import nodemailer from 'nodemailer';

interface ISend {
	receiver: string;
	subject?: string;
	text?: string;
	html?: string;
}

async function send({ receiver, subject = 'Hello ✔', html = "'<b>Hello world?</b>'" }: ISend) {
	// const testAccount = await nodemailer.createTestAccount();
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		port: 465,
		secure: true, // true for 465, false for other ports
		auth: {
			user: process.env.EMAIL, // generated ethereal user
			pass: process.env.PASSWORD, // generated ethereal password
		},
	});

	const info = await transporter.sendMail({
		from: process.env.EMAIL, // sender address
		to: receiver, // list of receivers
		subject, // Subject line
		html, // html body
	});
}

export default send;
