import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { FONT_FAMILY } from './constants';

const subtext: React.CSSProperties = {
	fontFamily: FONT_FAMILY,
	direction: 'rtl',
	fontSize: 40,
	textAlign: 'center',
	color: 'white',
};

export const Subtext: React.FC<{ text: string, style?: React.CSSProperties, slower?: boolean }> = ({ text, style, slower }) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, slower ? [45, 90] : [0, 30], [0, 1]);
	return (
		<div style={{ ...subtext, opacity, ...style }}>
			{text}
		</div>
	);
};
