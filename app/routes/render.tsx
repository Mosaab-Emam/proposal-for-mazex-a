import { latestHeadlines } from "app/lib/news-headlines-parser";

export async function loader() {
  console.log('here')
  latestHeadlines();
  return { hello: 'world' };
}