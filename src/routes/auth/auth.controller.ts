import console from 'console';
import { NextFunction, Request, Response } from 'express';
import User from '../../models/user.model';

export const registerUser = (req: Request, res: Response) => {};

export const getCurrentUser = (req: Request, res: Response) => {
	// console.log(req);
	if (req.user) {
		console.log('Hey');
		return res.status(200).json({
			success: true,
			message: 'successful',
			user: req.user,
			//   cookies: req.cookies
		});
	}
	return res.status(400);
};

export const logOutUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await req.logOut(function (err) {
			if (err) {
				return res.status(400).json({ success: false });
			}
			return res.status(200).json({ success: true });
		});
	} catch (error) {
		console.log('hello');
	}
};
