import { Composition } from 'remotion';
import { HelloWorld } from './HelloWorld';
import { Logo } from './HelloWorld/Logo';
import { Intro } from './Intro';

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
	const datetime = new Date().toLocaleString("ar-EG", { timeZone: "Asia/Riyadh" });
	return (
		<div style={{ direction: 'rtl' }}>
			<Composition
				// You can take the "id" to render a video:
				// npx remotion render src/index.ts <id> out/video.mp4
				id="HelloWorld"
				component={HelloWorld}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				// You can override these props for each render:
				// https://www.remotion.dev/docs/parametrized-rendering
				defaultProps={{
					titleText: 'Welcome to Remotion',
					titleColor: 'black',
				}}
			/>
			{/* Mount any React component to make it show up in the sidebar and work on it individually! */}
			<Composition
				id="OnlyLogo"
				component={Logo}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="Intro"
				component={Intro}
				durationInFrames={180}
				height={720}
				width={1280}
				fps={30}
				defaultProps={{
					datetime
				}}
			/>
		</div>
	);
};
