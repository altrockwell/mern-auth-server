import { Strategy } from 'passport-facebook';

const clientID: string = process.env['FACEBOOK_APP_ID'] as string;
const clientSecret: string = process.env['FACEBOOK_APP_SECRET'] as string;
const config = {
	clientID,
	clientSecret,
	callbackURL: '/auth/facebook/callback',
};

function verify(accessToken: string, refreshToken: string, profile: any, cb: any) {
	return cb(null, profile);
}
console.log(clientID, clientSecret);
export default new Strategy(config, verify);
