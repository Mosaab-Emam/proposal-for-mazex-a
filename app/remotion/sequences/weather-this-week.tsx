import type { Weather } from "app/lib/types"

export const WeatherThisWeek: React.FC<{ weather: Weather }> = ({ weather }) => {
  return (
    <div id="weather">
      {weather.forecast.forecastday.map(day => (
        <div className="box-container" key={day.date}>
          <div className='box' key={day.date}>
            <div className='wave -one'></div>
            <div className='wave -two'></div>
            <div className='wave -three'></div>
            <div className="weathercon"><i className='fas fa-sun' style={{ color: '#d36326' }}></i></div>
            <div className="info">
              <h2 className="location">SUNNYVILLE</h2>
              <p className="date">{day.date}</p>
              <h1 className="temp">25 &deg;C | 77 &deg;F</h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}