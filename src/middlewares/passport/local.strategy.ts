import { Request } from 'express';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../../models/user.model';

const options = {
	usernameField: 'email',
	passwordField: 'password',
	session: false,
};

export default new LocalStrategy(options, async (username, password, done) => {
	console.log('Local Strategy Used');
	try {
		const user = await User.findOne({ email: username });
		if (!user) {
			return done(null, false);
		}
		if (!(await user.checkPassword(password))) {
			return done(null, false);
		}
		return done(null, user);
	} catch (error) {
		return done(error);
	}
});
