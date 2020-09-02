import { Request, Response } from 'express';

export default {
	async index(req: Request, res: Response) {
		return res.json({ message: 'Healthy' });
	},
};
