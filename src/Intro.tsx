import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLOR_1 } from "./Components/constants";
import { Subtext } from "./Components/Subtext";
import { Subtitle } from "./Components/Subtitle";
import { Title } from "./Components/Title";

export const Intro: React.FC<{ datetime: string }> = ({ datetime }) => {
    return (
        <AbsoluteFill style={{ backgroundColor: "#333" }}>
            <Title titleText="هذا الفيديو مولد برمجياً" titleColor='white' style={{ marginTop: 200 }} />
            <Sequence from={30} style={{ flexDirection: "column-reverse", color: 'white', fontSize: 20, padding: '1rem' }}>
                {datetime}
            </Sequence>
            <Sequence from={45} style={{ marginTop: 360 }}>
                <Subtitle subtitleText="لعناية السيد Mazex على مستقل" />
            </Sequence>
            <Sequence from={80} style={{ marginTop: 128 }}>
                <div style={{ display: "flex", flexDirection: "row-reverse", width: "100%", justifyContent: "center", alignItems: "center" }}>
                    <Subtext text="تم إنتاجه من أجل قبل: " style={{ marginLeft: 20 }} />
                    <Subtext slower text="Mazex" style={{ color: COLOR_1, fontSize: 60 }} />
                </div>
            </Sequence >
        </AbsoluteFill >
    )
}
