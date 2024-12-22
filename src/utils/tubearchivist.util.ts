import type { Context } from 'hono';
import type { GlanceVideo } from '../components/glance-videos.component.js';
import type { AppContext } from '../context.js';
import type { TubeArchivistContext } from '../middleware/tubearchivist.middleware.js';

export function getTaErrorMessage(intro: string, err: unknown): string | null {
	const responseMessage =
		typeof err === 'object' &&
		err !== null &&
		'detail' in err &&
		typeof err.detail === 'string'
			? err.detail
			: null;
	return `${intro}${responseMessage ? `: ${responseMessage}` : ''}`;
}

export function convertTaVideo(
	c: Context<AppContext & TubeArchivistContext>,
	video: any
): GlanceVideo {
	const host = c.var.taHost;
	const token = c.var.taToken;
	const { origin, pathname } = new URL(c.req.url);
	const proxyEndpoint = `${origin}${pathname}/proxy`;
	const thumbnailUrl = new URL(`${proxyEndpoint}${video.vid_thumb_url}`);

	if (!c.var.env.TA_HOST) thumbnailUrl.searchParams.set('host', host);
	if (!c.var.env.TA_TOKEN) thumbnailUrl.searchParams.set('token', token);

	return {
		title: video.title,
		url: `${host}/video/${video.youtube_id}`,
		author: video.channel.channel_name,
		authorUrl: `${host}/channel/${video.channel.channel_id}`,
		thumbnailUrl: thumbnailUrl.toString(),
		timePosted: video.date_downloaded,
	};
}
