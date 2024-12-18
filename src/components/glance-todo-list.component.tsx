import type { Task } from '@doist/todoist-api-typescript';
import { css, Style as HonoStylesheet } from 'hono/css';
import type { FC } from 'hono/jsx';
import { GlanceStylesheet } from './glance-stylesheet.component.js';

type Props = {
	tasks: Task[];
	completionEndpoint: string;
};

export const GlanceTodoList: FC<Props> = (props: Props) => {
	const checkClass = css`
		& {
			appearance: none;
			flex-shrink: 0;
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

	return (
		<>
			<GlanceStylesheet />
			<HonoStylesheet />
			<ul class="list list-gap-10 list-with-separator">
				{props.tasks.map((task) => (
					<li>
						<form
							action={props.completionEndpoint}
							method="post"
							class="flex items-center"
						>
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
				{props.tasks.length === 0 && (
					<li>
						<p>No Tasks</p>
					</li>
				)}
			</ul>
		</>
	);
};
