import { Hono } from 'hono';
import type { Task } from '@doist/todoist-api-typescript';
import type { Context } from '../context.js';
import { getTodoistErrorMessage, todoist } from '../apis/todoist.api.js';
import { GlanceError } from '../components/glance-error.component.js';
import { GlanceTodoList } from '../components/glance-todo-list.component.js';

export const listRouter = new Hono<Context>()
	.get('/', async (c) => {
		const filter = c.req.query('filter') ?? 'today';
		const { origin, pathname } = new URL(c.req.url);

		c.header('Widget-Title', 'Todoist');
		c.header('Widget-Content-Type', 'html');

		let tasks: Task[];
		const completionEndpoint = origin + pathname;

		try {
			tasks = (await todoist.getTasks({ filter })).sort((a, b) => {
				const date1 = a.due?.datetime ?? a.due?.date ?? '9999';
				const date2 = b.due?.datetime ?? b.due?.date ?? '9999';
				return date1.localeCompare(date2);
			});
		} catch (err) {
			const errorMessage = 'Failed to fetch tasks from Todoist';
			const todoistMessage = getTodoistErrorMessage(err);
			const text = `${errorMessage}${todoistMessage ? `: ${todoistMessage}` : ''}`;
			return c.html(<GlanceError>{text}</GlanceError>);
		}

		return c.html(
			<GlanceTodoList tasks={tasks} completionEndpoint={completionEndpoint} />
		);
	})
	.post('/', async (c) => {
		const form = await c.req.formData();
		const taskId = form.get('taskId')?.toString();
		const returnTo = c.req.header('referer');

		if (!taskId) {
			throw new Error('No Todoist task ID specified');
		}

		await todoist.closeTask(taskId);

		if (returnTo) {
			return c.redirect(returnTo);
		}

		return c.text(`Marked task completed: ${taskId}`);
	});
