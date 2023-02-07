import { bundle } from "@remotion/bundler";
import type { AwsRegion } from '@remotion/lambda';
import { renderMediaOnLambda } from '@remotion/lambda/client';
import { getCompositions, renderMedia } from "@remotion/renderer";
import { COMPOSITION_ID } from 'app/remotion/constants';
import path from "path";
import { speculateFunctionName } from './get-function-name';
import type { RenderResponse } from './types';

export const renderVideo = async ({
	serveUrl,
	composition,
	inputProps,
	outName,
}: {
	serveUrl: string;
	composition: string;
	inputProps: unknown;
	outName: string;
}): Promise<RenderResponse> => {
	console.log("At least I am here");

	const entry = "app/remotion/index.ts";

	console.log("Creating a Webpack bundle of the video");
	const bundleLocation = await bundle(path.resolve(entry), () => undefined, {
		// If you have a Webpack override, make sure to add it here
		webpackOverride: (config: any) => config,
	});

	const comps = await getCompositions(bundleLocation, {
		// You can pass custom input props that you can retrieve using getInputProps()
		// in the composition list. Use this if you want to dynamically set the duration or
		// dimensions of the video.
		inputProps,
	});

	// Select the composition you want to render.
	const composition2 = comps.find((c) => c.id === COMPOSITION_ID);

	// Ensure the composition exists
	if (!composition2) {
		throw new Error(`No composition with the ID ${COMPOSITION_ID} found.
  Review "${entry}" for the correct ID.`);
	}

	console.log("Attempting to render:", outName);
	await renderMedia({
		composition2,
		serveUrl: bundleLocation,
		codec: "h264",
		outName,
		inputProps,
	});
	console.log("Render done!");

	const region = process.env.REMOTION_AWS_REGION as AwsRegion | undefined;
	if (!region) {
		throw new Error('REMOTION_AWS_REGION is not set');
	}

	const { renderId, bucketName } = await renderMediaOnLambda({
		region,
		functionName: speculateFunctionName(),
		serveUrl,
		composition,
		inputProps,
		codec: 'h264',
		downloadBehavior: {
			type: 'download',
			fileName: outName,
		},
	});

	return {
		renderId,
		bucketName,
		functionName: speculateFunctionName(),
		region,
	};
};
