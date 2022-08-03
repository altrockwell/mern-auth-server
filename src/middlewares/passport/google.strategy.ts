import { Strategy as GoogleStrategy, VerifyCallback } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import User from '../../models/user.model';

dotenv.config();

const googleVerify = async (accessToken: string, refreshToken: string, profile: any, done: any) => {
	try {
		const user = await User.findOneOrCreate({ email: profile._json.email, name: profile.displayName });
		return done(null, user);
	} catch (err) {
		return done(err);
	}
};

const googleClient: string = process.env.GOOGLE_CLIENT_ID as string;
const googleSecret: string = process.env.GOOGLE_CLIENT_SECRET as string;

const googleStrategyConfig = {
	clientID: googleClient,
	clientSecret: googleSecret,
	callbackURL: '/auth/google/callback',
};

export default new GoogleStrategy(googleStrategyConfig, googleVerify);
