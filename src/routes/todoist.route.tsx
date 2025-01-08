import { Hono } from 'hono';
import type { Task } from '@doist/todoist-api-typescript';
import type { AppContext } from '../context.js';
import {
	getTodoistErrorMessage,
	sortTasksByDate,
} from '../utils/todoist.util.js';
import { GlanceError } from '../components/glance-error.component.js';
import { GlanceTodoList } from '../components/glance-todo-list.component.js';
import { todoistMiddleware } from '../middleware/todoist.middleware.js';

export const todoistRouter = new Hono<AppContext>()
	.use(todoistMiddleware)
	.get('/', async (c) => {
		const todoist = c.var.todoist;
		const filter = c.req.query('filter') ?? 'today';

		c.header('Widget-Title', 'Todoist');
		c.header('Widget-Content-Type', 'html');

		let tasks: Task[];
		const completionUrl = new URL(c.req.url);
		completionUrl.search = '';
		const completionEndpoint = completionUrl.toString();

		try {
			const tasksData = await todoist.getTasks({ filter });
			tasks = sortTasksByDate(tasksData);
		} catch (err) {
			const intro = 'Failed to fetch tasks from Todoist';
			const error = getTodoistErrorMessage(intro, err);
			return c.html(<GlanceError>{error}</GlanceError>);
		}

		return c.html(
			<GlanceTodoList tasks={tasks} completionEndpoint={completionEndpoint} />
		);
	})
	.post('/', async (c) => {
		const todoist = c.var.todoist;
		const form = await c.req.formData();
		const taskId = form.get('taskId')?.toString();
		const returnTo = c.req.header('referer');

		if (!taskId) {
			const error = 'No Todoist task ID specified';
			return c.html(<GlanceError>{error}</GlanceError>, 400);
		}

		await todoist.closeTask(taskId);

		if (returnTo) {
			return c.redirect(returnTo);
		}

		return c.html(<p>Marked task completed: {taskId}</p>);
	});
