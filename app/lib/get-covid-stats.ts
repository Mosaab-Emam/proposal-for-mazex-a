type CovidData = {
  Confirmed: number;
  Deaths: number;
  Active: number;
  Recovered: number;
  Date: string;
}

export const getCovidStats = async (country: string = 'saudi-arabia') => {
  let data: Array<CovidData>;
  try {
    const response = await fetch("https://api.covid19api.com/country/" + country);
    data = await response.json() as unknown as Array<CovidData>;
  } catch (error) {
    console.log("Error fetching covid data", error); 
    return {
      2023: { confirmed: 0, deaths: 0, active: 0, recovered: 0 },
      2022: { confirmed: 0, deaths: 0, active: 0, recovered: 0 },
      2021: { confirmed: 0, deaths: 0, active: 0, recovered: 0 },
      2020: { confirmed: 0, deaths: 0, active: 0, recovered: 0 },
    };
  }
  return data.reduce((result, item) => {
    if (item.Date.startsWith("2023")) {
      result[2023].confirmed += item.Confirmed;
      result[2023].deaths += item.Deaths;
      result[2023].active += item.Active;
      result[2023].recovered += item.Recovered;
    }
    if (item.Date.startsWith("2022")) {
      result[2022].confirmed += item.Confirmed;
      result[2022].deaths += item.Deaths;
      result[2022].active += item.Active;
      result[2022].recovered += item.Recovered;
    }
    if (item.Date.startsWith("2021")) {
      result[2021].confirmed += item.Confirmed;
      result[2021].deaths += item.Deaths;
      result[2021].active += item.Active;
      result[2021].recovered += item.Recovered;
    }
    if (item.Date.startsWith("2020")) {
      result[2020].confirmed += item.Confirmed;
      result[2020].deaths += item.Deaths;
      result[2020].active += item.Active;
      result[2020].recovered += item.Recovered;
    }

    return result;
  }, {
    2023: {
      confirmed: 0,
      deaths: 0,
      active: 0,
      recovered: 0
    },
    2022: {
      confirmed: 0,
      deaths: 0,
      active: 0,
      recovered: 0
    },
    2021: {
      confirmed: 0,
      deaths: 0,
      active: 0,
      recovered: 0
    },
    2020: {
      confirmed: 0,
      deaths: 0,
      active: 0,
      recovered: 0
    },
  });
}