import { createMiddleware } from 'hono/factory';
import { GlanceError } from '../components/glance-error.component.js';

export const tubeArchivistMiddleware = createMiddleware<{
	Variables: {
		taHost: string;
		taToken: string;
	};
}>(async (c, next) => {
	const queryHost = c.req.query('host');
	const envHost = process.env.TA_HOST;
	const host = queryHost || envHost;

	const queryToken = c.req.query('token');
	const envToken = process.env.TA_TOKEN;
	const token = queryToken || envToken;

	if (!host || !token) {
		const error =
			'Your TubeArchivist host URL and token must be passed as parameters named "host" and "token" respectively';
		return c.html(<GlanceError>{error}</GlanceError>, 400);
	}

	c.set('taHost', host);
	c.set('taToken', token);
	await next();
});
