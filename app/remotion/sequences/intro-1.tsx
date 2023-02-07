import { Sequence } from 'remotion'
import { COLOR_1 } from '../components/constants'
import { Subtext } from '../components/subtext'
import { Subtitle } from '../components/subtitle'
import { Title } from '../components/title'

export const Intro1: React.FC<{ datetime: string }> = ({ datetime }) => {
  return (
    <div id="intro-1">
      <Sequence style={{ marginTop: '20rem' }}>
        <Title titleText="هذا الفيديو مولد برمجياً" titleColor='white' />
      </Sequence>
      <Sequence from={30} style={{ flexDirection: "column-reverse", color: 'white', fontSize: 20, padding: '1rem' }}>
        {datetime}
      </Sequence>
      <Sequence from={45} style={{ marginTop: '36rem' }}>
        <Subtitle subtitleText="لعناية السيد Mazex A على مستقل" />
      </Sequence>
      <Sequence from={80} style={{ marginTop: '10rem' }}>
        <div style={{ display: "flex", flexDirection: "row-reverse", width: "100%", justifyContent: "center", alignItems: "center" }}>
          <Subtext text="تم إنتاجه بواسطة: " style={{ marginLeft: 20 }} />
          <Subtext slower text="Mazex A" style={{ color: COLOR_1, fontSize: 60 }} />
        </div>
      </Sequence >
    </div>
  )
}