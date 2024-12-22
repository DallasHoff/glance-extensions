import { createMiddleware } from 'hono/factory';
import { GlanceError } from '../components/glance-error.component.js';
import type { AppContext } from '../context.js';

export type TubeArchivistContext = {
	Variables: {
		taHost: string;
		taToken: string;
		taHeaders: { Authorization: `Token ${string}` };
	};
};

export const tubeArchivistMiddleware = createMiddleware<
	AppContext & TubeArchivistContext
>(async (c, next) => {
	const queryHost = c.req.query('host');
	const envHost = c.var.env.TA_HOST;
	const host = queryHost || envHost;

	const queryToken = c.req.query('token');
	const envToken = c.var.env.TA_TOKEN;
	const token = queryToken || envToken;

	if (!host || !token) {
		const error =
			'Your TubeArchivist host URL and token must be passed as parameters named "host" and "token" respectively';
		return c.html(<GlanceError>{error}</GlanceError>, 400);
	}

	c.set('taHost', host);
	c.set('taToken', token);
	c.set('taHeaders', { Authorization: `Token ${token}` });
	await next();
});
