import { AbsoluteFill, Sequence } from "remotion";
import { CovidStats } from "./sequences/CovidStats";
import { Intro1 } from "./sequences/Intro1";
import { Intro2 } from "./sequences/Intro2";
import { PopularProducts } from "./sequences/PopularProducts";
import { ProductComparison } from "./sequences/ProductComparison";
import { WeatherThisWeek } from "./sequences/WeatherThisWeek";

export const Proposal: React.FC<{ datetime: string }> = ({ datetime }) => {
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
                <WeatherThisWeek />
            </Sequence>
            <Sequence from={180 * 5} durationInFrames={180}>
                <CovidStats />
            </Sequence>
        </AbsoluteFill >
    )
}
