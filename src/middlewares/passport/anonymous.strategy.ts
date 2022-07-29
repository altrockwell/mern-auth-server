import { VerifyCallback } from 'passport-google-oauth20';
const AnonymIdStrategy = require('passport-anonym-uuid');

function verify(req: any, uuid: string, done: VerifyCallback) {
	// req.user.username = uuid;
	// Save the uuid of the anonymous account to upgrade to other strategy
	return done(null, { username: uuid });
}

export default new AnonymIdStrategy(verify);
