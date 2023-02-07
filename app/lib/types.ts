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

export type Covid = {
	[key: number]: {
		confirmed: number;
		deaths: number;
		active: number;
		recovered: number;
	}
}

export type LoaderData = {
	datetime: string,
	headlines: Array<Headline>;
	weather: Weather;
	covid: Covid;
}

export type Headline = {
	image: string,
	category: string,
	title: string,
	time: string
}

export type Weather = {
	location: {
		name: string,
		country: string
	},
	current: {
		date: string,
		temp_c: number,
		temp_f: number;
		condition: {
			icon: string
		}
	},
	forecast: {
		forecastday: Array<{
			date: string,
			avgtemp_c: number,
			avgtemp_f: number;
			condition: {
				icon: string
			}
		}>
	}
}
