import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import User from '../../models/user.model';

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: 'secret',
	// algorithms: ['RS256'],
	// audience: 'https://localhost:3000',
};
const verify = async (jwt_payload: any, done: VerifiedCallback) => {
	try {
		const user = await User.findById(jwt_payload.sub.id);
		if (!user) {
			return done(null, false, { message: 'Invalid Credentials' });
		}
		return done(null, user);
	} catch (error) {
		return done(error);
	}
};

export default new JwtStrategy(options, verify);
