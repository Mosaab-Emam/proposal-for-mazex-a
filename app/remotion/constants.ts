import type { LoaderData } from "app/lib/types";

export const COMPOSITION_FPS = 30;
export const COMPOSITION_DURATION_IN_FRAMES = 40 * COMPOSITION_FPS;
export const COMPOSITION_WIDTH = 1920;
export const COMPOSITION_HEIGHT = 1080;
export const COMPOSITION_ID = 'Proposal';
export const RAM = 2048;
export const DISK = 2048;
export const TIMEOUT = 240;
export const SITE_NAME = 'Proposal';

export interface ProposalProps extends LoaderData {
	personalizedName: string;
}
