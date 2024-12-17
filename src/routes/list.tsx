import { Hono } from 'hono';
import { getTodoistErrorMessage, todoist } from '../apis/todoist.js';
import { GlanceStylesheet } from '../apis/glance.js';
import { css, Style as HonoStylesheet } from 'hono/css';

export const listRouter = new Hono()
	.get('/', async (c) => {
		const filter = c.req.query('filter') ?? 'today';

		c.header('Widget-Title', 'Todoist');
		c.header('Widget-Content-Type', 'html');

		const endpointUrl = new URL(c.req.url);
		const endpoint = endpointUrl.origin + endpointUrl.pathname;

		let tasks;

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

			return c.html(
				<>
					<GlanceStylesheet />
					<p class="color-negative">{text}</p>
				</>
			);
		}

		const checkClass = css`
			& {
				appearance: none;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 1.5rem;
				height: 1.5rem;
				margin-right: 1rem;
				background: transparent;
				border: 2px solid var(--color-text-highlight);
				border-radius: 50%;
				cursor: pointer;

				&:active::before {
					content: '';
					width: 0.5rem;
					height: 0.8rem;
					rotate: 45deg;
					translate: 0 -0.1rem;
					border-bottom: 2px solid var(--color-text-highlight);
					border-right: 2px solid var(--color-text-highlight);
				}
			}
		`;

		return c.html(
			<>
				<GlanceStylesheet />
				<HonoStylesheet />
				<ul class="list list-gap-10 list-with-separator">
					{tasks.map((task) => (
						<li>
							<form action={endpoint} method="post" class="flex items-center">
								<button
									type="submit"
									name="taskId"
									value={task.id}
									class={checkClass}
								></button>
								<a href={task.url} class="grow">
									{task.content}
								</a>
							</form>
						</li>
					))}
					{tasks.length === 0 && (
						<li>
							<p>No Tasks</p>
						</li>
					)}
				</ul>
			</>
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
