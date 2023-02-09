import type { ProposalProps } from "app/remotion/constants";
import { AbsoluteFill, Sequence } from "remotion";
import { Control } from "./sequences/control";
import { CovidStats } from "./sequences/covid-stats";
import { Intro } from "./sequences/intro";
import { LatestNews } from "./sequences/latest-news";
import { Outro } from "./sequences/outro";
import { WeatherThisWeek } from "./sequences/weather-this-week";

export const Proposal: React.FC<ProposalProps> = (props) => {
    return (
        <AbsoluteFill style={{ backgroundColor: "#333", color: "white" }}>
            <Sequence durationInFrames={180}>
                <Intro personalizedName={props.personalizedName} datetime={props.datetime} />
            </Sequence>
            <Sequence from={180 * 1} durationInFrames={180}>
                <LatestNews headlines={props.headlines} />
            </Sequence>
            <Sequence from={180 * 2} durationInFrames={180}>
                <WeatherThisWeek weather={props.weather} />
            </Sequence>
            <Sequence from={180 * 3} durationInFrames={180}>
                <CovidStats covid={props.covid} />
            </Sequence>
            <Sequence from={180 * 4} durationInFrames={8 * 30}>
                <Control />
            </Sequence>
            <Sequence from={32 * 30} durationInFrames={6 * 30}>
                <Outro />
            </Sequence>
        </AbsoluteFill >
    )
}
