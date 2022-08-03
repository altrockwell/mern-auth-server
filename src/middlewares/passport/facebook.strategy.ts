import { Strategy } from 'passport-facebook';
import User from '../../models/user.model';

const clientID: string = process.env['FACEBOOK_APP_ID'] as string;
const clientSecret: string = process.env['FACEBOOK_APP_SECRET'] as string;
const config = {
	clientID,
	clientSecret,
	callbackURL: '/auth/facebook/callback',
};

async function verify(accessToken: string, refreshToken: string, profile: any, done: any) {
	try {
		const user = await User.findOneOrCreate({
			email: profile._json.email || profile.id,
			name: profile.displayName,
			uid: profile.id,
		});
		return done(null, user);
	} catch (err) {
		return done(err);
	}
}
export default new Strategy(config, verify);
