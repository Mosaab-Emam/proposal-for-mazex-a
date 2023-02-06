import { latestHeadlines } from "app/lib/news-headlines-parser";

export async function loader() {
  const headlines = await latestHeadlines();
  return {
    headlines
  };
}