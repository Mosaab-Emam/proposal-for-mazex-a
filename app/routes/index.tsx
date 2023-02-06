import type { ActionFunction, LinksFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { Player } from '@remotion/player';
import { getWeather } from 'app/lib/get-weather';
import { latestHeadlines } from 'app/lib/news-headlines-parser';
import { Proposal } from 'app/remotion/proposal';
import React, { useCallback, useMemo, useState } from 'react';
import { RenderProgress } from '../components/render-progress';
import { renderVideo } from '../lib/render-video.server';
import type { LoaderData, RenderResponse } from '../lib/types';
import type { ProposalProps } from '../remotion/constants';
import {
	COMPOSITION_DURATION_IN_FRAMES,
	COMPOSITION_FPS,
	COMPOSITION_HEIGHT,
	COMPOSITION_ID,
	COMPOSITION_WIDTH, SITE_NAME
} from '../remotion/constants';
import { LogoAnimation } from '../remotion/logo-animation';
import stylesHref from '../styles/layout.css';
import customStyleHref from '../styles/style.css';

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: stylesHref }, { rel: 'stylesheet', href: customStyleHref }];
};

const container: React.CSSProperties = {
	fontFamily: 'sans-serif',
	lineHeight: '1.4',
	margin: 'auto',
	maxWidth: 1200,
};

const content: React.CSSProperties = {
	width: 400,
	padding: 24,
};

const playerContainer: React.CSSProperties = {
	flex: 1,
	aspectRatio: '16 / 9',
};

const playerStyle: React.CSSProperties = {
	width: '100%',
	height: 'auto',
	aspectRatio: 16 / 9,
};

export async function loader(): Promise<LoaderData> {
	const headlines = await latestHeadlines();
	const weather = await getWeather();
	return {
		datetime: 'test',
		headlines,
		weather,
	};
}

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	const personalizedName = formData.get('personalizedName') as string;

	if (!personalizedName) {
		throw new Response(JSON.stringify({ error: 'No name entered' }), {
			status: 400,
		});
	}

	const inputProps: ProposalProps = {
		personalizedName,
		datetime: "test",
		headlines: [],
		weather: {
			location: {},
			current: {},
			forecast: {
				forecastday: []
			}
		}
	};

	const renderData = await renderVideo({
		serveUrl: SITE_NAME,
		composition: COMPOSITION_ID,
		inputProps,
		outName: `logo-animation.mp4`,
	});

	return json(renderData);
};

export default function Index() {
	const [personalizedName, setPersonalizedName] = useState('you');
	const fetcher = useFetcher<RenderResponse>();
	const loaderData = useLoaderData<LoaderData>();

	const onNameChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) =>
			setPersonalizedName(e.target.value),
		[]
	);

	const onClick = useCallback(
		(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			e.preventDefault();
			const data = new FormData();
			data.append('personalizedName', personalizedName);
			fetcher.submit(data, { method: 'post' });
		},
		[fetcher, personalizedName]
	);

	const inputProps: ProposalProps = useMemo(() => {
		return { personalizedName, datetime: 'test', headlines: loaderData.headlines, weather: loaderData.weather };
	}, [personalizedName]);

	const datetime = new Date().toLocaleString("ar-EG", { timeZone: "Africa/Cairo" });

	return (
		<div style={container} className="container">
			<div style={playerContainer}>
				<Player
					component={Proposal}
					inputProps={inputProps}
					durationInFrames={COMPOSITION_DURATION_IN_FRAMES}
					fps={COMPOSITION_FPS}
					compositionWidth={COMPOSITION_WIDTH}
					compositionHeight={COMPOSITION_HEIGHT}
					controls
					style={playerStyle}
				/>
			</div>
			<div style={content}>
				<h1>Welcome to the Remotion Remix template!</h1>
				<div>
					{fetcher.data ? (
						<RenderProgress
							bucketName={fetcher.data.bucketName}
							renderId={fetcher.data.renderId}
						/>
					) : fetcher.state === 'submitting' ? (
						<div>Invoking</div>
					) : (
						<div>
							<p>Enter your name for a custom video:</p>
							<fetcher.Form method="post">
								<input
									type="text"
									onChange={onNameChange}
									value={personalizedName}
								/>
								<br></br>
								<button type="submit" onClick={onClick}>
									Render a video
								</button>
							</fetcher.Form>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
