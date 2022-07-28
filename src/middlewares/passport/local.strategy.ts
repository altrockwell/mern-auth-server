import { Strategy } from 'passport-local';

export default new Strategy(function (username, password, done) {
	return done(null, { username: 'nathanmaru' });
});
