import { Router } from 'express';

const routes: Router = Router();

routes.get('/logtest', function (req, res) {
	return res.json({ message: 'Alive' });
});

export default routes;
