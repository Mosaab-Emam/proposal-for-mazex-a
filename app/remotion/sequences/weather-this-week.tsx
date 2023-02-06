import type { Weather } from "app/lib/types"
import { Img } from "remotion"

export const WeatherThisWeek: React.FC<{ weather: Weather }> = ({ weather }) => {
  return (
    <div id="weather">
      <div className="main-box box">
        <div className='wave -one'></div>
        <div className='wave -two'></div>
        <div className='wave -three'></div>
        <div className="weathercon">
          <Img src={weather.current.condition.icon} />
        </div>
        <div className="info">
          <h2 className="location" style={{ fontSize: '4rem', marginTop: 0 }}>{weather.location.name}, {weather.location.country}</h2>
          <p className="date" style={{ fontSize: '2rem', fontWeight: 'bold' }}>{weather.current.date}</p>
        </div>
        <div className="temp">
          <h1>{weather.current.temp_c} &deg;C</h1>
          <h1>{weather.current.temp_f} &deg;F</h1>
        </div>
      </div>
      {weather.forecast.forecastday.map(day => (
        <div className="box-container" key={day.date}>
          <div className='box' key={day.date}>
            <div className='wave -one'></div>
            <div className='wave -two'></div>
            <div className='wave -three'></div>
            <div className="weathercon">
              <Img src={day.condition.icon} />
            </div>
            <div className="info">
              <h2 className="location">{weather.location.name}, {weather.location.country}</h2>
              <p className="date">{day.date}</p>
              <h1 className="temp">{day.avgtemp_c} &deg;C | {day.avgtemp_f} &deg;F</h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}