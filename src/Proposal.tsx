import { AbsoluteFill, Sequence } from "remotion";
import { CovidStats } from "./Sequences/CovidStats";
import { Intro1 } from "./Sequences/Intro1";
import { Intro2 } from "./Sequences/Intro2";
import { PopularProducts } from "./Sequences/PopularProducts";
import { ProductComparison } from "./Sequences/ProductComparison";
import { WeatherThisWeek } from "./Sequences/WeatherThisWeek";

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
