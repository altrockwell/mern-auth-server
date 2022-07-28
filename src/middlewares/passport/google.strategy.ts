import { Strategy as GoogleStrategy, VerifyCallback } from 'passport-google-oauth20';
import dotenv from 'dotenv';

dotenv.config();

const googleVerify = (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
	// find user if exist, if not create new
	return done(null, profile);
};

const googleClient: string = process.env.GOOGLE_CLIENT_ID as string;
const googleSecret: string = process.env.GOOGLE_CLIENT_SECRET as string;

const googleStrategyConfig = {
	clientID: googleClient,
	clientSecret: googleSecret,
	callbackURL: '/auth/google/callback',
};

export default new GoogleStrategy(googleStrategyConfig, googleVerify);
