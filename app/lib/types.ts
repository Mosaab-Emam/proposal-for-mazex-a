import type { AwsRegion, EnhancedErrorInfo } from '@remotion/lambda';

export type StatusResponse = {
	renderId: string;
	done: boolean;
	overallProgress: number;
	outputFile: string | null;
	errors: EnhancedErrorInfo[];
};

export type RenderResponse = {
	renderId: string;
	bucketName: string;
	functionName: string;
	region: AwsRegion;
};

export type LoaderData = {
	datetime: string,
	headlines: Headline[];
	weather: Weather;
}

export type Headline = {
	image: string,
	category: string,
	title: string,
	time: string
}

export type Weather = {
	location: object,
	current: object,
	forecast: {
		forecastday: Array<{
			date: string
		}>
	}
}
