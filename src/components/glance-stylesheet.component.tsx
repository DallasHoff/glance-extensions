import type { FC } from 'hono/jsx';
import { glanceCssUrl } from '../apis/glance.api.js';

export const GlanceStylesheet: FC = () => {
	return (
		<>
			{process.env.NODE_ENV === 'development' && (
				<link rel="stylesheet" href={glanceCssUrl}></link>
			)}
		</>
	);
};
