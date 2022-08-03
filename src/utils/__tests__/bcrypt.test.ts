import { isPasswordValid } from './../bcrypt';
const { encryptPassword } = require('../bcrypt');
import bcrypt from 'bcrypt';

describe('encryptPassword', () => {
	it('returns encrypted password', async () => {
		const res = await encryptPassword('a');
		expect(res).not.toBe('a');
	});
});
describe('isPasswordValid', () => {
	it('calls bcrypt compare', async () => {
		const res = await isPasswordValid('a', 'a');
		expect(bcrypt.compare).toBeCalled();
	});
});
