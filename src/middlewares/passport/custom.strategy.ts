import { Strategy } from 'passport-custom';
import sendEmail from '../../utils/sendEmail';
import User from '../../models/user.model';

export default new Strategy(async function (req, callback) {
	// Do your custom user finding logic here, or set to false based on req object
	const user = User.find((user) => user.email === req.body.email);

	if (!user) {
		console.log('New User!');
		User.push({ email: req.body.email });
	}
	console.log(User);
	// await sendEmail({ receiver: req.body.email });
	callback(null, { name: 'John Doe', email: req.body.email });
});
