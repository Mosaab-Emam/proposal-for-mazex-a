// import data from "../test-data/weather.json";
import type { Weather, WeatherResponse } from "./types";

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

export const getWeather = async (city: string = 'cairo'): Promise<Weather> => {
  console.log(process.env)
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}=${city}&days=7&aqi=no&alerts=no`);
  const data = await response.json() as unknown as WeatherResponse;
  const forecastday = data.forecast.forecastday.slice(1).map(day => {
    const d = new Date(day.date);
    return {
      date: `${day_names[d.getDay()]} | ${d.getDate()} ${month_names[d.getMonth()]}`,
      avgtemp_c: day.day.avgtemp_c,
      avgtemp_f: day.day.avgtemp_f,
      condition: {
        icon: day.day.condition.icon
      }
    }
  });

  const d = new Date(data.current.last_updated)
  return {
    location: {
      name: data.location.name,
      country: data.location.country
    },
    current: {
      date: `${day_names[d.getDay()]} | ${d.getDate()} ${month_names[d.getMonth()]} | ${d.toISOString().split("T")[1].slice(0, 5)}`,
      temp_c: data.current.temp_c,
      temp_f: data.current.temp_f,
      condition: {
        icon: data.current.condition.icon
      }
    },
    forecast: {
      forecastday
    }
  };
}