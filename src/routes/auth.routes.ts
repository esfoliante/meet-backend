import { Router } from 'express';
import UserController from '@controllers/UserController';

const routes: Router = Router();

routes.post('/register', UserController.store);
routes.post('/login', UserController.login);

export default routes;
