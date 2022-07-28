import passport from 'passport';
import { Strategy as GoogleStrategy, VerifyCallback } from 'passport-google-oauth20';

const googleVerify = (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
	// find user if exist, if not create new
	return done(null, profile);
};

export default function initialize(googleStrategyConfig: any) {
	console.log(googleStrategyConfig);
	// Strategies
	passport.use(new GoogleStrategy(googleStrategyConfig, googleVerify));

	// Serializers
	passport.serializeUser((user: any, done: VerifyCallback) => done(null, user));
	passport.deserializeUser((user: any, done: VerifyCallback) => {
		return done(null, user);
	});
}
