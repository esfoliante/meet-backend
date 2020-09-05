import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default {
	async handle(req: Request, res: Response, next: Function) {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			return res.status(401).json({ message: 'Token not provided' });
		}

		const [, token] = authHeader.split(' ');

		try {
			jwt.verify(token, process.env.SECRET_TOKEN || '');
			return next();
		} catch (error) {
			return res.status(400).json({ message: 'Invalid token.' });
		}
	},
};
