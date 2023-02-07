import { useLoaderData } from '@remix-run/react';
import type { Headline } from 'app/lib/types';
import { Composition } from 'remotion';
import {
	COMPOSITION_DURATION_IN_FRAMES,
	COMPOSITION_FPS,
	COMPOSITION_HEIGHT,
	COMPOSITION_ID,
	COMPOSITION_WIDTH
} from './constants';
import { LogoAnimation } from './logo-animation';
import { Proposal } from './proposal';

export const RemotionRoot = async () => {
	const datetime = new Date().toLocaleString("ar-EG", { timeZone: "Africa/Cairo" });
	const headlines: Array<Headline> = [];

	return (
		<>
			{/* <Composition
				id={COMPOSITION_ID}
				component={LogoAnimation}
				durationInFrames={COMPOSITION_DURATION_IN_FRAMES}
				fps={COMPOSITION_FPS}
				width={COMPOSITION_WIDTH}
				height={COMPOSITION_HEIGHT}
			/> */}
			<Composition
				id={COMPOSITION_ID}
				component={Proposal}
				durationInFrames={COMPOSITION_DURATION_IN_FRAMES}
				fps={COMPOSITION_FPS}
				width={COMPOSITION_WIDTH}
				height={COMPOSITION_HEIGHT}
				defaultProps={{
					datetime,
					headlines
				}}
			/>
		</>
	);
};
