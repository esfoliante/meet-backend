import { Router } from 'express';
import UserController from '@controllers/UserController';

const authRoutes: Router = Router();

authRoutes.post('/register', UserController.store);
authRoutes.post('/login', UserController.login);

export default authRoutes;
