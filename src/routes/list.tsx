import { Hono } from 'hono';
import { getTodoistErrorMessage, todoist } from '../apis/todoist.js';
import { GlanceStylesheet } from '../apis/glance.js';
import { css, Style } from 'hono/css';
import { html } from 'hono/html';

export const listRouter = new Hono()
	.get('/', async (c) => {
		const filter = c.req.query('filter') ?? 'today';

		c.header('Widget-Title', 'Todoist');
		c.header('Widget-Content-Type', 'html');

		const endpointUrl = new URL(c.req.url);
		const endpoint = endpointUrl.origin + endpointUrl.pathname;

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

		const checkJs = html`
			<script>
				async function todoistCompleteTask(taskElement) {
					const { endpoint, taskId } = taskElement.dataset;
					const reqUrl = new URL(endpoint);
					reqUrl.searchParams.set('taskId', taskId);
					await fetch(reqUrl, { method: 'post' });
					taskElement.parentElement.remove();
				}
			</script>
		`;

		return c.html(
			<>
				<GlanceStylesheet />
				<Style />
				{checkJs}
				<ul class="list list-gap-10 list-with-separator">
					{tasks.map((task) => (
						<li class="flex items-center">
							<button
								type="button"
								class={checkClass}
								data-endpoint={endpoint}
								data-task-id={task.id}
								onclick="todoistCompleteTask(this)"
							></button>
							<a href={task.url} class="grow">
								{task.content}
							</a>
						</li>
					))}
				</ul>
			</>
		);
	})
	.post('/', async (c) => {
		const taskId = c.req.query('taskId');

		if (!taskId) {
			throw new Error('No Todoist task ID specified');
		}

		await todoist.closeTask(taskId);

		return c.text('');
	});
