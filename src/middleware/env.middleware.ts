import { createMiddleware } from 'hono/factory';

export const envMiddleware = createMiddleware(async (c, next) => {
	c.set('env', process.env);
	await next();
});
