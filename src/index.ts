import 'dotenv/config';
import { serve, type HttpBindings } from '@hono/node-server';
import { Hono } from 'hono';
import { listRouter } from './routes/list.js';

const app = new Hono<{ Bindings: HttpBindings }>();
const fetch = app.fetch;
const port = parseInt(process.env.PORT ?? '8080');

app.route('/list', listRouter);

const server = serve({ fetch, port });
console.log(`Server is running on http://localhost:${port}`);

const shutdown = () => {
	server.close(() => {
		console.log('Server successfully shutdown');
	});
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
