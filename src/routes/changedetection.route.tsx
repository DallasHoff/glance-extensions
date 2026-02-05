import { Hono } from 'hono';
import type { AppContext } from '../context.js';
import { GlanceError } from '../components/glance-error.component.js';
import { changeDetectionMiddleware } from '../middleware/changedetection.middleware.js';

export const changeDetectionRouter = new Hono<AppContext>()
	.use(changeDetectionMiddleware)
	.get('/', async (c) => {
		const host = c.var.cdHost;
		const headers = c.var.cdHeaders;
		const watchId = c.var.cdWatchId;

		c.header('Widget-Title', 'Change Detection');
		c.header('Widget-Content-Type', 'html');

		let text = '';

		try {
			const url = new URL(`/api/v1/watch/${watchId}/history/latest`, host);
			const res = await fetch(url, { headers });
			text = await res.text();
		} catch (err) {
			console.error(err);
			const errMessage = err instanceof Error ? err.message : err;
			const error = `Failed to fetch text from Change Detection: ${errMessage}`;
			return c.html(<GlanceError>{error}</GlanceError>);
		}

		return c.html(<p style="white-space: pre-wrap">{text}</p>);
	});
