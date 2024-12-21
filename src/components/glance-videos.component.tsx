import type { FC } from 'hono/jsx';
import { GlanceVideoCardContents } from './glance-video-card-contents.component.js';
import { GlanceStylesheet } from './glance-stylesheet.component.js';

export type GlanceVideo = {
	title: string;
	url: string;
	thumbnailUrl: string;
	author: string;
	authorUrl: string;
	timePosted: number;
};

type Props = {
	videos: GlanceVideo[];
};

export const GlanceVideos: FC<Props> = (props: Props) => {
	const { videos } = props;

	return (
		<>
			<GlanceStylesheet />
			<div class="carousel-container">
				<div class="cards-horizontal carousel-items-container">
					{videos.map((video) => (
						<div class="card widget-content-frame thumbnail-parent">
							<GlanceVideoCardContents video={video} />
						</div>
					))}
				</div>
			</div>
		</>
	);
};
