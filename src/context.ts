import type { HttpBindings } from '@hono/node-server';

export type AppContext = {
	Bindings: HttpBindings;
	Variables: {
		env: {
			NODE_ENV?: string;
			PORT?: string;
			TODOIST_TOKEN?: string;
			TA_HOST?: string;
			TA_TOKEN?: string;
		};
	};
};
