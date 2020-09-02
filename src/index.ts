import routes from '@routes/auth.routes';
import express from 'express';

import { resolve } from 'path';
import { config } from 'dotenv';

config({ path: resolve(__dirname, '../.env') });

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, function () {
	console.log('App listening to port: 3333');
});
