import cheerio from "cheerio";

export async function latestHeadlines() {
  const html = await fetch("https://arabi21.com/Timeline").then((res) => res.text()).catch(err => console.log(err));
  if (typeof html != 'string') return [];
  const $ = cheerio.load(html);
  const rows: Array<Cheerio<Element>> = $('#appenddiv > .row').slice(0, 10);

  const items = [];
  for (let i = 0; i < rows.length; i++) {
    console.log(i);
    const row = rows[i];
    if (row.find('.bg-gradient').length) continue;
    const image = row.find('a picture source')[0].data('srcset');
    const category = row.find('.headline-block h3 a:nth-of-type(2)').text();
    const title = row.find('.headline-block h3 a:nth-of-type(2)').text();

    items.push({
      image,
      category,
      title
    });
  }


  console.log(items);
}