import { VerifyCallback } from 'passport-google-oauth20';
import passport from 'passport';
import googleStrategy from './google.strategy';
import localStrategy from './local.strategy';
import facebookStrategy from './facebook.strategy';
import magicStrategy from './magic.strategy';
import customStrategy from './custom.strategy';
import anonymousStrategy from './anonymous.strategy';
import jwtStrategy from './jwt.strategy';

export default function initialize() {
	// Strategies
	passport.use(googleStrategy); // done
	passport.use(facebookStrategy); //done
	passport.use('local', localStrategy); //done
	passport.use(magicStrategy); //done
	passport.use(anonymousStrategy); //done
	passport.use(jwtStrategy); //done

	// Serializers
	passport.serializeUser((user: any, done: VerifyCallback) => done(null, user));
	passport.deserializeUser((user: any, done: VerifyCallback) => {
		return done(null, user);
	});
}
