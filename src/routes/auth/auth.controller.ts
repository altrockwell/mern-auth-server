import { NextFunction, Request, Response } from 'express';
import User from '../../models/user.model';

export const registerUser = (req: Request, res: Response) => {};

export const getCurrentUser = (req: Request, res: Response) => {
	if (!req.user) {
		return res.status(401).json({ success: false, user: null });
	}
	return res.status(200).json({ success: true, user: req.user });
};

export const logOutUser = (req: Request, res: Response, next: NextFunction) => {
	req.logOut(function (err) {
		if (err) {
			return res.status(400).json({ success: false });
		}
		return res.status(200).json({ success: true });
	});
};
