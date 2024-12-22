import type { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { stream } from 'hono/streaming';

export async function fetchAndStream(
	c: Context,
	url: string | URL,
	init?: RequestInit
) {
	const fileRes = await fetch(url, init);
	const fileStream = fileRes.body;
	if (!fileStream) throw new HTTPException(404);
	return stream(c, (s) => s.pipe(fileStream));
}
