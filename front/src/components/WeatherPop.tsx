import { UseTripWeatherReturn } from '../hooks/useTripWeather'
import { WeatherDatePicker, WeatherSummary, DailyCast } from './TripWeatherComponents'

interface WeatherPopProps {
  isOpen: boolean
  onClose: () => void
  weather: UseTripWeatherReturn
}

export default function WeatherPop({ isOpen, onClose, weather }: WeatherPopProps) {
  if (!isOpen) return null

  return (
    <div className="weather-pop-overlay" >
      <div className="weather-pop-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3>Trip Weather</h3>
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>
            ✕
          </button>
        </div>

        {/* Datepicker inside Pop */}
        <WeatherDatePicker weather={weather} />
        {/* Summary inside Pop */}
        <WeatherSummary weather={weather} />
        {/* Daily Cast inside Pop */}
        <DailyCast weather={weather} />
      </div>
    </div>
  )
}