import cheerio from "cheerio";

export async function latestHeadlines() {
  const html = await fetch("https://arabi21.com/Timeline").then((res) => res.text()).catch(err => console.log(err));
  if (typeof html != 'string') return [];
  const $ = cheerio.load(html);
  const rows = $('#appenddiv > .row').slice(0, 10);

  const items = [];
  for (let i = 0; i < rows.length; i++) {
    try {
      const row = $(rows[i]);
      const image = row.find('a picture source')?.first().data('srcset');
      const category = row.find('.headline-block h3 a:nth-of-type(2)').text().trim();
      const title = row.find('.headline-block h3 a:nth-of-type(2)').text().trim();

      items.push({
        image,
        category,
        title
      });
    } catch (error) {
      console.log("Something went wrong", error)
      break;
    }
  }

  return items;
}