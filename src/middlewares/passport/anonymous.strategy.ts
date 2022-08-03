import User from '../../models/user.model';
const AnonymIdStrategy = require('passport-anonym-uuid');

async function verify(req: any, uuid: string, done: any) {
	console.log(uuid);
	try {
		const user = await User.findOneOrCreate({ uid: uuid, email: uuid });
		return done(null, user);
	} catch (error) {
		return done(error, false);
	}
}

export default new AnonymIdStrategy(verify);
