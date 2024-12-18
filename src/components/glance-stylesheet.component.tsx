import type { FC } from 'hono/jsx';

const glanceCssUrl =
	'https://cdn.jsdelivr.net/gh/glanceapp/glance/internal/assets/static/main.css';

export const GlanceStylesheet: FC = () => {
	return (
		<>
			{process.env.NODE_ENV === 'development' && (
				<link rel="stylesheet" href={glanceCssUrl}></link>
			)}
		</>
	);
};
