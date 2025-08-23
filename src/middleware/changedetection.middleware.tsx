import { createMiddleware } from 'hono/factory';
import { GlanceError } from '../components/glance-error.component.js';
import type { AppContext } from '../context.js';

export type ChangeDetectionContext = {
	Variables: {
		cdHost: string;
		cdToken: string;
		cdWatchId: string;
		cdHeaders: { 'x-api-key': string };
	};
};

export const changeDetectionMiddleware = createMiddleware<
	AppContext & ChangeDetectionContext
>(async (c, next) => {
	const queryHost = c.req.query('host');
	const envHost = c.var.env.CHANGE_DETECTION_HOST;
	const host = queryHost || envHost;

	const queryToken = c.req.query('token');
	const envToken = c.var.env.CHANGE_DETECTION_TOKEN;
	const token = queryToken || envToken;

	const watchId = c.req.query('watchId');

	if (!host || !token || !watchId) {
		const error =
			'Your Change Detection host URL, API key, and ID of the watch for which to fetch text must be passed as parameters named "host," "token," and "watchId" respectively';
		return c.html(<GlanceError>{error}</GlanceError>, 400);
	}

	c.set('cdHost', host);
	c.set('cdToken', token);
	c.set('cdWatchId', watchId);
	c.set('cdHeaders', { 'x-api-key': token });
	await next();
});
