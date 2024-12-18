import 'dotenv/config';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import type { Context } from './context.js';
import { listRouter } from './routes/list.route.js';

const app = new Hono<Context>();
const fetch = app.fetch;
const port = parseInt(process.env.PORT ?? '8080');

app.route('/list', listRouter);

const server = serve({ fetch, port });
console.log(`Server is running on http://localhost:${port}`);

const shutdown = () => {
	server.close(() => {
		console.log('Server successfully shutdown');
		process.exit(0);
	});
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
