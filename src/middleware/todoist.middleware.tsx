import { createMiddleware } from 'hono/factory';
import { GlanceError } from '../components/glance-error.component.js';
import { TodoistApi } from '@doist/todoist-api-typescript';

export const todoistMiddleware = createMiddleware<{
	Variables: {
		todoist: TodoistApi;
	};
}>(async (c, next) => {
	const queryToken = c.req.query('token');
	const envToken = process.env.TODOIST_TOKEN;
	const token = queryToken || envToken;

	if (!token) {
		const error =
			'Your Todoist token must be passed as a parameter named "token"';
		return c.html(<GlanceError>{error}</GlanceError>, 400);
	}

	const todoist = new TodoistApi(token);

	c.set('todoist', todoist);
	await next();
});
