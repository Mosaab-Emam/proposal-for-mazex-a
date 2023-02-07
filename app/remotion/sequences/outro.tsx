import { Sequence } from 'remotion'
import { COLOR_1 } from '../components/constants'
import { Subtext } from '../components/subtext'
import { Subtitle } from '../components/subtitle'
import { Title } from '../components/title'

export const Outro: React.FC = () => {
  return (
    <div id="outro">
      <Sequence style={{ marginTop: '20rem' }}>
        <Title titleText="أنتج نسختك الخاصة من هذا الفيديو" titleColor='white' />
      </Sequence>
      {/* <Sequence from={30} style={{ flexDirection: "column-reverse", color: 'white', fontSize: 20, padding: '1rem' }}>
        {datetime}
      </Sequence> */}
      {/* <Sequence from={45} style={{ marginTop: '36rem' }}>
        <Subtitle subtitleText="من معرض أعمالي على مستقل" />
      </Sequence> */}
      <Sequence from={2 * 30} style={{ marginTop: '10rem' }}>
        <div style={{ display: "flex", flexDirection: "row-reverse", width: "100%", justifyContent: "center", alignItems: "center" }}>
          <Subtext text="من معرض أعمالي على مستقل: " style={{ marginLeft: 20, fontSize: '4rem' }} />
          <Subtext slower text="مصعب الإمام" style={{ color: COLOR_1, fontSize: '4rem' }} />
        </div>
      </Sequence>
    </div>
  )
}