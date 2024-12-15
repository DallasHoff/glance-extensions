import { Hono } from 'hono';
import { getTodoistErrorMessage, todoist } from '../apis/todoist.js';
import { GlanceStylesheet } from '../apis/glance.js';

export const listRouter = new Hono().get('/', async (c) => {
	const filter = c.req.query('filter') ?? 'today';

	c.header('Widget-Title', 'Todoist');
	c.header('Widget-Content-Type', 'html');

	let tasks;

	try {
		tasks = await todoist.getTasks({ filter });
	} catch (err) {
		const errorMessage = 'Failed to fetch tasks from Todoist';
		const todoistMessage = getTodoistErrorMessage(err);
		const text = `${errorMessage}${todoistMessage ? `: ${todoistMessage}` : ''}`;

		return c.html(
			<>
				<GlanceStylesheet />
				<p class="color-negative">{text}</p>
			</>
		);
	}

	return c.html(
		<>
			<GlanceStylesheet />
			<ul class="list list-gap-10 list-with-separator">
				{tasks.map((task) => (
					<li>
						<a href={task.url}>{task.content}</a>
					</li>
				))}
			</ul>
		</>
	);
});
