import jsonWebToken from 'jsonwebtoken';
import { IUser } from '../models/user.model';

export const issueJWT = (user: any) => {
	const _id = user._id;

	const expiresIn = '2 days';

	const payload = {
		sub: {
			id: user._id,
			email: user.email,
			password: user.password || 'none',
		},
		iat: Date.now(),
	};

	const signedToken = jsonWebToken.sign(payload, 'secret', { expiresIn: expiresIn });

	return {
		token: 'Bearer ' + signedToken,
		expires: expiresIn,
	};
};
