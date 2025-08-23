import type { HttpBindings } from '@hono/node-server';

export type AppContext = {
	Bindings: HttpBindings;
	Variables: {
		env: {
			// General
			NODE_ENV?: string;
			PORT?: string;
			// Todoist
			TODOIST_TOKEN?: string;
			// TubeArchivist
			TA_HOST?: string;
			TA_TOKEN?: string;
			// Change Detection
			CHANGE_DETECTION_HOST?: string;
			CHANGE_DETECTION_TOKEN?: string;
		};
	};
};
