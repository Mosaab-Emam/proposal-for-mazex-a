import { bundle } from "@remotion/bundler";
import { getCompositions, renderMedia } from "@remotion/renderer";
import { COMPOSITION_ID } from 'app/remotion/constants';
import path from "path";

export const renderVideo = async ({
	inputProps,
	outName,
}: {
	inputProps: object;
	outName: string;
}): Promise<any> => {
	console.log("Request to render video.")

	const entry = "app/remotion/index.ts";
	const bundleLocation = await bundle(path.resolve(entry), () => undefined, {
		webpackOverride: (config: any) => config,
	});

	const comps = await getCompositions(bundleLocation, { inputProps });
	const composition = comps.find((c) => c.id === COMPOSITION_ID);

	if (!composition) {
		throw new Error(`No composition with the ID ${COMPOSITION_ID} found.
  Review "${entry}" for the correct ID.`);
	}

	console.log("Rendering started...");
	await renderMedia({
		composition,
		serveUrl: bundleLocation,
		codec: "h264",
		outputLocation: outName,
		inputProps,
	});
	console.log("Rendering finished.");
};
