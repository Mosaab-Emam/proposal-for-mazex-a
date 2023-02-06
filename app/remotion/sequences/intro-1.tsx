import { Sequence } from 'remotion'
import { COLOR_1 } from '../components/constants'
import { Subtext } from '../components/Subtext'
import { Subtitle } from '../components/Subtitle'
import { Title } from '../components/Title'

export const Intro1: React.FC<{ datetime: string }> = ({ datetime }) => {
  return (
    <>
      <Title titleText="هذا الفيديو مولد برمجياً" titleColor='white' style={{ marginTop: 200 }} />
      <Sequence from={30} style={{ flexDirection: "column-reverse", color: 'white', fontSize: 20, padding: '1rem' }}>
        {datetime}
      </Sequence>
      <Sequence from={45} style={{ marginTop: 360 }}>
        <Subtitle subtitleText="لعناية السيد Mazex A على مستقل" />
      </Sequence>
      <Sequence from={80} style={{ marginTop: 128 }}>
        <div style={{ display: "flex", flexDirection: "row-reverse", width: "100%", justifyContent: "center", alignItems: "center" }}>
          <Subtext text="تم إنتاجه بواسطة: " style={{ marginLeft: 20 }} />
          <Subtext slower text="Mazex A" style={{ color: COLOR_1, fontSize: 60 }} />
        </div>
      </Sequence >
    </>
  )
}