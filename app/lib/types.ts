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
	headlines: Headline[];
}

export type Headline = {
	image: string,
	category: string,
	title: string,
	time: string
}
