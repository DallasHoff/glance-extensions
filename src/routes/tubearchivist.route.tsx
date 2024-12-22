import { Hono } from 'hono';
import type { AppContext } from '../context.js';
import {
	GlanceVideos,
	type GlanceVideo,
} from '../components/glance-videos.component.js';
import { tubeArchivistMiddleware } from '../middleware/tubearchivist.middleware.js';
import { GlanceError } from '../components/glance-error.component.js';
import {
	convertTaVideo,
	getTaErrorMessage,
} from '../utils/tubearchivist.util.js';
import { fetchAndStream } from '../utils/common.util.js';

export const tubeArchivistRouter = new Hono<AppContext>()
	.use(tubeArchivistMiddleware)
	.get('/', async (c) => {
		const host = c.var.taHost;
		const headers = c.var.taHeaders;

		c.header('Widget-Title', 'TubeArchivist');
		c.header('Widget-Content-Type', 'html');
		c.header('Widget-Content-Frameless', 'true');

		let videos: GlanceVideo[] = [];

		try {
			const videosRes = await fetch(`${host}/api/video/`, { headers });
			const videosData = await videosRes.json();
			if (!videosData.data) throw videosData;
			videos = videosData.data.map((vid: any) => convertTaVideo(c, vid));
		} catch (err) {
			const intro = 'Failed to fetch videos from TubeArchivist';
			const error = getTaErrorMessage(intro, err);
			return c.html(<GlanceError>{error}</GlanceError>);
		}

		return c.html(<GlanceVideos videos={videos} />);
	})
	.get('/proxy/:filePath{.+}', async (c) => {
		const host = c.var.taHost;
		const headers = c.var.taHeaders;
		const filePath = c.req.param('filePath');
		return fetchAndStream(c, `${host}/${filePath}`, { headers });
	});
