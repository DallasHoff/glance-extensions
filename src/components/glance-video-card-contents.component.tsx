import type { FC } from 'hono/jsx';
import type { GlanceVideo } from './glance-videos.component.js';

type Props = {
	video: GlanceVideo;
};

export const GlanceVideoCardContents: FC<Props> = (props: Props) => {
	const { title, url, thumbnailUrl, author, authorUrl, timePosted } =
		props.video;

	return (
		<>
			<img
				class="video-thumbnail thumbnail"
				loading="lazy"
				src={thumbnailUrl}
				alt=""
			/>
			<div class="margin-top-10 margin-bottom-widget flex flex-column grow padding-inline-widget">
				<a
					class="video-title color-primary-if-not-visited"
					href={url}
					target="_blank"
					rel="noreferrer"
					title={title}
				>
					{title}
				</a>
				<ul class="list-horizontal-text flex-nowrap margin-top-7">
					<li class="shrink-0" data-dynamic-relative-time={timePosted}></li>
					<li class="min-width-0">
						<a
							class="block text-truncate"
							href={authorUrl}
							target="_blank"
							rel="noreferrer"
						>
							{author}
						</a>
					</li>
				</ul>
			</div>
		</>
	);
};
