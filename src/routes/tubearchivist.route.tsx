import { Hono } from 'hono';
import type { Context } from '../context.js';
import {
	GlanceVideos,
	type GlanceVideo,
} from '../components/glance-videos.component.js';
import { stream } from 'hono/streaming';
import { HTTPException } from 'hono/http-exception';
import { tubeArchivistMiddleware } from '../middleware/tubearchivist.middleware.js';
import { GlanceError } from '../components/glance-error.component.js';
import { getTaErrorMessage } from '../utils/tubearchivist.util.js';

export const tubeArchivistRouter = new Hono<Context>()
	.use(tubeArchivistMiddleware)
	.get('/', async (c) => {
		const host = c.var.taHost;
		const token = c.var.taToken;
		const { origin, pathname } = new URL(c.req.url);

		c.header('Widget-Title', 'TubeArchivist');
		c.header('Widget-Content-Type', 'html');

		let videos: GlanceVideo[] = [];
		const proxyEndpoint = `${origin}${pathname}/proxy`;

		try {
			const videosRes = await fetch(`${host}/api/video/`, {
				headers: { Authorization: `Token ${token}` },
			});
			const videosData = await videosRes.json();
			if (!videosData.data) throw videosData;

			videos = videosData.data.map((video: any): GlanceVideo => {
				return {
					title: video.title,
					url: `${host}/video/${video.youtube_id}`,
					author: video.channel.channel_name,
					authorUrl: `${host}/channel/${video.channel.channel_id}`,
					thumbnailUrl: `${proxyEndpoint}${video.vid_thumb_url}?host=${encodeURIComponent(host)}&token=${encodeURIComponent(token)}`,
					timePosted: video.date_downloaded,
				};
			});
		} catch (err) {
			const intro = 'Failed to fetch videos from TubeArchivist';
			const error = getTaErrorMessage(intro, err);
			return c.html(<GlanceError>{error}</GlanceError>);
		}

		return c.html(<GlanceVideos videos={videos} />);
	})
	.get('/proxy/:filePath{.+}', async (c) => {
		const host = c.var.taHost;
		const token = c.var.taToken;
		const filePath = c.req.param('filePath');

		const fileRes = await fetch(`${host}/${filePath}`, {
			headers: { Authorization: `Token ${token}` },
		});
		const fileStream = fileRes.body;
		if (!fileStream) throw new HTTPException(404);

		return stream(c, (s) => s.pipe(fileStream));
	});
