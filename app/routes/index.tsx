import type { ActionFunction, LinksFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { Player } from '@remotion/player';
import { getCovidStats } from 'app/lib/get-covid-stats';
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

const covid_options = [
	"saudi-arabia",
	"egypt",
	"sudan",
	"united-arab-emirates",
	"bahrain",
	"qatar"
];

const countryNames = {
	"saudi-arabia": "السعودية",
	"egypt": "مصر",
	"sudan": "السودان",
	"united-arab-emirates": "الامارات",
	"bahrain": "البحرين",
	"qatar": "قطر"
}

export async function loader(): Promise<LoaderData> {
	const datetime = new Date().toLocaleString("ar-EG", { timeZone: "Africa/Cairo" });
	const headlines = await latestHeadlines();
	const weather = await getWeather();
	const covid = await getCovidStats();

	return {
		datetime,
		headlines,
		weather,
		covid,
	};
}

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	const personalizedName = formData.get('personalizedName') as string;
	const covidCountry = formData.get('covidCountry') as string;

	if (!personalizedName) {
		throw new Response(JSON.stringify({ error: 'No name entered' }), {
			status: 400,
		});
	}

	const datetime = new Date().toLocaleString("ar-EG", { timeZone: "Africa/Cairo" });
	const headlines = await latestHeadlines();
	const weather = await getWeather();
	const covid = await getCovidStats();

	const inputProps: ProposalProps = {
		personalizedName,
		datetime,
		headlines,
		weather,
		covid
	};

	const renderData = await renderVideo({
		inputProps,
		outName: `out/proposal.mp4`,
	});

	return json(renderData);
};

export default function Index() {
	const [personalizedName, setPersonalizedName] = useState('Mazex A');
	const [covidCountry, setCovidCountry] = useState('saudi-arabia');
	const fetcher = useFetcher<RenderResponse>();
	const renderer = useFetcher();
	const loaderData = useLoaderData<LoaderData>();

	const onNameChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) =>
			setPersonalizedName(e.target.value),
		[]
	);

	const onCovidCountryChange = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) =>
			setCovidCountry(e.target.value),
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

	const render = useCallback(
		(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			e.preventDefault();
			const data = new FormData();
			data.append('personalizedName', personalizedName);
			data.append('covidCountry', covidCountry);
			renderer.submit(data, { method: 'post' });
		},
		[renderer, personalizedName, covidCountry]
	)

	const inputProps: ProposalProps = useMemo(() => {
		return {
			personalizedName,
			...loaderData
		};
	}, [personalizedName, loaderData]);


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
				<h1 style={{ direction: 'rtl' }}>مرحباً Mazex A، قم بإنتاج الفيديو الخاص بك</h1>
				<div>
					{fetcher.data ? (
						<RenderProgress
							bucketName={fetcher.data.bucketName}
							renderId={fetcher.data.renderId}
						/>
					) : fetcher.state === 'submitting' ? (
						<div>Invoking</div>
					) : (
						<div style={{ direction: 'rtl' }}>
							<fetcher.Form method="post">
								<input
									type="text"
									onChange={onNameChange}
									value={personalizedName}
								/>
								<br></br>
								<label htmlFor="#covidCountry">جلب إحصائيات كورونا لـ:</label> &nbsp;
								<select id="covidCountry" onChange={onCovidCountryChange}>
									{
										covid_options.map((op) => <option value={op} key={op}>{op}</option>)
									}
								</select>
								<br></br>
								<button type="submit" onClick={onClick}>
									Render a video
								</button>
								<button type="submit" onClick={render}>
									X
								</button>
							</fetcher.Form>
						</div>
					)}
				</div>
			</div>
		</div >
	);
}
