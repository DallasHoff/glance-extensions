import type { HttpBindings } from '@hono/node-server';

export type Context = {
	Bindings: HttpBindings;
};
