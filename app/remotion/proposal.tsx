import type { LoaderData } from "app/lib/types";
import { AbsoluteFill, Sequence } from "remotion";
import { Control } from "./sequences/control";
import { CovidStats } from "./sequences/covid-stats";
import { Intro } from "./sequences/intro";
import { LatestNews } from "./sequences/latest-news";
import { WeatherThisWeek } from "./sequences/weather-this-week";

export const Proposal: React.FC<LoaderData> = ({ datetime, headlines, weather, covid }) => {
    return (
        <AbsoluteFill style={{ backgroundColor: "#333", color: "white" }}>
            <Sequence durationInFrames={180}>
                <Intro datetime={datetime} />
            </Sequence>
            <Sequence from={180 * 1} durationInFrames={180}>
                <LatestNews headlines={headlines} />
            </Sequence>
            <Sequence from={180 * 2} durationInFrames={180}>
                <WeatherThisWeek weather={weather} />
            </Sequence>
            <Sequence from={180 * 3} durationInFrames={180}>
                <CovidStats covid={covid} />
            </Sequence>
            <Sequence from={180 * 4} durationInFrames={8 * 30}>
                <Control />
            </Sequence>
        </AbsoluteFill >
    )
}
