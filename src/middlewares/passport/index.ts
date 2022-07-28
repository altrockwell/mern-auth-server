import { VerifyCallback } from 'passport-google-oauth20';
import passport from 'passport';
import googleStrategy from './google.strategy';
import localStrategy from './local.strategy';
import facebookStrategy from './facebook.strategy';

export default function initialize() {
	// Strategies
	passport.use(googleStrategy);
	passport.use(facebookStrategy);
	passport.use(localStrategy);

	// Serializers
	passport.serializeUser((user: any, done: VerifyCallback) => done(null, user));
	passport.deserializeUser((user: any, done: VerifyCallback) => {
		return done(null, user);
	});
}
