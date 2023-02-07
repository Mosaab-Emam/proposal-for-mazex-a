import cheerio from "cheerio";
import type { Headline } from "./types";

export async function latestHeadlines() {
  const html = await fetch("https://arabi21.com/Timeline").then((res) => res.text()).catch(err => console.log(err));
  if (typeof html != 'string') return [];
  const $ = cheerio.load(html);
  const rows = $('#appenddiv > .row').slice(0, 10);

  const items: Array<Headline> = [];
  for (let i = 0; i < rows.length; i++) {
    try {
      const row = $(rows[i]);
      let image, category, title;

      if (row.find('.bg-gradient').length) {
        image = "https://arabi21.com/App_Images/295x166.png";
        category = row.find('p.urgent').text().trim();
        title = row.find('h3.headline-urgent').text().trim();
      } else {
        image = row.find('a picture source')?.first().data('srcset');
        category = row.find('.headline-block h3 a:nth-of-type(2)').text().trim();
        title = row.find('.headline-block h3 a:nth-of-type(2)').text().trim();
      }

      const time = row.find('span.time').text().trim();

      items.push({
        image,
        category,
        title,
        time
      });
    } catch (error) {
      console.log("Something went wrong", error)
      break;
    }
  }

  return items;
}