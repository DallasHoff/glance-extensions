import type { FC, PropsWithChildren } from 'hono/jsx';
import { GlanceStylesheet } from './glance-stylesheet.component.js';

export const GlanceError: FC = ({ children }: PropsWithChildren) => {
	return (
		<>
			<GlanceStylesheet />
			<p class="color-negative">{children}</p>
		</>
	);
};
