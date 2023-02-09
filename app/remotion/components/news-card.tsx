import type { Headline } from "app/lib/types";
import { Img, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const NewsCard: React.FC<{ headline: Headline, index: number }> = ({ headline, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    frame: frame - (index * 5),
  });

  return (
    <article className="card shadow" style={{ transform: `scale(${scale})` }}>
      <div>
        <Img src={headline.image} alt={headline.title} />
      </div>

      <div>
        <p><strong>{headline.title}</strong></p>
        <span>
          {headline.category} <time>{headline.time}</time>
        </span>
      </div>
    </article>
  )
}