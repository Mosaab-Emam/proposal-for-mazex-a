import type { Headline } from "app/lib/types";
import { NewsCard } from "../components/news-card";
import { Title } from "../components/title";

export const LatestNews: React.FC<{ headlines: Array<Headline> }> = ({ headlines }) => {
  return (
    <div id="latest-news">
      <Title titleText="آخر الأخبار" titleColor="white" style={{ fontSize: 72 }} />
      <div className="card-columns">
        <div>
          {headlines.slice(0, 5).map(
            (headline, index) => <NewsCard headline={headline} index={index} key={index + headline.time} />
          )}
        </div>
        <div>
          {headlines.slice(5).map(
            (headline, index) => <NewsCard headline={headline} index={index} key={index + headline.time} />
          )}
        </div>
      </div>
    </div>
  )
}