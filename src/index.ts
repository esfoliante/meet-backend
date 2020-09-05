import authRoutes from '@routes/auth.routes';
import routes from '@routes/user.routes';
import express from 'express';

import { resolve } from 'path';
import { config } from 'dotenv';
import AuthMiddleware from '@middlewares/AuthMiddleware';

config({ path: resolve(__dirname, '../.env') });

const app = express();

app.use(express.json());
app.use(authRoutes);

app.use(AuthMiddleware.handle);
app.use(routes);

app.listen(3333, function () {
	console.log('App listening to port: 3333');
});
