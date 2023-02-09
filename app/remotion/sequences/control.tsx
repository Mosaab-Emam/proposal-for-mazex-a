import { Sequence } from 'remotion';
import { COLOR_1 } from '../components/constants';
import { Title } from '../components/title';

export const Control: React.FC = () => {
  const titles = [
    "أنت المتحكم",
    "بياناتك الخاصة",
    "قالبك الخاص",
    "إنتاجك الخاص",
    "إبداعك الخاص",
    "أنت المتحكم"
  ];

  return (
    <div id="control">
      {titles.map((title, i) =>
        <Sequence from={i * 30} key={i} style={{ top: i * 10 + 'rem' }}>
          <Title titleText={title} titleColor={i == titles.length - 1 ? COLOR_1 : 'white'} />
        </Sequence>
      )}
    </div>
  )
}