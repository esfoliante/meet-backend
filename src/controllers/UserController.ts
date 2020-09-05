import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import bcrypt from 'bcrypt';

import RegisterUserRequest from '@requests/RegisterUserRequest';
import LoginUserRequest from '@requests/LoginUserRequest';

import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default {
	async index(req: Request, res: Response) {
		return res.json({ message: 'Hello' });
	},

	async store(req: Request, res: Response) {
		const { name, email, password, gender, birthDate } = req.body;

		const { error } = RegisterUserRequest(req.body);

		if (error) return res.json(error);

		// Generate password hash
		const salt: string = await bcrypt.genSalt(10);
		const password_hash: string = await bcrypt.hash(password, salt);

		const verifyEmailExists = await prisma.user.findOne({
			where: {
				email: email,
			},
		});

		if (verifyEmailExists)
			return res.status(400).json({ message: 'Email already exists' });

		const user = await prisma.user.create({
			data: {
				name: name,
				email: email,
				gender: gender,
				password: password_hash,
				birthDate: birthDate,
				Role: {
					connect: {
						name: 'user',
					},
				},
			},
		});

		return res.status(201).json(user);
	},

	async login(req: Request, res: Response) {
		const { email, password } = req.body;

		const { error } = LoginUserRequest(req.body);

		if (error) return res.json(error);

		const user = await prisma.user.findOne({
			where: {
				email: email,
			},
			include: {
				Role: true,
			},
		});

		if (!user) return res.status(400).json({ message: 'Wrong email' });

		const validatePassword = await bcrypt.compare(password, user.password);

		if (!validatePassword) res.status(400).json({ message: 'Wrong password' });

		const token = jwt.sign({ _id: user.id }, process.env.SECRET_TOKEN || '');

		return res.status(200).json({ user, token });
	},
};
