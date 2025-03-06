import 'dotenv/config';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import type { AppContext } from './context.js';
import { todoistRouter } from './routes/todoist.route.js';
import { tubeArchivistRouter } from './routes/tubearchivist.route.js';
import { envMiddleware } from './middleware/env.middleware.js';
import { prometheus } from '@hono/prometheus';

const app = new Hono<AppContext>();
const fetch = app.fetch;
const port = parseInt(process.env.PORT ?? '8080');
const { printMetrics, registerMetrics } = prometheus();

app.use(registerMetrics);
app.use(envMiddleware);

app.get('/metrics', printMetrics);
app.route('/todoist', todoistRouter);
app.route('/tubearchivist', tubeArchivistRouter);

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
