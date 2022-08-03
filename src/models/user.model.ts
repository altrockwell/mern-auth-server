import bcrypt from 'bcrypt';
import { Schema, model, connect, Model } from 'mongoose';

export interface IUser {
	_id?: string;
	name?: string;
	email?: string;
	uid?: string;
	password?: string;
}

interface IUserMethods {
	checkPassword(password: string): Promise<boolean>;
}

export interface UserModel extends Model<IUser, {}, IUserMethods> {
	findOneOrCreate(user: IUser): Promise<IUser>;
}

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
	{
		name: { type: String, min: 3, max: 255 },
		email: { type: String, min: 5, max: 455 },
		uid: { type: String, min: 5, max: 255 },
		password: { type: String, min: 5, max: 455 },
	},
	{ timestamps: true }
);

userSchema.method('checkPassword', async function (password) {
	return await bcrypt.compare(password, this.password);
});

userSchema.static('findOneOrCreate', async function (user) {
	try {
		const foundUser = await User.findOne(user);
		if (!foundUser) {
			console.log('New User Found');
			const newUser = await new User(user);
			await newUser.save();
			return newUser;
		}
		console.log('Old User Found');

		return foundUser;
	} catch (error) {
		throw new Error('Sorry Something Happen ' + error);
	}
});

const User = model<IUser, UserModel>('User', userSchema);

export default User;

// const user = new User({name: "Jonathan Aplacador",email: "nathanmaru7@gmail.com", password: "dfjlsfjer"})
