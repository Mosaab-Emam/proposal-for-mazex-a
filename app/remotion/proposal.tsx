import type { LoaderData } from "app/lib/types";
import { AbsoluteFill, Sequence } from "remotion";
import { CovidStats } from "./sequences/covid-stats";
import { Intro1 } from "./sequences/intro-1";
import { Intro2 } from "./sequences/intro-2";
import { LatestNews } from "./sequences/latest-news";
import { PopularProducts } from "./sequences/popular-products";
import { ProductComparison } from "./sequences/product-comparison";
import { WeatherThisWeek } from "./sequences/weather-this-week";

export const Proposal: React.FC<LoaderData> = ({ datetime, headlines, weather, covid }) => {
    return (
        <AbsoluteFill style={{ backgroundColor: "#333", color: "white" }}>
            <Sequence durationInFrames={180}>
                <Intro1 datetime={datetime} />
            </Sequence>
            <Sequence from={180} durationInFrames={180}>
                <Intro2 />
            </Sequence>
            <Sequence from={180 * 2} durationInFrames={180}>
                <PopularProducts />
            </Sequence>
            <Sequence from={180 * 3} durationInFrames={180}>
                <ProductComparison />
            </Sequence>
            <Sequence from={180 * 4} durationInFrames={180}>
                <LatestNews headlines={headlines} />
            </Sequence>
            <Sequence from={180 * 5} durationInFrames={180}>
                <WeatherThisWeek weather={weather} />
            </Sequence>
            <Sequence from={180 * 6} durationInFrames={180}>
                <CovidStats covid={covid} />
            </Sequence>
        </AbsoluteFill >
    )
}
