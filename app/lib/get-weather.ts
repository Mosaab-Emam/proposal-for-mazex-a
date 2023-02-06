import data from "../test-data/weather.json";
import type { Weather } from "./types";

const day_names = [
  'الأحد',
  'الإثنين',
  'الثلاثاء',
  'الأربعاء',
  'الخميس',
  'الجمعة',
  'السبت'
];

const month_names = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "اكتوبر",
  "نوفمبر",
  "ديسمبر"
];

export const getWeather = async (): Promise<Weather> => {
  const forecastday = data.forecast.forecastday.slice(1).map(day => {
    const d = new Date(day.date);
    return {
      date: `${day_names[d.getDay()]} | ${d.getDate()} ${month_names[d.getMonth()]}`
    }
  });
  const weather: Weather = {
    location: {},
    current: {},
    forecast: {
      forecastday
    }
  };

  console.log(weather.forecast.forecastday)
  return weather;
}